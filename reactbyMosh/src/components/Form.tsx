import React, { FormEvent, useRef } from "react";

const Form = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const person = { username: "", email: "", password: "", message: "" };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (usernameRef.current !== null)
      person.username = usernameRef.current.value;
    if (emailRef.current !== null) person.email = emailRef.current.value;
    if (messageRef.current !== null) person.message = messageRef.current.value;
    console.log(person);
  };
  return (
    <>
      <form id="form" action="/" onSubmit={handleSubmit}>
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} id="username" name="username" type="text" />
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" name="email" type="text" />
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
          />
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="message">Message</label>
          <input ref={messageRef} id="message" name="message" type="message" />
          <div className="error"></div>
        </div>

        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
