import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
    // console.log("aaaaaaaaaazzz",id, isChecked)
    // handleClick=()=>{
    //     alert(isChecked)
    // }
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default Checkbox;