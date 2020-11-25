const currentGitBranchName = require("current-git-branch");

module.exports = {
  env: {
    // Netlify deploys detach the head, but sets the branch variable. Check that
    // one or our current local branch. Used persistence on Github.
    GIT_BRANCH: process.env.BRANCH || currentGitBranchName()
  }
};
