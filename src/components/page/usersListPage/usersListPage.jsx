import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersList = () => {
   const { users } = useUser();
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState();
   const [selectedProf, setSelectedProf] = useState();
   const [searchUser, setSearchUser] = useState("");
   const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
   const pageSize = 6;

   const handleDelete = (userId) => {
      // setUser(users.filter((user) => user._id !== userId));
      console.log(userId);
   };

   const handleToggleBookMark = (id) => {
      const newArray = users.map((user) => {
         if (user._id === id) {
            return { ...user, bookmark: !user.bookmark };
         }
         return user;
      });
      // setUsers(newArray);
      console.log(newArray);
   };

   useEffect(() => {
      api.professions.fetchAll().then((data) => setProfessions(data));
   }, []);

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedProf, searchUser]);

   const handleProfesionSelect = (item) => {
      if (searchUser !== "") setSearchUser("");
      setSelectedProf(item);
   };

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const handleSort = (item) => {
      setSortBy(item);
   };
   const handleSearchUser = ({ target }) => {
      setSelectedProf(undefined);
      setSearchUser(target.value);
   };

   if (users) {
      let filteredUsers;
      if (searchUser) {
         filteredUsers = users.filter(
            (user) =>
               user.name.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
         );
      } else if (selectedProf) {
         filteredUsers = users.filter((user) =>
            _.isEqual(user.profession, selectedProf)
         );
      } else {
         filteredUsers = users;
      }
      const sortedUsers = _.orderBy(
         filteredUsers,
         [sortBy.path],
         [sortBy.order]
      );

      const count = filteredUsers.length;

      const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
               <SearchStatus length={count} />
               <div className="searchbar form-group">
                  <input
                     value={searchUser}
                     type="text"
                     className="form-control"
                     placeholder="Поиск людей по имени..."
                     onChange={handleSearchUser}
                  />
               </div>
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
