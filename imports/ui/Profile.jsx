import React from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  return <h1 onClick={() => navigate(-1)}>Profile Page</h1>;
};
