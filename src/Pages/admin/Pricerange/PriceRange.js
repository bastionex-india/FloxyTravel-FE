import React, { useState } from "react";

const PriceRange = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <div>
      <div>
        {" "}
        <button onClick={() => setShow(true)}>Add</button>
      </div>
    </div>
  );
};

export default PriceRange;
