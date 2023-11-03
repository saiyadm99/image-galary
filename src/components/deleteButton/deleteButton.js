import React from 'react';
import './deleteButton.scss'

function DeleteButton({ onClick, count}) {
  return (
    <button className="delete-button" onClick={onClick}>
      Delete {count>1 ? "files" : "file"}
    </button>
  );
}

export default DeleteButton;
