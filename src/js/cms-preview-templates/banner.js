import React from "react";
import { markdownToHtml } from "../markdown";


const SignupButton = ({className, icon}) => {
  return (
    <button className={`btn group ${className}`}>
      <div className="flex items-center">
        <div className="group-hover:animation-spin group-hover:animation-duration-100 group-hover:animation-1">

          <svg className="w-5 h-5 group-hover:animation-grow group-hover:animation-duration-1000 group-hover:animation-1 fill-current text-white" viewBox="0 0 24 24">
            <path d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"/>
          </svg>

        </div>
        <span className="ml-2">
          Meld je aan
        </span>
      </div>
    </button>
  );
}

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;

    return (
      <div className="mt-4 md:mt-0 bg-polka-dots bg-repeat">
        <div className="bg-hero-oval-size bg-quarter-oval relative" >
          <div className="absolute bottom-0 inset-x-0 h-32 md:h-64 clip-triangle bg-blue-700"></div>
          <div className="relative flex flex-col md:flex-row m-container" >

            <div className="flex-1 md:pr-12 lg:pr-40 py-12 md:py-24 lg:py-32 text-white tracking-wide">

              <h1 className="text-2xl md:text-3xl font-extrabold strong-blue-800"
                  dangerouslySetInnerHTML={{__html: markdownToHtml(entry.getIn(["data", "title"]))}}>
              </h1>

              <h2 className="mt-8 leading-relaxed"
                  dangerouslySetInnerHTML={{__html: markdownToHtml(entry.getIn(["data", "subtitle"]))}}>
              </h2>

              <div className="text-center">
                <SignupButton className="mt-12 btn--red shadow-lg"/>
              </div>
            </div>

            <div className="flex-1 lg:-mx-12 md:mt-0">
              <div className="relative flex-grow mt-16 md:mt-24">
                <div className="absolute sm:z-30 md:z-0 lg:z-30 w-40 h-40 sm:w-48 sm:h-48 lg:w-48 lg:h-48 img-frame hero-image-1 border-blue-500"
                     style={{backgroundImage: `url('${getAsset(entry.getIn(["data", "images", "image1"]))}')`}}
                ></div>
                <div className="relative sm:z-20 md:z-0 lg:z-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-84 lg:h-84 mx-auto img-frame border-blue-500"
                     style={{backgroundImage: `url('${getAsset(entry.getIn(["data", "images", "image2"]))}')`}}
                ></div>
                <div className="absolute sm:z-30 md:z-0 lg:z-30 w-40 h-40 sm:w-48 sm:h-48 lg:w-48 lg:h-48 img-frame hero-image-2 border-blue-500"
                     style={{backgroundImage: `url('${getAsset(entry.getIn(["data", "images", "image3"]))}')`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-700 md:-mt-24 lg:mt-0 py-20 sm:py-32 md:pt-0 lg:pb-24">
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-stretch m-container">

            <div className="flex-1">

              <div className="relative">
                <svg className="w-64 h-64 fill-current text-blue-800 opacity-50 absolute md:right-0 lg:right-auto -mt-8 lg:ml-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"/>
                </svg>
              </div>

              <div className="relative md:max-w-md lg:ml-auto">
                <h3 className="heading-2 md:text-right lg:text-left text-white">
                  {entry.getIn(["data", "promo", "title"])}
                </h3>
                <p className="mt-8 text-blue-100 leading-relaxed tracking-wide"
                   dangerouslySetInnerHTML={{__html: markdownToHtml(entry.getIn(["data", "promo", "description"]))}}>
                </p>
                <div className="mt-12 text-center">
                  <button className="btn btn--s bg-white text-blue-700 hover:bg-blue-700 border-white border-2 hover:text-white">
                    Lees meer
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full mt-12 lg:mt-0 md:max-w-md">
              <div className="h-72 sm:h-112 md:h-72 lg:h-full mx-auto lg:mx-0 img-frame border-white"
                   style={{backgroundImage: `url('${getAsset(entry.getIn(["data", "promo", "image"]))}')`}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
