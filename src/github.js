const BRANCH = "migrate-to-next";

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

export default { fetchFile };
