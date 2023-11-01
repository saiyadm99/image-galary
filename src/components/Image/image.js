import { useState } from 'react';
import './image.scss';

function Image({imageUrl, title, isLarge, imageId, updateSelectedCount}) {
	// Create a class variable based on the isLarge prop
  const imageClass = isLarge ? 'image-container large-image' : 'image-container';
	
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		updateSelectedCount(!isChecked, imageId);
	}

	return (
		<div className={imageClass}>
			<label className="image-label">
				<input 
					type="checkbox" 
					className="image-checkbox"
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<img src={imageUrl} alt={title} />
			</label>
		</div>
	)
}

export default Image;