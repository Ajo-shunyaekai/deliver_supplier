import React, { useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import UploadImage from '../assest/uplaod.svg';
import CrossIcon from '../assest/Icon.svg';
import styles from '../style/supportimageupload.module.css';
import CloseIcon from '@mui/icons-material/Close';


// const ImageUploaders = ({ images, setImages, errorMessage, clearImageError }) => {
//     const [showModal, setShowModal]     = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [uploadAreaHeight, setUploadAreaHeight] = useState('120px');
//     const [error, setError] = useState('');

//     const fileInputRef = useRef(null);
//     const maxImages    = 5;

//     const toggleModal = () => {
//         setShowModal(!showModal);
//     };

//     const handleImageUpload = (event) => {
//         const files = event.target.files;
//         const newImages = [];
//         let count = images.length;

//         for (let i = 0; i < files.length && count < maxImages; i++) {
//             const file = files[i];

//             if (file) {
//                 const isValidType = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type);
//                 const isValidSize = file.size < 1 * 1024 * 1024;

//                 if (!isValidType) {
//                     setError('Invalid file type. Only PNG, JPEG, and JPG are allowed.');
//                     return;
//                 }

//                 if (!isValidSize) {
//                     setError('File size exceeds the limit of 1MB.');
//                     return;
//                 }

//                 newImages.push(file);
//                 count++;
//             }
//         }
//         if (newImages.length > 0) {
//             setImages([...images, ...newImages]);
//             clearImageError();
//             setError('');
//         }
//     };

//     const handleImageRemove = (index) => {
//         const updatedImages = [...images];
//         updatedImages.splice(index, 1);
//         setImages(updatedImages);
//     };

//     const handleImageClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleImageClick2 = (image) => {
//         setSelectedImage(image);
//         setShowModal(true);
//     };

//     return (
//         <>
//             <div className={styles['image-uploader']}>
//                 <div className={styles['upload-area']} onClick={handleImageClick} style={{ height: uploadAreaHeight }}>
//                     <img src={UploadImage} alt="Upload" className={styles['upload-icon']} />
//                     <p className={styles['upload-text']}>Click here to upload</p>
//                     <input
//                         type="file"
//                         // accept="image/png, image/jpeg, image/jpg"
//                          accept="image/png, image/jpeg, image/jpg, application/pdf"
//                         onChange={handleImageUpload}
//                         style={{ display: 'none' }}
//                         ref={fileInputRef}
//                         multiple
//                     />
//                 </div>
//                 <div className={styles['image-previews']}>
//                     {images.map((image, index) => (
//                         <div className={styles['image-preview']} key={index} onClick={() => handleImageClick2(image)}>
//                             <img src={URL.createObjectURL(image)} alt="Uploaded" className={styles['uploaded-image']} />
//                             <CloseIcon className={styles['close-icon']} onClick={(e) => { e.stopPropagation(); handleImageRemove(index); }} />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Image uploader in popup modal*/}
//                 {showModal && (
//                     <div className={styles.modal} onClick={toggleModal}>
//                         <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//                             <div className={styles.modalBody}>
//                                 {selectedImage && (
//                                     <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={styles.selectedImage} />
//                                 )}
//                                 <button onClick={toggleModal} className={styles.modalCloseBtn}>
//                                     <CloseIcon />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {error && (
//                     <div className={styles['error-message']}>
//                         <span>{error}</span>
//                     </div>
//                 )}

//                   {errorMessage && (
//                     <div className={styles['error-message']}>
//                         <span style={{color: 'red'}}>{errorMessage}</span>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

const ImageUploaders = ({ imagess, setImagess, errorMessagee, clearImageError }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    const maxImages = 5;
    const maxSingleFileSize = 1 * 1024 * 1024; // 1 MB

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        let newImages = [...images];

        console.log("Selected files:", files);
        console.log("Current images:", images);

        if (newImages.length + files.length > maxImages) {
            setErrorMessage(`You can upload up to ${maxImages} images in total.`);
            console.log(`Error: You can upload up to ${maxImages} images in total.`);
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log("Processing file:", file);

            if (file) {
                const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);

                if (!isValidType) {
                    setErrorMessage('Invalid file type. Only PNG, JPEG, and JPG are allowed.');
                    console.log('Error: Invalid file type.');
                    return;
                }

                if (file.size > maxSingleFileSize) {
                    setErrorMessage('File size exceeds the limit of 1MB.');
                    console.log('Error: File size exceeds the limit of 1MB.');
                    return;
                }

                // newImages.push({ src: URL.createObjectURL(file), size: file.size });
                newImages.push(file)
            }
        }

        setErrorMessage(''); // Clear any previous error message
        setImages(newImages);
        console.log("Updated images:", newImages);
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        console.log("Image removed. Updated images:", updatedImages);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageClick2 = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    console.log('images',images);

    return (
        <>
            <div className={styles['image-uploader']}>
                <div className={styles['upload-area']} onClick={handleImageClick}>
                    <img src={UploadImage} alt="Upload" className={styles['upload-icon']} />
                    <p className={styles['upload-text']}>Click here to upload</p>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        multiple
                    />
                </div>
                {errorMessage && (
                    <div className={styles['error-message']}>
                        <span>{errorMessage}</span>
                    </div>
                )}
                <div className={styles['image-previews']}>
                    {images.map((image, index) => (
                        <div className={styles['image-preview']} key={index} onClick={() => handleImageClick2(image)}>
                            <img src={URL.createObjectURL(image)} alt="Uploaded" className={styles['uploaded-image']} />
                            <CloseIcon className={styles['close-icon']} onClick={(e) => { e.stopPropagation(); handleImageRemove(index); }} />
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className={styles.modal} onClick={toggleModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalBody}>
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={styles.selectedImage} />
                                <button onClick={toggleModal} className={styles.modalCloseBtn}>
                                    <CloseIcon className={styles['modal-close-icons']} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};



export default ImageUploaders;





