import React, { useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
   const count = users.length;
   const pageSize = 4;
   const [currentPage, setCurrentPage] = useState(1);
   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };
   const paginate = (items, pageNumber, pageSize) => {
      const startIndex = (pageNumber - 1) * pageSize;
      return [...items].splice(startIndex, pageSize);
   };
   const userCrop = paginate(users, currentPage, pageSize);

   return (
      <>
         {users.length > 0 && (
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
         <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
         />
      </>
   );
};

Users.propTypes = {
   users: PropTypes.array.isRequired
};

export default Users;
