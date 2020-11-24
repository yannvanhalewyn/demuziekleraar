import { useState, useEffect, createContext, useContext } from "react";
import netlifyIdentity from "netlify-identity-widget";

const CurrentUserContext = createContext(null);

const NetlifyIdentityModal = () => {
  // Should use useLayoutEffect, but it prins annoying unsuppressable warnings
  // for SSR. Works fine as effect ¯\_(ツ)_/¯
  useEffect(() => {
    netlifyIdentity.open();

    return () => {
      netlifyIdentity.close();
    };
  }, []);

  return null;
};

export const NetlifyIdentityProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", setCurrentUser);
    netlifyIdentity.on("logout", setCurrentUser);

    const user = netlifyIdentity.currentUser();
    if (user) {
      setCurrentUser(netlifyIdentity.currentUser());
    } else {
      netlifyIdentity.open();
    }

    return () => {
      netlifyIdentity.off("login", setCurrentUser);
      netlifyIdentity.off("logout", setCurrentUser);
    };
  }, []);

  if (currentUser) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        {children}
      </CurrentUserContext.Provider>
    );
  } else {
    return <NetlifyIdentityModal />;
  }
};

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser == undefined) {
    throw new Error("useCurrentUser must be used within a NetlifyIdentityProvider")
  }
  return currentUser;
};
