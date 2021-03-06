import React from "react";
import Head from "next/head";

import { readData } from "../content";
import Header from "../components/header";
import Banner from "../components/banner";
import Lessons from "../components/lessons";
import Pricing from "../components/pricing";
import Contact from "../components/contact";
import SEO from "../components/seo";

export async function getStaticProps() {
  return {
    props: {
      banner: readData("banner"),
      lessons: readData("lessons"),
      pricing: readData("pricing"),
      contact: readData("contact"),
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
      <SEO {...props.seo}/>
      <Head>
        <title>De Muziekleraar | Home</title>
        <script src="/js/app.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js" />
      </Head>

      <Header {...props.contact}/>
      <Banner {...props.banner}/>
      <Lessons {...props.lessons}/>
      <Pricing {...props.pricing}/>
      <Contact {...props.contact}/>
    </React.Fragment>
  )
}
