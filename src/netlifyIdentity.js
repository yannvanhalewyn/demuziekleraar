import netlifyIdentity from "netlify-identity-widget";

const openLoginModal = () => {
  netlifyIdentity.open();
}

const userToken = () => {
  const user = netlifyIdentity.currentUser();

  if (user && user.token) {
    return user.token.access_token;
  }
}

export { currentUser, init } from "netlify-identity-widget";
export { openLoginModal, userToken };
