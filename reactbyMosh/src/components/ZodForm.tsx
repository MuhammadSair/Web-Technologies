import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  message: z.string().min(1, "Message is required"),
});
type formData = z.infer<typeof schema>;
const ReactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(schema) });
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
            {...register("username")}
            id="username"
            name="username"
            type="text"
          />
          {errors.username && (
            <p className="danger">{errors.username.message}</p>
          )}
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input {...register("email")} id="email" name="email" type="text" />
          {errors.email && <p className="danger">{errors.email.message}</p>}
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
          />
          {errors.password && (
            <p className="danger">{errors.password.message}</p>
          )}
          <div className="error"></div>
        </div>
        <div className="input-control">
          <label htmlFor="message">Message</label>
          <input
            {...register("message")}
            id="message"
            name="message"
            type="message"
          />
          {errors.message && <p>{errors.message.message}</p>}
          <div className="error"></div>
        </div>

        <button disabled={!isValid} type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ReactForm;
