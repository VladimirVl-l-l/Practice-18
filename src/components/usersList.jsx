import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import SearchBar from "./searchBar";

const UsersList = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState();
   const [selectedProf, setSelectedProf] = useState();
   const [searchUser, setSearchUser] = useState();
   const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
   const pageSize = 6;

   const [users, setUser] = useState();

   useEffect(() => {
      api.users.fetchAll().then((data) => setUser(data));
   }, []);

   const handleDelete = (userId) => {
      setUser(users.filter((user) => user._id !== userId));
   };

   const handleToggleBookMark = (userId) => {
      setUser(
         users.map((user) => {
            if (user._id === userId) {
               return { ...user, bookmark: !user.bookmark };
            }
            return user;
         })
      );
   };

   useEffect(() => {
      api.professions.fetchAll().then((data) => setProfessions(data));
   }, []);

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedProf]);

   useEffect(() => {
      setCurrentPage(1);
   }, [searchUser]);

   const handleProfesionSelect = (item) => {
      setSelectedProf(item);
   };

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const handleSort = (item) => {
      setSortBy(item);
   };
   const handleSearchUser = (items) => {
      setSearchUser(items);
   };

   if (users) {
      const filteredUsers = selectedProf
         ? users.filter((user) => _.isEqual(user.profession, selectedProf))
         : users;

      const sortedUsers = _.orderBy(
         filteredUsers,
         [sortBy.path],
         [sortBy.order]
      );

      const searchUsers = searchUser?.data || users;
      const renderUsers = selectedProf ? sortedUsers : searchUsers;

      const count = selectedProf ? filteredUsers.length : searchUsers.length;

      const userCrop = paginate(renderUsers, currentPage, pageSize);

      const clearFilter = () => {
         setSelectedProf();
      };
      const clearSearch = () => {
         setSearchUser();
      };

      return (
         <div className="d-flex">
            {professions && (
               <div
                  className="d-flex flex-column flex-shrink-0 p-3"
                  onClick={clearSearch}
               >
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
               <SearchStatus length={count} />
               <SearchBar
                  data={users}
                  update={handleSearchUser}
                  clearFil={clearFilter}
               />
               {count > 0 && (
                  <UserTable
                     users={userCrop}
                     onSort={handleSort}
                     selectedSort={sortBy}
                     onDelete={handleDelete}
                     onToggleBookMark={handleToggleBookMark}
                  />
               )}
               <div className="d-flex justify-content-center">
                  <Pagination
                     itemsCount={count}
                     pageSize={pageSize}
                     currentPage={currentPage}
                     onPageChange={handlePageChange}
                  />
               </div>
            </div>
         </div>
      );
   }
   return <h2>Loading...</h2>;
};

UsersList.propTypes = {
   users: PropTypes.array
};

export default UsersList;
