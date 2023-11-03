import React, { useState } from 'react';
import './selectedImageCount.scss'

function SelectedImageCount({ count }) {
	const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="selected-count">
			<input 
					type="checkbox" 
					className="image-checkbox"
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
      <h2>{count} {count>1 ? "Files" : "File"} Selected</h2>
    </div>
  );
}

export default SelectedImageCount;
