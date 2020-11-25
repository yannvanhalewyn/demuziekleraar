import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import SignupButton from "./signup_button";

export default function Pricing({ pricingModels }) {
  // Used in netlify cms preview, sinds we don't hydrate our production app for
  // page loads there is a native js toggle implementation loaded along the app.
  const [toggled, setToggled] = useState(false);

  return (
    <div className="bg-blue-700 text-white">
      <div className="m-container py-24">
        <div className="relative">
          <div className="absolute bg-polka-dots--blue bg-polka-dots--title w-24 h-24 mt-4 bg-repeat"></div>

          <h2 className="relative heading-2 font-extrabold text-white pl-4 border-l-8 border-red-600">
            Tarieven
          </h2>
        </div>

        <div className="mt-16">
          <div className="flex items-center text-blue-300 font-semibold">
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

          <div className="mt-6 lg:flex lg:bg-blue-600 lg:rounded-xl lg:overflow-hidden lg:shadow-xl">
            {pricingModels?.map((pricingModel, i) => {
              return (
                <div
                  key={i}
                  className={`lg:flex-1 p-6 xs:p-10 md:p-16 rounded-xl shadow-xl bg-blue-600 lg:rounded-none lg:shadow-none lg:bg-none ${i !== pricingModels.length -1 ? "mb-12 lg:mb-0 lg:border-r-2 lg:border-blue-300" : ""}`}
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
                        <span className="font-bold text-5xl">
                          {toggled
                            ? pricingModel.priceAdults
                            : pricingModel.priceChildren}
                        </span>
                      </div>
                      <span className="text-blue-300">
                        {pricingModel.priceSubtitle}
                      </span>
                    </div>

                    <SignupButton className="shadow-md mt-12 bg-orange-500 hover:bg-orange-600" />

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
                            className="ml-4 strong-orange-500"
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
    </div>
  );
}
