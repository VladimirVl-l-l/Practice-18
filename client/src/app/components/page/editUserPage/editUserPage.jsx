import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import {
   getQualities,
   getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
   getProfessions,
   getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
   const dispatch = useDispatch();
   const currentUser = useSelector(getCurrentUserData());
   const [isLoading, setIsLoading] = useState(true);
   const [errors, setErrors] = useState({});
   const [data, setData] = useState();
   const professions = useSelector(getProfessions());
   const professionLoading = useSelector(getProfessionsLoadingStatus());
   const professionsList = professions.map((p) => ({
      label: p.name,
      value: p._id
   }));
   const qualities = useSelector(getQualities());
   const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
   const qualitiesList = qualities.map((q) => ({
      label: q.name,
      value: q._id
   }));

   const transformData = (qualitiesIds) => {
      const data = [];
      for (const qualId of qualitiesIds) {
         for (const quality of qualities) {
            if (qualId === quality._id) {
               data.push(quality);
            }
         }
      }
      return data.map((qual) => ({
         label: qual.name,
         value: qual._id
      }));
   };

   useEffect(() => {
      if (!professionLoading && !qualitiesLoading && currentUser && !data) {
         setData({
            ...currentUser,
            qualities: transformData(currentUser.qualities)
         });
      }
   }, [professionLoading, qualitiesLoading, currentUser, data]);

   useEffect(() => {
      if (data && isLoading) {
         setIsLoading(false);
      }
   }, [data]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      dispatch(
         updateUser({
            ...data,
            qualities: data.qualities.map((q) => q.value)
         })
      );
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
