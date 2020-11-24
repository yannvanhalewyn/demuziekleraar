import { TinaProvider, TinaCMS, useForm, usePlugin } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import Github from "../github";
import Head from "next/head";

import { readData } from "../content";

import {
  NetlifyIdentityProvider,
  useCurrentUser,
  accessToken,
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
  const currentUser = useCurrentUser();

  const formConfig = {
    id: "banner",
    label: "Banner",
    initialValues: { images: {}, promo: {} },
    loadInitialValues: async () => {
      const file = await Github.fetchFile("data/banner.json", {
        accessToken: accessToken(currentUser),
      });

      let values = file.contents ? JSON.parse(file.contents) : {};
      values._githubFile = file;
      console.log("Fetched data:", values);

      return values;
    },
    fields: [
      { name: "title", label: "Post Title", component: "markdown" },
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
  usePlugin(form);

  return <Banner {...banner} />;
};

export default function Admin(props) {
  const cms = new TinaCMS({
    enabled: true,
    sidebar: true,
    plugins: [MarkdownFieldPlugin],
  });

  return (
    <NetlifyIdentityProvider>
      <TinaProvider cms={cms}>
        <Header />
        <BannerForm />
      </TinaProvider>
    </NetlifyIdentityProvider>
  );
}
