import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ users, id }) => {
   const getUserById = (id) => {
      return users.find((user) => user._id === id);
   };
   const history = useHistory();
   const handleBack = () => {
      history.replace("/users");
   };
   const user = getUserById(id);

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
   id: PropTypes.string,
   users: PropTypes.array
};

export default UserPage;
