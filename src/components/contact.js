const Contact = (props) => {
  return (
    <div className="bg-orange-500">
      <div id="contact" className="m-container py-24">

        <div className="relative">
          <div className="absolute bg-polka-dots--orange bg-polka-dots--title w-24 h-24 mt-4 bg-repeat"></div>

          <h2 className="relative heading-2 font-extrabold text-white pl-4 border-l-8 border-blue-500">
            Contact
          </h2>
        </div>

        <form className="mt-8" id="js-contact-form" name="contact" method="POST" data-netlify="true">
          <p className="mt-4">
            <label htmlFor="contact_name">Naam</label>
            <input id="contact_name" type="text" name="name" minLength="3" required />
          </p>
          <p className="mt-4">
            <label htmlFor="contact_email">Email</label>
            <input id="contact_email" type="email" name="email" minLength="10" required />
          </p>
          <p className="mt-4">
            <label htmlFor="contact__body">Bericht</label>
            <textarea id="contact__body" name="body"></textarea>
          </p>
          <p className="mt-4 align-top">
            <button type="submit" className="btn btn--blue">Verstuur</button>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Contact;
