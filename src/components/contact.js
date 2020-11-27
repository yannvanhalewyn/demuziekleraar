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

const TextInputGroup = ({ className, label, type, minLength, id, name }) => {
  const inputClasses = "text-gray-700 border-b border-gray-400 bg-transparent outline-none placeholder-blue-300 placeholder-opacity-30 focus:border-orange-600"

  return (
    <p className={"text-gray-500 focus-within:text-orange-600 " + className}>
      <label className="block font-semibold uppercase tracking-wide text-sm" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ?
       <textarea
         className={`w-full mt-1 py-2 ${inputClasses}`}
         id={id}
         name={name}
         rows="4"
       />
       :
      <input
        className={`w-full mt-1 py-2 ${inputClasses}`}
        id={id}
        type={type}
        name={name}
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

      <div id="contact" className="m-container py-24 lg:flex">

        <div className="lg:pr-12 lg:flex-1 lg:flex lg:flex-col lg:justify-between">
          <div className="relative">
            <div className="absolute bg-polka-dots--blue-900 bg-polka-dots--title w-24 h-24 mt-4 bg-repeat"></div>
            <h2 className="gsap-scroll-appear-left relative heading-2 font-extrabold text-white pl-4 border-l-8 border-red-500">
              Contact
            </h2>
          </div>

          <p className="gsap-scroll-appear-left mt-16 text-blue-200 leading-relaxed tracking-wider">
            {props.message}
          </p>

          <ul className="mt-8 md:mt-12">
            {[
              [`tel:${props.phoneNumber}`, props.phoneNumber, PhoneIcon],
              [`mailto:${props.email}`, props.email, MailIcon],
            ].map(([link, text, Icon]) => {
              return (
                <li key={text} className="gsap-scroll-appear-left mt-6 md:mt-8">
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
        </div>

        <div className="mt-12 lg:mt-0 lg:flex-1">
          <form
            className="gsap-scroll-appear-right-delay-1 bg-white p-6 sm:p-8 md:p-10 rounded-md shadow-xl"
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
