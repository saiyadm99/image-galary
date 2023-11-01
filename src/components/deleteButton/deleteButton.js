import React from 'react';
import './deleteButton.scss'

function DeleteButton({ onClick }) {
  return (
    <button className="delete-button" onClick={onClick}>
      Delete files
    </button>
  );
}

export default DeleteButton;
