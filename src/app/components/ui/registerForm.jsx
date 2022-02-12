import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
   const history = useHistory();
   const [data, setData] = useState({
      email: "",
      password: "",
      profession: "",
      sex: "male",
      qualities: [],
      licence: false
   });
   const { signUp } = useAuth();
   const { qualities } = useQualities();
   const qualitiesList = qualities.map((q) => ({
      label: q.name,
      value: q._id
   }));
   const { professions } = useProfessions();
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
   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      const newData = {
         ...data,
         qualities: data.qualities.map((q) => q.value)
      };
      try {
         await signUp(newData);
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
