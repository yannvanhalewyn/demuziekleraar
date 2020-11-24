import { TinaProvider, TinaCMS, useForm, usePlugin } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import Github from "../github";
import * as NetlifyIdentity from "../netlifyIdentity";
import Head from "next/head";

import { readData } from "../content";

import { NetlifyIdentityProvider } from "../components/netlifyIdentityProvider";
import Header from "../components/header";
import Banner from "../components/banner";
import Lessons from "../components/lessons";
import Pricing from "../components/pricing";

export async function getStaticProps() {
  return {
    props: {
      banner: readData("banner"),
      lessons: readData("lessons"),
      pricing: readData("pricing"),
      socials: readData("socials"),
      seo: readData("seo"),
    },
  };
}

const BannerForm = (props) => {
  const formConfig = {
    id: "banner",
    label: "Banner",
    initialValues: props,
    // onSubmit: (values) => {
    //   alert(`Submitting ${values.title}`);
    // },
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

  return <Banner {...banner} />
};


const fetchFile = async () => {
  let response = await Github.fetchFile("package2.json");
  console.log("RESPONSE:", response);
  return response;
}

const currentUser = async () => {
  console.log(NetlifyIdentity.currentUser());
}

const login = async () => {
  console.log(NetlifyIdentity.openLoginModal());
}

const identInit = async () => {
  console.log(NetlifyIdentity.init());
}

export default function Admin(props) {

  const cms = new TinaCMS({
    enabled: true,
    sidebar: true,
    plugins: [MarkdownFieldPlugin],
    apis: {
      // github: githubClient
    }
  });

  return (
    <NetlifyIdentityProvider>
      <TinaProvider cms={cms}>
        <div className="p-4">
          <button className="btn btn--s bg-orange-500 text-white mr-4" onClick={fetchFile}>Fetch file</button>
          <button className="btn btn--s bg-orange-500 text-white mr-4" onClick={currentUser}>Print current user</button>
          <button className="btn btn--s bg-orange-500 text-white mr-4" onClick={login}>Open netlify modal</button>
          <button className="btn btn--s bg-orange-500 text-white mr-4" onClick={identInit}>Init Netlify Idenitty</button>
        </div>
        <Header />
        <BannerForm {...props.banner} />
        <Lessons {...props.lessons} />
        <Pricing {...props.pricing} />
      </TinaProvider>
    </NetlifyIdentityProvider>
  );
}
