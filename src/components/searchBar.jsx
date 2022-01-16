import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ searchString, data, update, clearFil }) => {
   const dataSearch = (e) => {
      const value = e.target.value.trim().toLowerCase();
      const filter = data.filter((user) => {
         return user.name.toLowerCase().includes(value);
      });
      update({
         data: filter,
         searchString: value
      });
   };
   return (
      <div className="searchbar form-group">
         <input
            value={searchString}
            type="text"
            className="form-control"
            placeholder="Поиск людей по имени..."
            onChange={dataSearch}
            onClick={clearFil}
         />
      </div>
   );
};

SearchBar.propTypes = {
   searchString: PropTypes.string,
   data: PropTypes.array,
   update: PropTypes.func,
   clearFil: PropTypes.func
};

export default SearchBar;
