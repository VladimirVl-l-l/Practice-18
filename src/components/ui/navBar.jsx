import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
   const [activeNavButton, setNavButton] = useState();
   const getClass = (item) => {
      return (
         "btn btn-outline-info m-2" +
         (activeNavButton === item ? " active" : "")
      );
   };
   const activeLink = (item) => {
      setNavButton(item);
   };
   return (
      <>
         <button
            className={getClass("Main")}
            onClick={() => activeLink("Main")}
         >
            <Link to="/">Main</Link>
         </button>
         <button
            className={getClass("Login")}
            onClick={() => activeLink("Login")}
         >
            <Link to="/login">Login</Link>
         </button>
         <button
            className={getClass("Users")}
            onClick={() => activeLink("Users")}
         >
            <Link to="/users">Users</Link>
         </button>
      </>
   );
};

export default NavBar;
