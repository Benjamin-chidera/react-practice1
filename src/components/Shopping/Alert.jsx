import React, { useEffect } from "react";

export const Alert = ({ msg, type, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return <h3 className={`alert alert-${type}`}>{msg}</h3>;
};
