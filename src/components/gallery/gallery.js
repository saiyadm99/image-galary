import { useState } from 'react';
import imageGalleryData from '../../data/images.json'
import Image from '../Image/image';
import './gallery.scss'
import SelectedImageCount from '../selectedImageCount/selectedImageCount';
import GalleryHeader from '../galleryHeader/galleryHeader';
import DeleteButton from '../deleteButton/deleteButton';
import ImageUpload from '../imageUploader/imageUploader';

function Gallery() {
	const [galleryData, setGalleryData] = useState(imageGalleryData.images)
	const [selectedCount, setSelectedCount] = useState(0);
	const[selectedImageIds, setSelectedImageIds] = useState([]);

	const updateSelectedCount = (isChecked, imageId) =>{
		if(isChecked) {
			setSelectedImageIds([...selectedImageIds, imageId]);
			setSelectedCount(selectedCount + 1);
		}else{
			const updateSelectedImageIds = selectedImageIds.filter(id => id !== imageId);
			setSelectedImageIds(updateSelectedImageIds);
			setSelectedCount(selectedCount - 1);
		}
	}

	const handleDeleteSelectedImages = () => {
		const updatedGalleryData = galleryData.filter(image => !selectedImageIds.includes(image.id));
		setGalleryData(updatedGalleryData)
		setSelectedImageIds([]);
		setSelectedCount(0);
  };

  return (
		<div className="gallery-container">
			<div className="gallery-top">
				{selectedCount>0 ? (
					<div className="action-bar">
						<SelectedImageCount count={selectedCount}/> 
						<DeleteButton onClick={handleDeleteSelectedImages}/>
					</div>
				): (
					<GalleryHeader/>
				)}
			</div>
			
			<div className='image-gallery'>
				{galleryData.map((image, index) => (
					<Image 
						key={image.id} 
						imageUrl={image.url} 
						title={image.title} 
						isLarge={index === 0}
						updateSelectedCount={updateSelectedCount}
						imageId = {image.id}
					/>
				))}
				<ImageUpload />
			</div>
		</div>
  );
}

export default Gallery;