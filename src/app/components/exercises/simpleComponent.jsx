import React from "react";

import PropTypes from "prop-types";

const SimpleComponent = ({ isAuth, onLogin, onLogOut }) => {
    return isAuth ? (
        <button onClick={onLogOut}>Выйти из системы</button>
    ) : (
        <button onClick={onLogin}>Войти</button>
    );
};
SimpleComponent.propTypes = {
    isAuth: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func
};
export default SimpleComponent;
