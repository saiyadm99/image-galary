import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import imageGalleryData from '../../data/images.json';
import Image from '../Image/image';
import './gallery.scss';
import SelectedImageCount from '../selectedImageCount/selectedImageCount';
import GalleryHeader from '../galleryHeader/galleryHeader';
import DeleteButton from '../deleteButton/deleteButton';
import ImageUpload from '../imageUpload/imageUpload';

function Gallery() {
  const [galleryData, setGalleryData] = useState({
    images: imageGalleryData.images,
    imageOrder: imageGalleryData.images.map((image) => image.id),
  });

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedImageIds, setSelectedImageIds] = useState([]);

  const updateSelectedCount = (isChecked, imageId) => {
    if (isChecked) {
      setSelectedImageIds([...selectedImageIds, imageId]);
      setSelectedCount(selectedCount + 1);
    } else {
      const updatedSelectedImageIds = selectedImageIds.filter((id) => id !== imageId);
      setSelectedImageIds(updatedSelectedImageIds);
      setSelectedCount(selectedCount - 1);
    }
  };

  const handleDeleteSelectedImages = () => {
    const updatedGalleryData = galleryData.images.filter((image) => !selectedImageIds.includes(image.id));
    setGalleryData({
      images: updatedGalleryData,
      imageOrder: galleryData.imageOrder,
    });
    setSelectedImageIds([]);
    setSelectedCount(0);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newImageOrder = Array.from(galleryData.imageOrder);
    newImageOrder.splice(result.source.index, 1);
    newImageOrder.splice(result.destination.index, 0, result.draggableId);

    setGalleryData({
      images: galleryData.images,
      imageOrder: newImageOrder,
    });
  };

  return (
    <div className="gallery-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="gallery-top">
                {selectedCount > 0 ? (
                  <div className="action-bar">
                    <SelectedImageCount count={selectedCount} />
                    <DeleteButton onClick={handleDeleteSelectedImages} />
                  </div>
                ) : (
                  <GalleryHeader />
                )}
              </div>

              <div className="image-gallery">
                {galleryData.imageOrder.map((imageId, index) => {
                  const image = galleryData.images.find((img) => img.id === imageId);
                  return (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Image
                            key={image.id}
                            imageUrl={image.url}
                            title={image.title}
                            isLarge={index === 0}
                            updateSelectedCount={updateSelectedCount}
                            imageId={image.id}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <ImageUpload />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Gallery;
