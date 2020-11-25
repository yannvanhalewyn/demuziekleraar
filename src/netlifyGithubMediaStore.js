import path from "path";
import Github from "./netlifyGithub";

const PREVIEWABLE = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

////////////////////////////////////////////////////////////////////////////////
// Helpers

const readFileAsDataUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        throw new Error("Could not read file", file);
      }
    };
  });
};

const isPreviewable = (fileName) => {
  return PREVIEWABLE.includes(path.extname(fileName).toLowerCase());
};

const githubFileToMedia = (githubFile) => {
  const mediaItem = {
    id: githubFile.path,
    filename: githubFile.name,
    directory: path.dirname(githubFile.path),
    type: githubFile.type,
    path: githubFile.path,
    sha: githubFile.sha,
  };

  if (isPreviewable(mediaItem.filename)) {
    mediaItem.previewSrc = githubFile.download_url;
  }

  return mediaItem;
};

const nextOffset = (offset, limit, count) => {
  if (offset + limit < count) return offset + limit;
  return undefined;
};


////////////////////////////////////////////////////////////////////////////////
// MediaStore

const list = async (store, options) => {
  const offset = options.offset || 0;
  const limit = options.limit || 0;
  const items = await Github.fetchFile(store.directory, {
    accessToken: store.accessToken,
  });

  return {
    items: items.slice(offset, offset + limit).map(githubFileToMedia),
    offset,
    limit,
    nextOffset: nextOffset(offset, limit, items.length),
    totalCount: items.length,
  };
};

const persist = async (store, fileList) => {
  let uploaded = [];

  try {
    for (const fileListItem of fileList) {
      const dataUrl = await readFileAsDataUrl(fileListItem.file);
      const base64Content = dataUrl.toString().split(",")[1];
      const filePath = path.join(store.directory, fileListItem.file.path);

      // TODO reuploading file with same name?
      // Either prepend timestamp to filename or catch it?
      const res = await Github.commit(filePath, {
        accessToken: store.accessToken,
        fileContents: base64Content,
        message: `Upload ${filePath}`,
      });

      let image = githubFileToMedia(res.content);
      image.previewSrc = dataUrl;
      uploaded.push(image);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }

  return uploaded;
};

const _delete = async (store, mediaFile) => {
  const res = await Github.deleteFile(mediaFile.path, {
    accessToken: store.accessToken,
    message: `Delete ${mediaFile.path}`,
    sha: mediaFile.sha,
  });
  return res;
};

// We prefer functional approaches but the TinaCMS API would really like you to
// make it into a class. The signatures look like maybe just implement them
// inline? But the functional approach is a lot better for hot reloading.
export default class NetlifyGithubMediaStore {
  constructor({ accessToken, directory }) {
    this.accessToken = accessToken;
    this.directory = directory;
  }

  async list(options) {
    return await list(this, options);
  }

  async persist(fileList) {
    return await persist(this, fileList);
  }

  async delete(mediaFile) {
    return await _delete(this, mediaFile);
  }
}
