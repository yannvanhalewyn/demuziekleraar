const BRANCH = process.env.GIT_BRANCH;

function b64Encode(str) {
  return btoa(
    encodeURIComponent(str)
      .replace(/%([0-9A-F]{2})/g, (_, s) => String.fromCharCode("0x" + s))
  );
}

const b64Decode = (str) => {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
};

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
    response.content = b64Decode(response.content);
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
      content: encode ? b64Encode(fileContents) : fileContents,
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
