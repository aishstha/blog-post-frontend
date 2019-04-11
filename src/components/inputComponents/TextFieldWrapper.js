import React from "react";
import { PropTypes } from "prop-types";
import { Field } from "formik";

const TextFieldWrapper = props => {
  const {
    name,
    type,
    value,
    label,
    placeholder,
    handleChange,
    handleBlur,
    maxLength,
    id
  } = props;

  return (
    <React.Fragment>
      <label className="form-group__label form-group__label--block">
        {label}
      </label>
      <Field
        className="form-group__control"
        id={id}
        name={name}
        type="text"
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default TextFieldWrapper;

