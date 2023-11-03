import React, { useState } from 'react';
import imageGalleryData from '../../data/images.json';
import Image from '../Image/image';
import './gallery.scss';
import SelectedImageCount from '../selectedImageCount/selectedImageCount';
import GalleryHeader from '../galleryHeader/galleryHeader';
import DeleteButton from '../deleteButton/deleteButton';
import ImageUpload from '../imageUploader/imageUploader';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function Gallery() {
  // State management for gallery data and selected images
  const [galleryData, setGalleryData] = useState(imageGalleryData.images);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedImageIds, setSelectedImageIds] = useState([]);

  // Function to update the count of selected images
  const updateSelectedCount = (isChecked, imageId) => {
    if (isChecked) {
      setSelectedImageIds([...selectedImageIds, imageId]);
      setSelectedCount(selectedCount + 1);
    } else {
      const updateSelectedImageIds = selectedImageIds.filter(id => id !== imageId);
      setSelectedImageIds(updateSelectedImageIds);
      setSelectedCount(selectedCount - 1);
    }
  }

  // Function to handle deleting selected images
  const handleDeleteSelectedImages = () => {
    const updatedGalleryData = galleryData.filter(image => !selectedImageIds.includes(image.id));
    setGalleryData(updatedGalleryData);
    setSelectedImageIds([]);
    setSelectedCount(0);
  };

  // Function to handle image reordering after dragging
  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // No valid destination, do nothing
    const images = [...galleryData];
    const [reorderedImage] = images.splice(result.source.index, 1);
    images.splice(result.destination.index, 0, reorderedImage);
    setGalleryData(images);
  }

  return (
    <div className="gallery-container">
      <div className="gallery-top">
        {selectedCount > 0 ? (
          <div className="action-bar">
            <SelectedImageCount count={selectedCount} />
            <DeleteButton onClick={handleDeleteSelectedImages} count={selectedCount} />
          </div>
        ) : (
          <GalleryHeader />
        )}
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd} >
        <div className="image-gallery">
          {galleryData.map(({ id, url, title }, index) => (
            <Droppable key={id.toString()} droppableId={id.toString()} direction="horizontal">
              {(provided) => (
                <div className={index === 0 ? "large-image" : ""} {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                    {(dragProvided) => (
                      <div
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        ref={dragProvided.innerRef}
                      >
                        <Image
                          imageUrl={url}
                          title={title}
                          isLarge={index === 0}
                          updateSelectedCount={updateSelectedCount}
                          imageId={id}
                        />
                      </div>
                    )}
                  </Draggable>
                </div>
              )}
            </Droppable>
          ))}
          <ImageUpload />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Gallery;
