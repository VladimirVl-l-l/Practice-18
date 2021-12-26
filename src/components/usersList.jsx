import React, { useState, useEffect } from "react";
import UserPage from "./userPage";
import Users from "./users";
import PropTypes from "prop-types";
import api from "../api";

const UsersList = ({ match }) => {
   const [users, setUser] = useState();

   useEffect(() => {
      api.users.fetchAll().then((data) => setUser(data));
   });

   const userId = match.params.userId;
   console.log("users", users);
   if (users) {
      if (users.find((user) => user._id === userId)) {
         return (
            <>
               <div>
                  {userId ? <UserPage users={users} id={userId} /> : <Users />}
               </div>
            </>
         );
      }
      return <h2>Loading...</h2>;
   }
   return <h2>Loading</h2>;
};

UsersList.propTypes = {
   match: PropTypes.object
};

export default UsersList;
