import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, name, value, onChange }) => {
   const handleChange = ({ target }) => {
      onChange({ name: target.name, value: target.value });
   };
   return (
      <div className="mb-4">
         <label className="form-label">{label}</label>
         <div>
            {options.map((option) => (
               <div
                  key={option.name + " " + option.value}
                  className="form-check form-check-inline"
               >
                  <input
                     className="form-check-input"
                     type="radio"
                     name={name}
                     checked={option.value === value}
                     value={option.value}
                     onChange={handleChange}
                     id={option.name + " " + option.value}
                  />
                  <label
                     className="form-check-label"
                     htmlFor={option.name + " " + option.value}
                  >
                     {option.name}
                  </label>
               </div>
            ))}
         </div>
      </div>
   );
};

RadioField.propTypes = {
   label: PropTypes.string,
   options: PropTypes.array,
   name: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func
};

export default RadioField;
