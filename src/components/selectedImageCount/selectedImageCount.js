import React from 'react';
import './selectedImageCount.scss'

function SelectedImageCount({ count }) {
  return (
    <div className="selected-count">
			<input 
					type="checkbox" 
					className="image-checkbox"
					checked={true}
				/>
      <h2>{count} {count>1 ? "Files" : "File"} Selected</h2>
    </div>
  );
}

export default SelectedImageCount;
