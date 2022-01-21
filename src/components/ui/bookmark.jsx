import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
   return (
      <button className={"btn btn-info"} {...rest}>
         <img
            src={status ? "/img/heart-fill.svg" : "/img/heart.svg"}
            alt="bookmark"
            width="24"
            height="24"
         />
      </button>
   );
};

BookMark.propTypes = {
   status: PropTypes.bool.isRequired
};

export default BookMark;
