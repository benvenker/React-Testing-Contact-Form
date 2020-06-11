import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = () => {
    axios
      .get(`https://reqres.in/api/users/2`)
      .then((response) => response.data)
      .then((data) => setData(data));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            id="firstName"
            placeholder="bill"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            id="lastName"
            placeholder="luo"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input name="email" id="email" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            name="message"
            id="message"
            data-testid="message"
            ref={register({ required: false })}
          />
        </div>
        {data && (
          <pre
            data-testid="response"
            style={{ textAlign: "left", color: "white" }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <button id="button" name="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
