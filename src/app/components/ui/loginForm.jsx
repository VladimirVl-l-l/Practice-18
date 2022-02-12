import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const LoginForm = () => {
   const history = useHistory();
   const [data, setData] = useState({ email: "", password: "", stayOn: false });
   const [errors, setErrors] = useState({});
   const { signIn } = useLogin();
   const handleChange = (target) => {
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
   };
   const validatorConfig = {
      email: {
         isRequired: { message: "Почта обязательна для заполнения" },
         isEmail: { message: "Почта введена некорректно" }
      },
      password: {
         isRequired: { message: "Пароль обязателен для заполнения" },
         isCapitalSymbol: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
         },
         isContainDigit: {
            message: "Пароль должен содержать хотя бы одну цифру"
         },
         minSymbol: {
            message: "Пароль должен содержать минимум 8 символов",
            value: 8
         }
      }
   };

   useEffect(() => {
      validate();
   }, [data]);
   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };
   const isValid = Object.keys(errors).length === 0;
   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;

      try {
         await signIn(data);
         history.push("/");
      } catch (error) {
         setErrors(error);
      }
   };
   return (
      <form onSubmit={handleSubmit}>
         <TextField
            label="Электронная почта"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
         />
         <TextField
            label="Пароль"
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
         />
         <CheckBoxField
            value={data.stayOn}
            onChange={handleChange}
            name="stayOn"
         >
            Оставаться в системе
         </CheckBoxField>
         <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
         >
            Submit
         </button>
      </form>
   );
};

export default LoginForm;
