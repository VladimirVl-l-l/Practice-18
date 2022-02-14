import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
   const renderPhrase = (number) => {
      const lastOne = Number(number.toString().slice(-1));
      if (number > 4 && number < 21) return "Человек тусанет";
      if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут";
      if (lastOne === 1) return "Человек тусанет";
   };
   return (
      <h2>
         <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
            {length > 0
               ? `${length} ${renderPhrase(length)} с тобой сегодня`
               : "Никто с тобой не тусанет"}
         </span>
      </h2>
   );
};

SearchStatus.propTypes = {
   length: PropTypes.number.isRequired
};

export default SearchStatus;
