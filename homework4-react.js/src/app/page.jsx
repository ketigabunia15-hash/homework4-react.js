"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./RegisterForm.css";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("სახელი სავალდებულოა")
    .min(4, "მინიმუმ 4 სიმბოლო")
    .max(20, "მაქსიმუმ 20 სიმბოლო"),
  lastName: yup
    .string()
    .required("გვარი სავალდებულოა")
    .min(4, "მინიმუმ 4 სიმბოლო")
    .max(20, "მაქსიმუმ 20 სიმბოლო"),
  age: yup
    .number()
    .typeError("ასაკი უნდა იყოს რიცხვი")
    .required("ასაკი სავალდებულოა")
    .min(13, "მინიმუმ 13 წელი")
    .max(120, "მაქსიმუმ 120 წელი"),
  email: yup.string().email("არასწორი იმეილი").required("იმეილი სავალდებულოა"),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა")
    .min(6, "მინიმუმ 6 სიმბოლო")
    .max(12, "მაქსიმუმ 12 სიმბოლო")
    .matches(/[A-Z]/, "უნდა შეიცავდეს მინ. 1 დიდ ასოს")
    .matches(/[a-z]/, "უნდა შეიცავდეს მინ. 1 პატარა ასოს")
    .matches(/[0-9]/, "უნდა შეიცავდეს მინ. 1 ციფრს"),
  phone: yup
    .string()
    .required("ტელეფონი სავალდებულოა")
    .matches(/^\d+$/, "მხოლოდ ციფრები")
    .min(10, "მინიმუმ 10 სიმბოლო")
    .max(100, "მაქსიმუმ 100 სიმბოლო"),
});

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    alert("რეგისტრაცია წარმატებულია ");
    reset();
  };

   return (
    <div className="form-container">
      <h2>რეგისტრაცია</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input placeholder="სახელი" {...register("firstName")} />
          <p className="error">{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="გვარი" {...register("lastName")} />
          <p className="error">{errors.lastName?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="ასაკი" {...register("age")} />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="იმეილი" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <input type="password" placeholder="პაროლი" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="ტელეფონი" {...register("phone")} />
          <p className="error">{errors.phone?.message}</p>
        </div>

        <button type="submit">რეგისტრაცია</button>
      </form>
    </div>
  );
}