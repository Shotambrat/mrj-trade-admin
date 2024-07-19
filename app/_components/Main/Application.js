"use client";
import { useState } from "react";

export default function Application() {
  const [values, setValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    question: "",
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = (name, value) => {
    if (name === "fullName") {
      return value.length >= 3
        ? { isValid: true, message: "Правильно" }
        : { isValid: false, message: "Введите полное имя" };
    } else if (name === "phoneNumber") {
      const phoneRegex =
        /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/;
      return phoneRegex.test(value)
        ? { isValid: true, message: "Правильно" }
        : { isValid: false, message: "Введите правильный номер" };
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value)
        ? { isValid: true, message: "Правильно" }
        : { isValid: false, message: "Введите правильный email" };
    }
    return { isValid: true, message: "" };
  };

  return (
    <div className="w-full max-w-[1440px] max-auto px-2 mx-auto">
      <div className="w-full rounded-3xl flex flex-col max-lg:gap-8 lg:flex-row bg-snowy px-4 py-8 lg:px-12 lg:py-12 relative overflow-hidden">
        <div className="flex-1 w-full flex flex-col gap-5 z-10">
          <h2 className="text-4xl max-mdx:text-2xl text-greenView font-semibold">
            HAVE A QUESTION? <br />
            CONTACT US!
          </h2>
          <p className="text-neutral-500 w-full max-w-[350px] text-lg leading-6">
            Write your question and we will answer you as soon as possible
          </p>
        </div>
        <div className="z-10 flex-1 w-full flex justify-center">
          <form className="flex flex-col gap-6 w-full max-lg:max-w-full max-w-[350px]">
            {["fullName", "phoneNumber", "email", "question"].map((field) => (
              <div className="relative" key={field}>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={values[field]}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput(field)}
                  onBlur={() => setFocusedInput(null)}
                  className={`block w-full px-3 py-3 bg-white rounded-lg shadow-sm placeholder-transparent focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm border-2 ${
                    focusedInput === field
                      ? validateInput(field, values[field]).isValid
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-transparent"
                  }`}
                  placeholder={
                    field === "fullName"
                      ? "Full name"
                      : field === "phoneNumber"
                      ? "Phone number"
                      : field === "email"
                      ? "E-mail"
                      : "Your question"
                  }
                />
                <label
                  htmlFor={field}
                  className={`absolute left-3  transition-all ${
                    focusedInput === field || values[field]
                      ? "-top-4 text-xs"
                      : "top-3 text-sm"
                  } ${
                    focusedInput === field
                      ? validateInput(field, values[field]).isValid
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-gray-400"
                  } cursor-text`}
                  onClick={() => document.getElementsByName(field)[0].focus()}
                >
                  {focusedInput === field && values[field].length > 0 ? (
                    validateInput(field, values[field]).message
                  ) : field === "fullName" ? (
                    <p>
                      Full Name
                      <span className="text-red-600 ml-2">*</span>
                    </p>
                  ) : field === "phoneNumber" ? (
                    <p>
                      Phone number
                      <span className="text-red-600 ml-2">*</span>
                    </p>
                  ) : field === "email" ? (
                    "E-mail"
                  ) : (
                    "Your question"
                  )}
                </label>
              </div>
            ))}
            <div>
              <button
                type="submit"
                className="py-3 px-12 bg-greenView text-xs text-white font-semibold rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send question
              </button>
            </div>
          </form>
        </div>
        <div className="absolute -bottom-48 mdl:-left-20 max-mdl:-right-20 border-2 border-greenView opacity-30 rounded-full w-80 h-80 z-0"></div>
      </div>
    </div>
  );
}
