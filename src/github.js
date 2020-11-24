import { userToken } from "./netlifyIdentity";

const request = async (req) => {
  let token = userToken();

  if (!token) {
    throw "No token found for current user."
  }

  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  const response = await fetch(req.url, {
    method: req.method || "GET",
    headers: headers,
    body: req.body && JSON.stringify(req.body),
  });

  return await response.json();
};

const fetchFile = async (filePath, branch = "master", decoded = true) => {
  console.log(`Fetching ${filePath} from Github`)

  const response = await request({
    url: `https://demuziekleraar.netlify.app/.netlify/git/github/contents/${filePath}?ref=${branch}`,
  });

  response.content =
    decoded && response.content
      ? atob(response.content || "")
      : response.content;

  return response;
};

export default { fetchFile };
