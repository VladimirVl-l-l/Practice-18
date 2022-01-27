import React, { useEffect, useState } from "react";

const withCheckLogin = (Component) => (props) => {
    const isAuth = localStorage.getItem("user");
    const [onLogin, setOnLogin] = useState();

    const handleOnLogin = ({ target }) => {
        if (target.value === "In") {
            localStorage.setItem("user", "Name");
        } else {
            localStorage.setItem("user", "");
        }
        setOnLogin("user");
    };
    useEffect(() => {
        setOnLogin();
    }, [onLogin]);

    return (
        <>
            {isAuth ? (
                <Component {...props} isAuth onLogOut={handleOnLogin} />
            ) : (
                <Component {...props} onLogin={handleOnLogin} />
            )}
        </>
    );
};

export default withCheckLogin;
