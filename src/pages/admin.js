import { TinaProvider, TinaCMS, usePlugin } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import Head from "next/head";

import GithubMediaStore from "../netlifyGit/githubMediaStore";
import { useGithubJsonForm } from "../netlifyGit/useGithubJsonForm";
import {
  NetlifyIdentityProvider,
  useCurrentUser,
  accessToken,
} from "../components/netlifyIdentityProvider";

import Header from "../components/header";
import Banner from "../components/banner";
import Lessons from "../components/lessons";
import Pricing from "../components/pricing";

const imageField = (label, name) => {
  return {
    label,
    name,
    component: "image",
    parse: (media) => `/media/${media.filename}`,
  };
};

const textField = (label, name) => {
  return { name, label, component: "text" };
};

const richField = (label, name) => {
  return { name, label, component: "markdown" };
};

const bannerFormConfig = {
  id: "banner",
  label: "Banner",
  fileName: "data/banner.json",
  fields: [
    richField("title", "Titel"),
    richField("subtitle", "Ondertitel"),
    imageField("Afbeelding 1", "images.image1"),
    imageField("Afbeelding 2", "images.image2"),
    imageField("Afbeelding 3", "images.image3"),
    {
      name: "promo",
      label: "Promo",
      component: "group",
      fields: [
        textField("title", "Titel"),
        richField("description", "Beschrijving"),
        imageField("image", "afbeelding"),
      ],
    },
  ],
};

const BannerForm = (props) => {
  const [banner, form] = useGithubJsonForm(bannerFormConfig);
  usePlugin(form);
  return <Banner {...banner} />;
};

};

const TinaApp = () => {
  const currentUser = useCurrentUser();
  const mediaStore = new GithubMediaStore({
    accessToken: accessToken(currentUser),
    directory: "public/media",
  });

  const cms = new TinaCMS({
    enabled: true,
    sidebar: true,
    plugins: [MarkdownFieldPlugin],
    media: mediaStore,
  });

  return (
    <TinaProvider cms={cms}>
      <Header />
      <BannerForm />
    </TinaProvider>
  );
};

export default function Admin(props) {
  return (
    <NetlifyIdentityProvider>
      <TinaApp />
    </NetlifyIdentityProvider>
  );
}
