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

import SEO from "../components/seo";
import Header from "../components/header";
import Banner from "../components/banner";
import Lessons from "../components/lessons";
import Pricing from "../components/pricing";
import Contact from "../components/contact";

const imageField = (label, name, sizeHint) => {
  let description;
  if (sizeHint) {
    description = `Ongeveer ${sizeHint} pixels breed`
  }

  return {
    label,
    name,
    description,
    component: "image",
    parse: (media) => `/media/${media.filename}`,
  };
};

const textField = (label, name) => {
  return { name, label, component: "text" };
};

const textAreaField = (label, name) => {
  return { name, label,  component: "textarea"}
}

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

const seoFormConfig = {
  id: "4-SEO",
  label: "SEO",
  fileName: "data/seo.json",
  fields: [
    textField("Titel", "title"),
    textAreaField("Beschrijving", "description"),
    textField("Canonical", "canonical"),

    textField("og:title", "og_title"),
    textAreaField("og:description", "og_description"),
    textField("og:type", "og_type"),
    textField("og:locale", "og_locale"),
    textField("og:site_name", "og_site_name"),
    textField("og:url", "og_url"),
    imageField("og:image", "og_image_url", 400),
  ]
}

const bannerFormConfig = {
  id: "3-banner",
  label: "Banner",
  fileName: "data/banner.json",
  fields: [
    richField("Title", "title"),
    richField("Ondertitel", "subtitle"),
    imageField("Afbeelding 1", "images.image1", 230),
    imageField("Afbeelding 2", "images.image2", 340),
    imageField("Afbeelding 3", "images.image3", 230),
    {
      label: "Promo",
      name: "promo",
      component: "group",
      fields: [
        textField("Titel", "title"),
        richField("Beschrijving", "description"),
        imageField("Afbeelding", "image", 450),
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
  id: "2-lessons",
  label: "Lessen",
  fileName: "data/lessons.json",
  fields: [
    groupListField("Lessen", "lessonGroups", lessonGroupProps, [
      groupListField("Lessen", "lessons", defaultNameProps("Nieuwe les"), [
        textField("Naam", "name"),
        richField("Beschrijving", "description"),
        imageField("Afbeelding", "image", 450),
      ]),
      textField("Docent", "teacher.name"),
      imageField("Docent Afbeelding", "teacher.image", 500),
      groupListField("Docent Prestaties", "teacher.achievements", defaultLabelProps("description", "Nieuwe prestatie"), [
        imageField("Icoon", "icon"),
        richField("Beschrijving", "description"),
      ]),
    ]),
  ],
};

const pricingFormConfig = {
  id: "1-pricing",
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

const contactFormConfig = {
  id: "0-pricing",
  label: "Contact & Socials",
  fileName: "data/contact.json",
  fields: [
    textField("Bericht", "message"),
    textField("Telefoon", "phoneNumber"),
    textField("Email", "email"),
    textField("Youtube", "youtubeUrl"),
    textField("Instagram", "instagramUrl")
  ]
}

const HomePreview = () => {
  const [seo, seoForm] = useGithubJsonForm(seoFormConfig);
  const [banner, bannerForm] = useGithubJsonForm(bannerFormConfig);
  const [lessons, lessonsForm] = useGithubJsonForm(lessonsFormConfig);
  const [pricing, pricingForm] = useGithubJsonForm(pricingFormConfig);
  const [contact, contactForm] = useGithubJsonForm(contactFormConfig);

  usePlugin(seoForm);
  usePlugin(bannerForm);
  usePlugin(lessonsForm);
  usePlugin(pricingForm);
  usePlugin(contactForm);

  return (
    <>
      <SEO {...seo} />
      <Header {...contact} />
      <Banner {...banner}/>
      <Lessons {...lessons} />
      <Pricing {...pricing}/>
      <Contact {...contact}/>
    </>
  );
}

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
      <HomePreview/>
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
