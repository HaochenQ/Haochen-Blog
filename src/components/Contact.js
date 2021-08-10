import React, { useRef } from "react";
import { ValidationError, useForm } from "@formspree/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Translate from "@docusaurus/Translate";

const Contact = () => {
  const [state, handleSubmit] = useForm("mbjpwgpo");
  const formRef = useRef();

  useEffect(() => {
    if (state.succeeded && !state.submitting) {
      toast.success("Successfully Submitted!");
      if (formRef.current !== undefined) {
        formRef.current.reset();
      }
    }
  }, [state]);

  return (
    <section className="contact-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <article className="contact-form">
        <h3>
          <Translate>Contact Me</Translate>
        </h3>
        <form onSubmit={handleSubmit} ref={formRef}>
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
            <ValidationError
              field="email"
              prefix="Email"
              errors={state.errors}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="message"
              className="form-control"
            ></textarea>
            <button
              type="submit"
              disabled={state.submitting}
              className="submit-btn btn"
            >
              <Translate>submit here</Translate>
            </button>
            <div className="form-error">
              <ValidationError errors={state.errors} />
            </div>
            {/* {state.errors.length !== 0 && (
              <p className="form-error">Ooops! There was an error.</p>
            )} */}
          </div>
        </form>
      </article>
    </section>
  );
};

export default Contact;
