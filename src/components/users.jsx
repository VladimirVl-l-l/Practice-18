import React, { useState } from 'react';
import api from '../api';

const Users = () => {
   const [users, setUser] = useState(api.users.fetchAll());
   const handleDelete = (userId) => {
      setUser((newState) => newState.filter((user) => user._id !== userId));
   };
   const renderPhrase = (number) => {
      if (number === 0) {
         return 'Никто с тобой не тусанет';
      }
      if (number < 2 || number >= 5) {
         return `${number} человек тусанет с тобой сегодня`;
      }
      if (number >= 2 && number <= 4) {
         return `${number} человека тусанут с тобой сегодня`;
      }
   };
   const getPhraseClasses = (number) => {
      return number === 0 ? 'badge m-1 bg-danger' : 'badge m-1 bg-primary';
   };
   const getQualityClasses = (quality) => {
      return `badge bg-${quality.color} m-1`;
   };
   /*    const getQualityClasses = (color) => {
      if (color === 'primary') {
         return 'badge m-1 bg-primary';
      }
      if (color === 'secondary') {
         return 'badge m-1 bg-secondary';
      }
      if (color === 'success') {
         return 'badge m-1 bg-success';
      }
      if (color === 'danger') {
         return 'badge m-1 bg-danger';
      }
      if (color === 'info') {
         return 'badge m-1 bg-info';
      }
      if (color === 'dark') {
         return 'badge m-1 bg-dark';
      }
   }; */
   const renderTable = () => {
      if (users.length !== 0) {
         return (
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">Имя</th>
                     <th scope="col">Качества</th>
                     <th scope="col">Профессия</th>
                     <th scope="col">Встретился, раз</th>
                     <th scope="col">Оценка</th>
                     <th scope="col">Удалить</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                           {user.qualities.map((item) => (
                              <span
                                 key={item._id}
                                 className={getQualityClasses(item)}
                                 // className={getQualityClasses(item.color)}
                              >
                                 {item.name}
                              </span>
                           ))}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate} /5</td>
                        <td>
                           <button
                              key={user._id}
                              className="btn btn-danger"
                              onClick={() => handleDelete(user._id)}
                           >
                              delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         );
      }
   };

   return (
      <>
         <h1>Fast love App</h1>
         <h2>
            <span className={getPhraseClasses(users.length)}>
               {renderPhrase(users.length)}
            </span>
         </h2>
         {renderTable()}
      </>
   );
};

export default Users;
