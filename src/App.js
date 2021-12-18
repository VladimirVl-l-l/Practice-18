import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
   const [users, setUser] = useState(api.users.fetchAll());
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

   return (
      <div>
         <h1>Fast company</h1>
         <Users
            users={users}
            onDelete={handleDelete}
            onToggleBookMark={handleToggleBookMark}
         />
      </div>
   );
}

export default App;
