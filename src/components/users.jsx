import React from 'react';
import User from './user';

const Users = ({ users, onDelete, onToggleBookMark }) => {
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
                  <User
                     user={users}
                     deleteUser={onDelete}
                     userToggleBookMark={onToggleBookMark}
                  />
               </tbody>
            </table>
         )}
      </>
   );
};

export default Users;
