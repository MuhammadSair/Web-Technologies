import React, { FormEvent, useRef, useState } from "react";

const FormUse = () => {
  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
    message: "",
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };
  return (
    <>
      <form id="form" action="/" onSubmit={handleSubmit}>
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPerson({ ...person, username: event.target.value });
            }}
            value={person.username}
            id="username"
            name="username"
            type="text"
          />
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="message">Message</label>
          <input id="message" name="message" type="message" />
          <div className="error"></div>
        </div>

        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default FormUse;
