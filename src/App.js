import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
   const [users, setUser] = useState(api.users.fetchAll());
   const handleDelete = (userId) => {
      setUser(users.filter((user) => user._id !== userId));
   };
   const handleToggleBookMark = (userId) => {
      setUser(
         users.map((user) => {
            if (user._id === userId) {
               user.bookmark = !user.bookmark;
            }
            return user;
         })
      );
   };

   return (
      <div>
         <h1>Fast company</h1>
         <h2>
            <SearchStatus length={users.length} />
         </h2>
         <Users
            users={users}
            onDelete={handleDelete}
            onToggleBookMark={handleToggleBookMark}
         />
      </div>
   );
}

export default App;
