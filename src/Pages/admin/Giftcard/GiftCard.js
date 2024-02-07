import React from "react";
import { useState } from "react";
import { useAuth } from "../../../ContextApi/ContextApi";

const GiftCard = () => {
  const [heading, setHeading] = useState();
  const { authData } = useAuth();
  console.log(authData?.token);
  console.log();
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GiftCard;
