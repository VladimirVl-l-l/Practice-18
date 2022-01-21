import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
   const { userId } = useParams();

   const { edit } = useParams();
   console.log(edit);
   if (userId) {
      if (edit) {
         return <EditUserPage />;
      }
      return <UserPage userId={userId} />;
   } else {
      return <UsersListPage />;
   }
};

export default Users;
