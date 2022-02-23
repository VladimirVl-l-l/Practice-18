import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
   const { currentUser, updateProfile } = useAuth();
   const history = useHistory();
   const [isLoading, setIsLoading] = useState(true);
   const [errors, setErrors] = useState({});
   const [data, setData] = useState({
      name: "",
      email: "",
      sex: ""
   });
   const { professions } = useProfessions();
   const professionsList = professions.map((p) => ({
      label: p.name,
      value: p._id
   }));
   const { qualities } = useQualities();
   const qualitiesList = qualities.map((q) => ({
      label: q.name,
      value: q._id
   }));

   const transformData = (arrId) => {
      const data = [];
      for (const id of arrId) {
         for (const quality in qualities) {
            if (id === qualities[quality]._id) {
               data.push(qualities[quality]);
            }
         }
      }
      return data.map((qual) => ({
         label: qual.name,
         value: qual._id
      }));
   };

   useEffect(() => {
      setData({
         _id: currentUser._id,
         name: currentUser.name,
         email: currentUser.email,
         image: currentUser.image,
         profession: currentUser.profession,
         qualities: transformData(currentUser.qualities),
         sex: currentUser.sex
      });
      setIsLoading(false);
   }, [qualities]);
   const getProfessionById = (id) => {
      for (const prof in professions) {
         const profData = professions[prof];
         if (profData._id === id) return profData._id;
      }
   };
   const getQualities = (elements) => {
      const qualitiesArray = [];
      for (const elem of elements) {
         for (const quality in qualities) {
            if (elem.value === qualities[quality]._id) {
               qualitiesArray.push(qualities[quality]);
            }
         }
      }
      return qualitiesArray;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      const newData = {
         ...data,
         profession: getProfessionById(data.profession),
         qualities: getQualities(data.qualities)
      };
      try {
         await updateProfile(newData);
         history.push(`/users/${currentUser._id}`);
      } catch (error) {
         setErrors(error);
      }
   };

   const validatorConfig = {
      email: {
         isRequired: {
            message: "Электронная почта обязательна для заполнения"
         },
         isEmail: {
            message: "Email введен некорректно"
         }
      },
      name: {
         isRequired: {
            message: "Введите ваше имя"
         }
      }
   };

   useEffect(() => validate(), [data]);
   const handleChange = (target) => {
      setData((prevState) => ({
         ...prevState,
         [target.name]: target.value
      }));
   };

   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };
   const isValid = Object.keys(errors).length === 0;

   return (
      <div className="container mt-5">
         <BackHistoryButton />
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               {!isLoading && Object.keys(professions).length > 0 ? (
                  <form onSubmit={handleSubmit}>
                     <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                     />
                     <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                     />
                     <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        options={professionsList}
                        name="profession"
                        onChange={handleChange}
                        value={data.profession}
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
                     <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto"
                     >
                        Обновить
                     </button>
                  </form>
               ) : (
                  "Loading..."
               )}
            </div>
         </div>
      </div>
   );
};

export default EditUserPage;
