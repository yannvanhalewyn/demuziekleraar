import { NextSeo } from 'next-seo';

export default function SEO(props) {
  console.log(props)
  return (
    <NextSeo
      title={props.title}
      description={props.description}
      canonical={props.canonical}
      openGraph={{
        title: props.og_title,
        description: props.og_description,
        type: props.og_type,
        locale: props.og_locale,
        site_name: props.og_site_name,
        url: props.og_url,
        images: [
          {
            url: props.og_image_url,
          }
        ]
      }}
    />
  )
}
