import React from "react";
const Contact = () => {
  return (
    <section className="contact-page">
      <article className="contact-form">
        <h3>Contact Me</h3>
        <form action="https://formspree.io/f/mbjpwgpo" method="POST">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="form-control"
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              className="form-control"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="message"
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn btn">
            submit here
          </button>
        </form>
      </article>
    </section>
  );
};

export default Contact;
