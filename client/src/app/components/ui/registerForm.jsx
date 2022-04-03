import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
   const dispatch = useDispatch();
   const [data, setData] = useState({
      email: "",
      password: "",
      profession: "",
      name: "",
      sex: "male",
      qualities: [],
      licence: false
   });

   const qualities = useSelector(getQualities());
   const qualitiesList = qualities.map((q) => ({
      label: q.name,
      value: q._id
   }));
   const professions = useSelector(getProfessions());
   const professionsList = professions.map((p) => ({
      label: p.name,
      value: p._id
   }));
   const [errors, setErrors] = useState({});

   const handleChange = (target) => {
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
   };
   const validatorConfig = {
      email: {
         isRequired: { message: "Почта обязательна для заполнения" },
         isEmail: { message: "Почта введена некорректно" }
      },
      name: {
         isRequired: { message: "Имя обязательно для заполнения" },
         minSymbol: {
            message: "Имя должно содержать минимум 3 символа",
            value: 3
         }
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
      },
      profession: {
         isRequired: { message: "Выберите вашу профессию" }
      },
      licence: {
         isRequired: {
            message:
               "Вы не можете пользоваться нашим сервисом без подтверждения лицензионного соглашения"
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
   const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      const newData = {
         ...data,
         qualities: data.qualities.map((q) => q.value)
      };
      dispatch(signUp(newData));
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
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
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
         <SelectField
            label="Выберите вашу профессию"
            defaultOption="Choose..."
            options={professionsList}
            name="profession"
            value={data.profession}
            onChange={handleChange}
            error={errors.profession}
         />
         <RadioField
            name="sex"
            label="Выберите пол"
            options={[
               { name: "Мужской", value: "male" },
               { name: "Женский", value: "female" }
            ]}
            value={data.sex}
            onChange={handleChange}
         />
         <MultiSelectField
            label="Выберите ваши качества"
            name="qualities"
            options={qualitiesList}
            onChange={handleChange}
            defaultValue={data.qualities}
         />
         <CheckBoxField
            name="licence"
            value={data.licence}
            onChange={handleChange}
            error={errors.licence}
         >
            Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
