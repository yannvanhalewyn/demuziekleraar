import React from "react";
import Head from "next/head";
import { readData } from "../content";
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
      seo: readData("seo")
    }
  }
}

// Totally static build, no react interactions
export const config = {
  unstable_runtimeJS: false
}

export default function Home(props) {
  return (
    <React.Fragment>
      <Head>
        <title>De Muziekleraar | Home</title>
        <script src="/js/app.js" />
      </Head>
      <Header/>
      <Banner {...props.banner}/>
      <Lessons {...props.lessons}/>
      <Pricing {...props.pricing}/>
    </React.Fragment>
  )
}
