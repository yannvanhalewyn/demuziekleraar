import { useState } from "react";
import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import Github from "../netlifyGithub";
import GithubMediaStore from "../netlifyGithubMediaStore";
import Head from "next/head";

import { readData } from "../content";

import {
  NetlifyIdentityProvider,
  useCurrentUser,
  accessToken,
  fullName,
} from "../components/netlifyIdentityProvider";
import Header from "../components/header";
import Banner from "../components/banner";
import Lessons from "../components/lessons";
import Pricing from "../components/pricing";

export async function getStaticProps() {
  return {
    props: {
      lessons: readData("lessons"),
      pricing: readData("pricing"),
      socials: readData("socials"),
      seo: readData("seo"),
    },
  };
}

const BannerForm = (props) => {
  const cms = useCMS();
  const currentUser = useCurrentUser();
  const [githubFile, setGithubFile] = useState(null);

  const loadInitialValues = async () => {
    const file = await Github.fetchFile("data/banner.json", {
      accessToken: accessToken(currentUser),
    });
    setGithubFile(file);

    let values = file.content ? JSON.parse(file.content) : {};
    console.log("Fetched file:", file);

    return values;
  };

  const onSubmit = async (values, form) => {
    try {
      cms.alerts.info("Opslaan... ");

      const res = await Github.commit("data/banner.json", {
        accessToken: accessToken(currentUser),
        fileContents: JSON.stringify(values, null, 2),
        encode: true,
        sha: githubFile.sha,
        message: `Update ${"data/banner.json"} by ${fullName(currentUser)}`,
      });

      cms.alerts.success(
        "Opgeslagen! Het kan een paar minuten duren voordat " +
          "de aanpassingen te zien zijn."
      );

      setGithubFile({ ...githubFile, sha: res.content.sha });
    } catch (err) {
      cms.alerts.error(
        "Er ging iets mis, aanpassingen konden niet opgeslagen worden."
      );
      console.error("Failed to create commit", err);
    }
  };

  const formConfig = {
    id: "banner",
    label: "Banner",
    loadInitialValues: loadInitialValues,
    onSubmit: onSubmit,
    fields: [
      {
        name: "title",
        label: "Post Title",
        component: "markdown",
        description: "Dit is een beschrijving",
      },
      { name: "subtitle", label: "Ondertitel", component: "markdown" },
      {
        name: "promo",
        label: "Promo",
        component: "group",
        fields: [
          { name: "title", label: "Titel", component: "text" },
          { name: "description", label: "Beschrijving", component: "markdown" },
          { name: "image", label: "Afbeelding", component: "image" },
        ],
      },
    ],
  };

  const [banner, form] = useForm(formConfig);

  // Formconfig is not reloaded every cycle. This is an issue for the onSubmit
  // handler which depends on the githubFile state. When a new githubFile
  // comes in after load, the form will still use the old onSubmit, which
  // still uses the initial githubFile state.
  // https://github.com/tinacms/tinacms/blob/master/packages/%40tinacms/react-core/src/use-form.ts#L71
  // There seems to be no way of storing the new SHA without using some form of
  // mutable OO like TinaCMS's GithubFile class does (mutate this.sha after
  // fetchFile). So I'd rather hack the correct handler in this way and keep the
  // API fully functional.
  form.onSubmit = onSubmit;
  usePlugin(form);

  if (banner.promo) {
    return <Banner {...banner} />;
  } else {
    return null;
  }
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
    media: mediaStore
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
