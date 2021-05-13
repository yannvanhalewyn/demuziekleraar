import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import SignupButton from "./signup_button";
import PolkaTitle from "./polkaTitle";

export default function Pricing({ pricingModels }) {
  // Used in netlify cms preview, sinds we don't hydrate our production app for
  // page loads there is a native js toggle implementation loaded along the app.
  const [toggled, setToggled] = useState(false);

  return (
    <div id="pricing" className="bg-blue-700 text-white">
      <div className="gsap-scroll-trigger m-container pt-24 pb-12">


        <PolkaTitle dotsClassName="bg-polka-dots--blue">
          <h2 className="gsap-scroll-appear-left heading-2 pl-4 font-extrabold text-white border-l-8 border-red-600">
            Tarieven
          </h2>
        </PolkaTitle>

        <div className="mt-16">
          <div className="gsap-scroll-appear-left flex items-center text-blue-300 font-semibold">
            <label
              htmlFor="pricing-toggle"
              id="js-pricing-label-children"
              className={`pricing-toggle__label ${
                !toggled ? "pricing-toggle__label--active" : ""
              }`}
            >
              Tot 21 jaar
            </label>

            <div className="pricing-toggle mx-4">
              <input
                className="pricing-toggle__check"
                type="checkbox"
                id="js-pricing-toggle"
                onChange={(e) => setToggled(e.target.checked)}
                checked={toggled}
              />
              <b className="pricing-toggle__switch"></b>
            </div>

            <label
              htmlFor="pricing-toggle"
              id="js-pricing-label-adults"
              className={`pricing-toggle__label ${
                toggled ? "pricing-toggle__label--active" : ""
              }`}
            >
              Vanaf 21 jaar
            </label>
          </div>

          {/* relative z-10 in order to draw above triangle clip path */}
          <div className="relative z-10 gsap-scroll-appear-bottom mt-6 lg:flex lg:bg-blue-600 lg:rounded-xl lg:overflow-hidden lg:shadow-xl">
            {pricingModels?.map((pricingModel, i) => {
              return (
                <div
                  key={i}
                  className={`lg:flex-1 p-6 xs:p-10 md:p-16 rounded-xl shadow-xl bg-blue-600 lg:rounded-none lg:shadow-none lg:bg-none ${
                    i !== pricingModels.length - 1
                      ? "mb-12 lg:mb-0 lg:border-r-2 lg:border-blue-300"
                      : ""
                  }`}
                >
                  <div className="text-center">
                    <div
                      className="w-64 h-32 md:w-72 md:h-40 mx-auto bg-no-repeat bg-contain bg-center"
                      style={{
                        backgroundImage: `url('${
                          pricingModel.name === "Groepsles"
                            ? "/img/community.svg"
                            : "/img/professor.svg"
                        }')`,
                      }}
                    ></div>

                    <div className="-mt-12">
                      <h2 className="inline-block px-5 py-1 bg-blue-300 rounded-full heading-3 text-blue-700 font-bold uppercase">
                        {pricingModel.name}
                      </h2>
                    </div>

                    <div className="flex justify-around">
                      <span className="flex items-center mt-2 text-blue-300 text-xs">
                        <svg
                          className="w-4 h-4 fill-current text-blue-300"
                          viewBox="0 0 24 24"
                        >
                          {pricingModel.location == "Thuis" ? (
                            <path d="M21.66,10.25l-9-8a1,1,0,0,0-1.32,0l-9,8a1,1,0,0,0-.27,1.11A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.93-.64A1,1,0,0,0,21.66,10.25ZM13,20H11V17a1,1,0,0,1,2,0Zm5,0H15V17a3,3,0,0,0-6,0v3H6V12H18ZM5.63,10,12,4.34,18.37,10Z" />
                          ) : (
                            <path d="M14,8h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2Zm0,4h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2ZM9,8h1a1,1,0,0,0,0-2H9A1,1,0,0,0,9,8Zm0,4h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,8H20V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-8,0H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V4H18Z" />
                          )}
                        </svg>
                        <span className="ml-1">{pricingModel.location}</span>
                      </span>
                    </div>

                    <div className="mt-8">
                      <div>
                        <span
                          className="text-blue-300 text-2xl relative"
                          style={{ bottom: "1.2rem", right: ".1rem" }}
                        >
                          €
                        </span>
                        {/* 'toggled' is used by admin preview, vanilla js in
                        production so we don't have to load in React */}
                        <span className="js-price-children font-bold text-5xl" >
                          {toggled
                            ? pricingModel.priceAdults
                            : pricingModel.priceChildren}
                        </span>
                        <span className="js-price-adults hidden font-bold text-5xl" >
                          {pricingModel.priceAdults}
                        </span>
                      </div>
                      <span className="block mt-2 text-blue-300">
                        {pricingModel.priceSubtitle}
                      </span>
                    </div>

                    <SignupButton className="shadow-md mt-12 btn--orange" />

                    <ReactMarkdown
                      className="h-8 mt-4 text-blue-300 strong-white"
                      children={pricingModel.discount || ""}
                    />
                  </div>

                  <hr className="my-8 md:my-12 border-blue-300 border-t-2" />

                  <div className="text-blue-300 sm:text-base">
                    {pricingModel.features?.map((feature, i) => {
                      return (
                        <div key={i} className="flex items-center py-3">
                          <div className="w-8 h-8 sm:w-6 sm:h-6">
                            <svg
                              viewBox="0 0 20 21"
                              className="w-8 h-8 sm:w-6 sm:h-6 fill-current text-blue-300"
                            >
                              <path d="M10.0933 0.56543C5.04151 0.56543 0.908203 5.06543 0.908203 10.5654C0.908203 16.0654 5.04151 20.5654 10.0933 20.5654C15.1452 20.5654 19.2785 16.0654 19.2785 10.5654C19.2785 5.06543 15.1452 0.56543 10.0933 0.56543ZM13.9511 8.86543L9.54223 13.6654C9.17482 14.0654 8.62371 14.0654 8.25631 13.6654L6.23558 11.4654C5.86817 11.0654 5.86817 10.4654 6.23558 10.0654C6.60298 9.66543 7.15409 9.66543 7.5215 10.0654L8.89927 11.5654L12.6652 7.46543C13.0326 7.06543 13.5837 7.06543 13.9511 7.46543C14.3185 7.86543 14.3185 8.46543 13.9511 8.86543Z" />
                            </svg>
                          </div>
                          <ReactMarkdown
                            className="gsap-scrolltrigger ml-4 strong-white"
                            children={feature.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom triangle clip path */}
      <div className="relative">
        <div className="absolute bottom-0 inset-x-0 h-32 md:h-48 clip-triangle--reverse bg-blue-800"></div>
      </div>
    </div>
  );
}
