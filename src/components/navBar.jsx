import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
   return (
      <>
         <span className={"btn btn-outline-info m-2"}>
            <Link to="/">Main</Link>
         </span>
         <span className={"btn btn-outline-info m-2"}>
            <Link to="/login">Login</Link>
         </span>
         <span className={"btn btn-outline-info m-2"}>
            <Link to="/users">Users</Link>
         </span>
      </>
   );
};

export default NavBar;
