import React, { useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import UploadImage from '../assest/uplaod.svg';
import CrossIcon from '../assest/Icon.svg';
import styles from '../style/supportimageupload.module.css';
import CloseIcon from '@mui/icons-material/Close';


const ImageUploaders = ({ images, setImages, errorMessage, clearImageError }) => {
    const [showModal, setShowModal]     = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadAreaHeight, setUploadAreaHeight] = useState('120px');
    const [error, setError] = useState('');

    const fileInputRef = useRef(null);
    const maxImages    = 5;

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = [];
        let count = images.length;

        for (let i = 0; i < files.length && count < maxImages; i++) {
            const file = files[i];

            if (file) {
                const isValidType = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type);
                const isValidSize = file.size < 1 * 1024 * 1024;

                if (!isValidType) {
                    setError('Invalid file type. Only PNG, JPEG, and JPG are allowed.');
                    return;
                }

                if (!isValidSize) {
                    setError('File size exceeds the limit of 1MB.');
                    return;
                }

                newImages.push(file);
                count++;
            }
        }
        if (newImages.length > 0) {
            setImages([...images, ...newImages]);
            clearImageError();
            setError('');
        }
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageClick2 = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    return (
        <>
            <div className={styles['image-uploader']}>
                <div className={styles['upload-area']} onClick={handleImageClick} style={{ height: uploadAreaHeight }}>
                    <img src={UploadImage} alt="Upload" className={styles['upload-icon']} />
                    <p className={styles['upload-text']}>Click here to upload</p>
                    <input
                        type="file"
                        // accept="image/png, image/jpeg, image/jpg"
                         accept="image/png, image/jpeg, image/jpg, application/pdf"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        multiple
                    />
                </div>
                <div className={styles['image-previews']}>
                    {images.map((image, index) => (
                        <div className={styles['image-preview']} key={index} onClick={() => handleImageClick2(image)}>
                            <img src={URL.createObjectURL(image)} alt="Uploaded" className={styles['uploaded-image']} />
                            <CloseIcon className={styles['close-icon']} onClick={(e) => { e.stopPropagation(); handleImageRemove(index); }} />
                        </div>
                    ))}
                </div>

                {/* Image uploader in popup modal*/}
                {showModal && (
                    <div className={styles.modal} onClick={toggleModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalBody}>
                                {selectedImage && (
                                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={styles.selectedImage} />
                                )}
                                <button onClick={toggleModal} className={styles.modalCloseBtn}>
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className={styles['error-message']}>
                        <span>{error}</span>
                    </div>
                )}

                  {errorMessage && (
                    <div className={styles['error-message']}>
                        <span style={{color: 'red'}}>{errorMessage}</span>
                    </div>
                )}
            </div>
        </>
    );
};



export default ImageUploaders;





