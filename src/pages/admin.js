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

const listField = (label, name, props, field) => {
  return { name, label, field, component: "list", ...props };
};

const groupListField = (label, name, props, fields) => {
  return { name, label, fields, component: "group-list", ...props };
};

const defaultLabelProps = (key, default_) => {
  return {
    itemProps: item => ({
      label: item[key] || default_
    })
  }
}

const defaultNameProps = default_ => defaultLabelProps("name", default_);

const bannerFormConfig = {
  id: "2-banner",
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

const lessonGroupProps = {
  defaultItem: () => ({
    lessons: [],
    teacher: { achievements: [] },
  }),
  itemProps: (lessonGroup) => {
    return {
      label:
        lessonGroup?.lessons?.length > 0
          ? lessonGroup.lessons.map((l) => l.name).join(" | ")
          : "Nieuwe lesgroep",
    };
  },
};

const lessonsFormConfig = {
  id: "1-lessons",
  label: "Lessen",
  fileName: "data/lessons.json",
  fields: [
    groupListField("Lessen", "lessonGroups", lessonGroupProps, [
      groupListField("Lessen", "lessons", defaultNameProps("Nieuwe les"), [
        textField("Naam", "name"),
        richField("Beschrijving", "description"),
        imageField("Afbeelding", "image"),
      ]),
      textField("Docent", "teacher.name"),
      imageField("Docent Afbeelding", "teacher.image"),
      groupListField("Docent Prestaties", "teacher.achievements", defaultLabelProps("description", "Nieuwe prestatie"), [
        imageField("Icoon", "icon"),
        richField("Beschrijving", "description"),
      ]),
    ]),
  ],
};

const pricingFormConfig = {
  id: "0-pricing",
  label: "Tarieven",
  fileName: "data/pricing.json",
  fields: [
    groupListField("Tarieven", "pricingModels", defaultNameProps("Nieuw tarief"), [
      textField("Naam", "name"),
      textField("Locatie", "location"),
      textField("Prijs < 21", "priceChildren"),
      textField("Prijs > 21", "priceAdults"),
      textField("Prijs ondertitel", "priceSubtitle"),
      richField("Kortingszin", "discount"),
      groupListField("Kenmerken", "features", defaultNameProps("Nieuw kenmerk"), [
        richField("Kenmerk", "name")
      ]),
    ])
  ]
}

const BannerForm = (props) => {
  const [banner, form] = useGithubJsonForm(bannerFormConfig);
  usePlugin(form);
  return <Banner {...banner} />;
};

const LessonsForm = (props) => {
  const [lessons, form] = useGithubJsonForm(lessonsFormConfig);
  usePlugin(form);
  return <Lessons {...lessons} />;
};

const PricingForm = (props) => {
  const [pricing, form] = useGithubJsonForm(pricingFormConfig);
  usePlugin(form);
  return <Pricing {...pricing} />;
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
      <LessonsForm />
      <PricingForm />
    </TinaProvider>
  );
};

export default function Admin(props) {
  return (
    <NetlifyIdentityProvider>
      <Head>
        <title>De Muziekleraar | Admin</title>
      </Head>
      <TinaApp />
    </NetlifyIdentityProvider>
  );
}
