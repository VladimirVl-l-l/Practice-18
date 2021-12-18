import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import User from "./user";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState();
   const [selectedProf, setSelectedProf] = useState();

   const pageSize = 4;
   useEffect(() => {
      api.professions.fetchAll().then((data) => setProfessions(data));
   }, []);
   useEffect(() => {
      setCurrentPage(1);
   }, [selectedProf]);
   const handleProfesionSelect = (item) => {
      setSelectedProf(item);
   };
   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };
   const filteredUsers = selectedProf
      ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
      : allUsers;
   const count = filteredUsers.length;

   const userCrop = paginate(filteredUsers, currentPage, pageSize);
   const clearFilter = () => {
      setSelectedProf();
   };

   return (
      <div className="d-flex">
         {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
               <GroupList
                  selectedItem={selectedProf}
                  items={professions}
                  onItemSelect={handleProfesionSelect}
               />
               <button
                  className={"btn btn-secondary m-2"}
                  onClick={clearFilter}
               >
                  Сброс
               </button>
            </div>
         )}
         <div className="d-flex flex-column">
            {count >= 0 && <SearchStatus length={count} />}
            {count > 0 && (
               <table className="table">
                  <thead>
                     <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col">Удалить</th>
                     </tr>
                  </thead>
                  <tbody>
                     {userCrop.map((user) => (
                        <User {...rest} {...user} key={user._id} />
                     ))}
                  </tbody>
               </table>
            )}
            <div className="d-flex justify-content-center">
               {count >= 0 && (
                  <Pagination
                     itemsCount={count}
                     pageSize={pageSize}
                     currentPage={currentPage}
                     onPageChange={handlePageChange}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

Users.propTypes = {
   users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Users;
