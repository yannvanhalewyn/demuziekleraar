const BRANCH = process.env.GIT_BRANCH;

const request = async ({ path, headers, method, body }) => {
  const url = `https://demuziekleraar.netlify.app/.netlify/git/github/${path}`;

  const response = await fetch(url, {
    method: method || "GET",
    headers: headers,
    body: body && JSON.stringify(body),
  });

  return await response.json();
};

const fetchFile = async (
  filePath,
  { accessToken, branch = BRANCH, decoded = true }
) => {
  let response = await request({
    path: `contents/${filePath}?ref=${branch}`,
    headers: { Authorization: "Bearer " + accessToken },
  });

  if (decoded && response.content) {
    response.content = atob(response.content);
  }

  return response;
};

const commit = async (
  filePath,
  { accessToken, sha, fileContents, message, branch = BRANCH, encode = false }
) => {
  // 409 = when supplied SHA doesn't match server SHA
  // Cancel and show error saying resource was already modified
  // Or maybe just a blocking confirm query
  return await request({
    path: `contents/${filePath}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "PUT",
    body: {
      message,
      content: encode ? btoa(fileContents) : fileContents,
      branch,
      sha,
    },
  });
};

const deleteFile = async (
  filePath,
  { accessToken, sha, message, branch = BRANCH }
) => {
  return await request({
    path: `contents/${filePath}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "DELETE",
    body: { message, branch, sha },
  });
};

export default { fetchFile, commit, deleteFile };
