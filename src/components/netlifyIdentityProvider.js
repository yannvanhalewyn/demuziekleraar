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
  const [showLoginModal, setShowLoginModal] = useState(false);

  const setAndRefreshJWT = (user) => {
    netlifyIdentity.refresh().then((_jwt) => {
      setCurrentUser(netlifyIdentity.currentUser());
    });
    setCurrentUser(user);
  };

  useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", setAndRefreshJWT);
    netlifyIdentity.on("logout", setCurrentUser);
    // Cheecky dev helper
    window.netlifyIdentity = netlifyIdentity;

    const user = netlifyIdentity.currentUser();

    if (user) {
      setAndRefreshJWT(netlifyIdentity.currentUser());
    } else {
      setShowLoginModal(true);
    }

    return () => {
      netlifyIdentity.off("login", setAndRefreshJWT);
      netlifyIdentity.off("logout", setCurrentUser);
    };
  }, []);

  if (currentUser) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        {children}
      </CurrentUserContext.Provider>
    );
  } else if (showLoginModal) {
    return <NetlifyIdentityModal />;
  } else
    return null;
};

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser == undefined) {
    throw new Error("useCurrentUser must be used within a NetlifyIdentityProvider")
  }
  return currentUser;
};

export const accessToken = (netlifyUser) => {
  if (netlifyUser && netlifyUser.token) {
    return netlifyUser.token.access_token;
  }
}

export const fullName = (netlifyUser) => {
  if (netlifyUser && netlifyUser.user_metadata) {
    return netlifyUser.user_metadata.full_name;
  }
}
