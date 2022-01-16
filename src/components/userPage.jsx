import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";
import api from "../api";

const UserPage = ({ userId }) => {
   const history = useHistory();
   const [user, setUser] = useState();
   useEffect(() => {
      api.users.getById(userId).then((data) => setUser(data));
   });
   const handleBack = () => {
      history.replace("/users");
   };

   return (
      <>
         {user && (
            <div>
               <h1>Имя: {user.name}</h1>
               <h2>Профессия: {user.profession.name}</h2>
               <h6>
                  Качества: <QualitiesList qualities={user.qualities} />
               </h6>
               <h6>Встретился, раз: {user.completedMeetings}</h6>
               <h1>Оценка: {user.rate}</h1>
               <button
                  onClick={() => {
                     handleBack();
                  }}
               >
                  Все пользователи
               </button>
            </div>
         )}
      </>
   );
};

UserPage.propTypes = {
   userId: PropTypes.string
};

export default UserPage;
