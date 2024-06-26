import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface formData {
  username: string;
  emai: string;
  password: string;
  message: string;
}
const ReactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const onSubmit = (data: FieldValues) => {
    console.log(errors);
    console.log(data);
  };
  return (
    <>
      <form id="form" action="/" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true, minLength: 5 })}
            id="username"
            name="username"
            type="text"
          />
          {errors.username?.type === "required" && (
            <p className="danger">The username is required</p>
          )}
          {errors.message?.type === "minLength" && (
            <p className="danger">
              The minimum length of the username should be of 5 characters
            </p>
          )}
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

export default ReactForm;
