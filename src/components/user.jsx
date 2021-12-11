import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const User = ({ user, deleteUser, userToggleBookMark }) => {
   return (
      <>
         {user.map((user) => (
            <tr key={user._id}>
               <td>{user.name}</td>
               <td>
                  {user.qualities.map((item) => (
                     <Qualitie
                        key={item._id}
                        color={item.color}
                        name={item.name}
                        _id={item._id}
                     />
                  ))}
               </td>
               <td>{user.profession.name}</td>
               <td>{user.completedMeetings}</td>
               <td>{user.rate} /5</td>
               <td>
                  <BookMark
                     status={user.bookmark}
                     {...user}
                     toggleBookMark={userToggleBookMark}
                  />
               </td>
               <td>
                  <button
                     key={user._id}
                     className={'btn btn-danger'}
                     onClick={() => deleteUser(user._id)}
                  >
                     Удалить
                  </button>
               </td>
            </tr>
         ))}
      </>
   );
};

export default User;
