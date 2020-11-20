import React from "react";
import { readData } from "../content";
import Header from "../components/header";
import Banner from "../components/banner";

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
      <Header/>
      <Banner {...props.banner}/>
    </React.Fragment>
  )
}
