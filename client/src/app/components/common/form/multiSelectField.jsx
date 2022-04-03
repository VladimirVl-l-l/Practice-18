import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, name, options, onChange, defaultValue }) => {
   const optionsArray =
      !Array.isArray(options) && typeof options === "object"
         ? Object.keys(options).map((optionName) => ({
              label: options[optionName].name,
              value: options[optionName]._id
           }))
         : options;
   const handleChange = (value) => {
      onChange({ name: name, value });
   };
   return (
      <div className="mb-4">
         <label className="form-label">{label}</label>
         <Select
            isMulti
            closeMenuOnSelect={false}
            defaultValue={defaultValue}
            options={optionsArray}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
         />
      </div>
   );
};

MultiSelectField.propTypes = {
   label: PropTypes.string,
   options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   name: PropTypes.string,
   onChange: PropTypes.func,
   defaultValue: PropTypes.array
};

export default MultiSelectField;
