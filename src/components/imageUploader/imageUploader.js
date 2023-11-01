import React from 'react';
import './imageUploader.scss'

function ImageUpload() {
  return (
    <div className="image-container">
      <input type="file" accept="image/*" id="image-upload" className="image-upload-input" />
      <label htmlFor="image-upload" className="image-label">
				<div className='image-upload-img'>
					<img
						src="https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder-1024x1024-800x800.png" 
						alt="Upload"
					/>
				</div>
      </label>
    </div>
  );
}

export default ImageUpload;
