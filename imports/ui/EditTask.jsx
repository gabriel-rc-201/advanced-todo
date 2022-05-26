import React from "react";
import { useLocation } from "react-router-dom";

export const EdtiTask = () => {
  const {
    state: { task },
  } = useLocation();

  return <h1>Editar tarefa</h1>;
};
