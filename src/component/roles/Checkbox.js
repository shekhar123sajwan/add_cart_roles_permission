import React from "react";

const Checkbox = ({ name, isChecked, onChangeEvent, permission }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id="inlineCheckbox3"
        name={name}
        defaultChecked={isChecked}
        onChange={(e) => {
          onChangeEvent(permission, e);
        }}
      />
      <label className="form-check-label" htmlFor="inlineCheckbox3">
        Create
      </label>
    </div>
  );
};

export default Checkbox;
