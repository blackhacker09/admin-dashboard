import React from "react";

const DeleteButton = ({ handleDeleteSelected }) => {
    return <button onClick={handleDeleteSelected}>🗑️</button>;
};

export default DeleteButton;
