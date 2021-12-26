import React from "react";
import Users from "./components/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/main";
import NavBar from "./components/navBar";
import Login from "./components/login";
import UsersList from "./components/usersList";

function App() {
   return (
      <div>
         <NavBar/>
         <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/users/:userId" component={UsersList}/>
            <Route path="/users" component={Users}/>
            <Redirect to="/404"/>
         </Switch>
      </div>);
}

export default App;
