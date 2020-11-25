const currentGitBranchName = require("current-git-branch");

// Netlify deploys detach the head, but sets the branch variable. Check that
// one or our current local branch. Used persistence on Github.
let branch = process.env.BRANCH || currentGitBranchName()

if (branch.startsWith("pull")) {
  branch = "migrate-to-next";
}

module.exports = {
  env: {
    GIT_BRANCH: branch
  }
};
