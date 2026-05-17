// src/components/Featured.jsx
import React from "react";
import FeaturedClient from "./FeaturedClient";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });
  const destinations = await res.json();

  return <FeaturedClient destinations={destinations} />;
};

export default Featured;
