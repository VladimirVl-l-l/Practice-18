import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
   const isLoggedIn = useSelector(getIsLoggedIn());
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
      <nav className="navbar bg-light mb-3">
         <div className="container-fluid">
            <div className="nav">
               <button
                  className={getClass("Main")}
                  onClick={() => activeLink("Main")}
               >
                  <Link aria-current="page" to="/">
                     Main
                  </Link>
               </button>
               {isLoggedIn && (
                  <button
                     className={getClass("Users")}
                     onClick={() => activeLink("Users")}
                  >
                     <Link aria-current="page" to="/users">
                        Users
                     </Link>
                  </button>
               )}
            </div>
            <div className="d-flex">
               {isLoggedIn ? (
                  <NavProfile />
               ) : (
                  <button
                     className={getClass("Login")}
                     onClick={() => activeLink("Login")}
                  >
                     <Link aria-current="page" to="/login">
                        Login
                     </Link>
                  </button>
               )}
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
