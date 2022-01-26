import React from "react";

const withCheckLogin = (Component) => (props) => {
    const isAuth = localStorage.getItem("user");

    const onLogin = () => {
        localStorage.setItem("user", "userName2");
        console.log(localStorage.user);
    };
    const onLogOut = () => {
        localStorage.setItem("user", "");
        console.log(localStorage.user);
    };
    return (
        <>
            {isAuth ? (
                <Component {...props} isAuth onLogOut={onLogOut} />
            ) : (
                <Component {...props} onLogin={onLogin} />
            )}
        </>
    );
};

export default withCheckLogin;
