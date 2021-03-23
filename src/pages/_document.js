import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // TODO Opengraph tags
  // Open Graph and SEO
  // TODO meta keywords
  // TODO have the site title also be using words in the description instead of
  //      adding the title here risking that to be the preview. -->
  // <meta name="description" content="{{ $.Site.Title }} | {{ .Site.Home.Params.seo.description }}">
  // <meta property="og:type" content="business.business">
  // <meta property="og:title" content="{{ $.Site.Title }} | {{ $description }}">
  // <meta property="og:url" content="/">
  // <meta property="og:image" content="{{ .Site.Home.Params.seo.image }}">

  // TODO add netlify identity widget on homepage IF we will support user logins
  // {{ if .IsHome }}
  // <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  // {{ end }}

  render() {
    return (
      <Html lang="nl">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
