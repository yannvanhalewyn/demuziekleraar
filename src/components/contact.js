import PolkaTitle from "./polkaTitle";

const PhoneIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Zm.5,6a1,1,0,0,1-.34.75,1.05,1.05,0,0,1-.82.25A17,17,0,0,1,4.07,5.22a1.09,1.09,0,0,1,.25-.82,1,1,0,0,1,.75-.34h3a1,1,0,0,1,1,.79q.06.41.15.81a11.12,11.12,0,0,0,.46,1.55l-1.4.65a1,1,0,0,0-.49,1.33,14.49,14.49,0,0,0,7,7,1,1,0,0,0,.76,0,1,1,0,0,0,.57-.52l.62-1.4a13.69,13.69,0,0,0,1.58.46q.4.09.81.15a1,1,0,0,1,.79,1Z" />
    </svg>
  );
};

const MailIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm-.41,2-5.88,5.88a1,1,0,0,1-1.42,0L5.41,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V7.41l5.88,5.88a3,3,0,0,0,4.24,0L20,7.41Z" />
    </svg>
  );
};

const YoutubeIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path d="M508.6 148.8c0-45-33.1-81.2-74-81.2C379.2 65 322.7 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.6-.1 220.2 0 255.8c-.1 35.6 1 71.2 3.4 106.9 0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8 60.8.2 120.3-1 178.6-3.8 40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107 .2-35.6-.9-71.2-3.3-106.9zM207 353.9V157.4l145 98.2-145 98.3z"/>
    </svg>
  );
};

const InstagramIcon = ({ className }) => {
  return (

    <svg className={className} viewBox="0 0 600 600" >
        <path d="M300 44c-69.526 0-78.244.295-105.549 1.54-27.248 1.244-45.858 5.571-62.142 11.9-16.834 6.542-31.11 15.296-45.342 29.528-14.232 14.231-22.986 28.508-29.528 45.342-6.329 16.283-10.656 34.893-11.9 62.141C44.295 221.756 44 230.474 44 300c0 69.524.294 78.242 1.54 105.547 1.243 27.248 5.57 45.858 11.9 62.141 6.541 16.834 15.295 31.11 29.527 45.344 14.231 14.231 28.508 22.985 45.342 29.527 16.284 6.328 34.894 10.656 62.142 11.899 27.305 1.245 36.023 1.54 105.549 1.54 69.524 0 78.242-.295 105.547-1.54 27.248-1.243 45.858-5.571 62.141-11.899 16.834-6.542 31.11-15.296 45.344-29.527 14.231-14.233 22.985-28.51 29.527-45.344 6.328-16.283 10.656-34.893 11.899-62.14 1.245-27.306 1.54-36.024 1.54-105.548 0-69.526-.295-78.244-1.54-105.549-1.243-27.248-5.571-45.858-11.899-62.141-6.542-16.834-15.296-31.11-29.527-45.342-14.233-14.232-28.51-22.986-45.344-29.528-16.283-6.329-34.893-10.656-62.14-11.9C378.241 44.296 369.523 44 300 44zm0 46.127c68.354 0 76.45.26 103.445 1.492 24.96 1.139 38.514 5.31 47.535 8.814 11.95 4.644 20.477 10.192 29.435 19.15 8.959 8.958 14.506 17.487 19.15 29.435 3.506 9.02 7.676 22.576 8.815 47.535 1.231 26.995 1.492 35.092 1.492 103.447 0 68.354-.26 76.45-1.492 103.445-1.139 24.96-5.31 38.514-8.815 47.535-4.644 11.95-10.191 20.477-19.15 29.435-8.958 8.959-17.486 14.506-29.435 19.15-9.02 3.506-22.576 7.676-47.535 8.814-26.99 1.232-35.086 1.493-103.445 1.493-68.36 0-76.455-.26-103.447-1.493-24.96-1.138-38.514-5.308-47.535-8.814-11.95-4.644-20.477-10.191-29.436-19.15-8.958-8.958-14.506-17.486-19.149-29.435-3.506-9.02-7.676-22.576-8.815-47.535-1.232-26.994-1.492-35.091-1.492-103.445 0-68.355.26-76.452 1.492-103.447 1.139-24.96 5.31-38.514 8.815-47.535 4.643-11.948 10.191-20.477 19.15-29.435 8.958-8.958 17.486-14.506 29.435-19.15 9.02-3.505 22.576-7.675 47.535-8.814 26.995-1.232 35.092-1.492 103.447-1.492z"/>
        <path d="M300 385.332c-47.13 0-85.334-38.205-85.334-85.332 0-47.13 38.205-85.334 85.334-85.334 47.127 0 85.332 38.205 85.332 85.334 0 47.127-38.205 85.332-85.332 85.332zm0-216.792c-72.604 0-131.46 58.856-131.46 131.46 0 72.602 58.856 131.458 131.46 131.458 72.602 0 131.458-58.856 131.458-131.458 0-72.604-58.856-131.46-131.458-131.46zM467.372 163.346c0 16.967-13.754 30.72-30.72 30.72s-30.72-13.753-30.72-30.72c0-16.966 13.754-30.719 30.72-30.719s30.72 13.753 30.72 30.72z"/>
    </svg>
  );
};

