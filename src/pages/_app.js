import "../css/main.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
        </Head>
        <Component {...pageProps} />
      </>
  )
};

export default MyApp;
