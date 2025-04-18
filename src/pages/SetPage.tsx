// src/pages/SetPage.tsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CardList from "../components/CardListComponens";

const SetPage: React.FC = () => {
  const { setShortName } = useParams();

  // state: 'small' or 'large'
  const [size, setSize] = useState<"small" | "large">("large");
  const toggleSize = () => {
    setSize((current) => (current === "large" ? "small" : "large"));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-6 text-2xl">{setShortName} cards</h2>
      <button
        onClick={toggleSize}
        className="rounded bg-green-400 px-4 py-2 font-mono text-black transition hover:bg-green-300"
      >
        {size === "large" ? "Switch to Small" : "Switch to Large"}
      </button>
      <CardList size={size} />
    </div>
  );
};

export default SetPage;