const TextInputGroup = ({ className, label, type, minLength, id, name }) => {
  const inputClasses = "text-gray-700 border-b border-gray-400 bg-gray-50 rounded-md outline-none placeholder-blue-300 placeholder-opacity-30 focus:border-orange-500"

  return (
    <p className={"text-gray-500 focus-within:text-orange-500 " + className}>
      <label className="block font-semibold uppercase tracking-wide text-sm" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ?
       <textarea
         className={`w-full mt-1 py-2 ${inputClasses}`}
         id={id}
         name={id}
         rows="4"
       />
       :
      <input
        className={`w-full mt-1 py-2 ${inputClasses}`}
        id={id}
        type={type}
        name={id}
        minLength={minLength}
        required
      />
      }
    </p>
  );
};

const Contact = (props) => {
  return (
    <div className="gsap-scroll-trigger bg-blue-800">
      <div id="contact" className="m-container py-12 md:py-24 lg:flex">

        <div className="lg:pr-12 lg:flex-1 lg:flex lg:flex-col lg:justify-between">

          <PolkaTitle dotsClassName="bg-polka-dots--blue-900">
            <h2 className="gsap-scroll-appear-left heading-2 font-extrabold text-white pl-4 border-l-8 border-red-500">
              Contact
            </h2>
          </PolkaTitle>

          <p className="gsap-scroll-appear-left mt-16 text-blue-200 leading-relaxed tracking-wider">
            {props.message}
          </p>

          <ul className="mt-12">
            {[
              [`tel:${props.phoneNumber}`, props.phoneNumber, PhoneIcon],
              [`mailto:${props.email}`, props.email, MailIcon],
            ].map(([link, text, Icon], i) => {
              return (
                <li key={text} className={`gsap-scroll-appear-left ${i === 0 ? "" : "mt-6 md:mt-8"}`}>
                  <a
                    className="group flex w-72 items-center p-4 rounded-lg bg-blue-700 shadow-inner hover:bg-blue-900 hover:shadow"
                    href={link}
                  >
                    <Icon
                      className="w-6 h-6 fill-current text-blue-300 group-hover:text-blue-300"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-3 text-blue-200 group-hover:text-white">
                      {text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 flex gsap-scroll-appear-left">
            <li>
              <a className="block p-4 rounded-2xl hover:bg-blue-900" target="_blank" href={props.youtubeUrl}>
                <YoutubeIcon className="w-8 h-8 fill-current text-blue-200"/>
              </a>
            </li>

            <li>
              <a className="block p-4 rounded-2xl hover:bg-blue-900" target="_blank" href={props.instagramUrl}>
                <InstagramIcon className="w-8 h-8 fill-current text-blue-200"/>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 lg:mt-0 lg:flex-1">
          <form
            className="gsap-scroll-appear-right-delay-1 p-6 sm:p-8 md:p-10 lg:h-full lg:flex lg:flex-col lg:justify-between bg-white rounded-md shadow-xl"
            id="js-contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
          >
            <div className="lg:flex">
              <TextInputGroup className="sm:w-64 lg:mr-4" label="Naam" id="name" type="text" minLength="3" />
              <TextInputGroup className="mt-8 lg:mt-0 sm:w-64" label="Email" id="email" type="email" minLength="10" />
            </div>
            <TextInputGroup className="mt-8" label="Bericht" id="body" type="textarea" />

            <div className="mt-8 align-top text-center sm:text-left lg:text-center">
              <button type="submit" className="btn btn--orange">


                <div className="flex items-center">
                  <div className="group-hover:animation-spin group-hover:animation-duration-100 group-hover:animation-1">
                    <svg className="w-5 h-5 group-hover:animation-grow group-hover:animation-duration-1000 group-hover:animation-1 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"/>
                    </svg>
                  </div>

                  <span className="ml-2">
                    Verstuur
                  </span>
                </div>

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
