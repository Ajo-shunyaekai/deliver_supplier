import React, { useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import UploadImage from '../assest/uplaod.svg';
import CrossIcon from '../assest/Icon.svg';
import styles from '../style/supportimageupload.module.css';
import CloseIcon from '@mui/icons-material/Close';


// const ImageUploaders = () => {
//     // image popup modal
//     const [showModal, setShowModal] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
  
//   const toggleModal = () => {
//     console.log("Toggling modal");
//     setShowModal(!showModal);
//   };


//     const [images, setImages] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [uploadAreaHeight, setUploadAreaHeight] = useState('120px'); // Initial height
//     const fileInputRef = useRef(null);
//     const minImages = 1;
//     const maxImages = 5;

//     const handleImageUpload = (event) => {
//         const files = event.target.files;
//         const newImages = [];
//         let count = images.length;

//         for (let i = 0; i < files.length && count < maxImages; i++) {
//             const file = files[i];

//             if (file) {
//                 const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
//                 const isValidSize = file.size <= 2 * 1024 * 1024;

//                 if (!isValidType) {
//                     setErrorMessage('Invalid file type. Only PNG, JPEG, and JPG are allowed.');
//                     return;
//                 }

//                 if (!isValidSize) {
//                     setErrorMessage('File size exceeds the limit of 2MB.');
//                     return;
//                 }

//                 setErrorMessage(''); // Clear any previous error message

//                 Resizer.imageFileResizer(
//                     file,
//                     800, // max width
//                     800, // max height
//                     file.type.split('/')[1].toUpperCase(), // file format (JPG, PNG)
//                     90, // quality
//                     0, // rotation
//                     (uri) => {
//                         newImages.push(uri);
//                         count++;
//                         if (count >= minImages && count <= maxImages) {
//                             setImages([...images, ...newImages]);
//                             // Adjusting upload area height
//                             setUploadAreaHeight('120px');
//                         } else if (count > maxImages) {
//                             setErrorMessage(`You can upload a maximum of ${maxImages} images.`);
//                         }
//                     },
//                     'base64'
//                 );
//             }
//         }
//     };

//     const handleImageRemove = (index) => {
//         const updatedImages = [...images];
//         updatedImages.splice(index, 1);
//         setImages(updatedImages);
//         // Resetting upload area height when removing images
//         if (images.length <= 1) {
//             setUploadAreaHeight('120px');
//         }
//     };

//     const handleImageClick = () => {
//         fileInputRef.current.click();
//     };
//     const handleImageClick2 = (image) => {
//         setSelectedImage(image);
//         setShowModal(true);
//       };

//     return (  
//        <>
 
//         <div className={styles['image-uploader']}>
//             <div className={styles['upload-area']} onClick={handleImageClick} style={{ height: uploadAreaHeight }}>
//                 <img src={UploadImage} alt="Upload" className={styles['upload-icon']} />
//                 <p className={styles['upload-text']}>Click here to upload</p>
//                 <input
//                     type="file"
//                     accept="image/png, image/jpeg, image/jpg"
//                     onChange={handleImageUpload}
//                     style={{ display: 'none' }}
//                     ref={fileInputRef}
//                     multiple
//                 />
//             </div>
//         <div className={styles['image-previews']}>
//                 {images.map((image, index) => (
//             <div className={styles['image-preview']} key={index} onClick={() => handleImageClick2(image)}>
//                         <img src={image} alt="Uploaded" className={styles['uploaded-image']} />
//                         <CloseIcon className={styles['close-icon']} onClick={(e) => { e.stopPropagation(); handleImageRemove(index); }} />
//                         </div>
//                 ))}
//         </div>


//         {/* Image uploder in popup modal*/}
//         {showModal && (
//           <div className={styles.modal} onClick={toggleModal}>
//             <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//               <div className={styles.modalBody} >
//                 <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
            
//                 <button onClick={toggleModal} className={styles.modalCloseBtn}>
//                   <CloseIcon />
//                 </button>
//               </div>             
//             </div>
//           </div>
//         )}

//             {errorMessage && (
//                 <div className={styles['error-message']}>
//                     <span>{errorMessage}</span>
//                 </div>
//             )}

            
//         </div>
//        </>
//     );
// };

const ImageUploaders = ({ images, setImages, errorMessage }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadAreaHeight, setUploadAreaHeight] = useState('120px');
    // const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    const maxImages = 5;

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
                const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
                const isValidSize = file.size <= 2 * 1024 * 1024;

                if (!isValidType) {
                    errorMessage('Invalid file type. Only PNG, JPEG, and JPG are allowed.');
                    return;
                }

                if (!isValidSize) {
                    errorMessage('File size exceeds the limit of 2MB.');
                    return;
                }

                Resizer.imageFileResizer(
                    file,
                    800,
                    800,
                    file.type.split('/')[1].toUpperCase(),
                    90,
                    0,
                    (uri) => {
                        newImages.push(uri);
                        count++;
                        if (count <= maxImages) {
                            setImages([...images, ...newImages]);
                        } else {
                            errorMessage(`You can upload a maximum of ${maxImages} images.`);
                        }
                    },
                    'base64'
                );
            }
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

    // return (
    //     <div className={styles['image-uploader']}>
    //         <div className={styles['upload-area']} onClick={handleImageClick}>
    //             <img src={UploadImage} alt="Upload" className={styles['upload-icon']} />
    //             <p className={styles['upload-text']}>Click here to upload</p>
    //             <input
    //                 type="file"
    //                 accept="image/png, image/jpeg, image/jpg"
    //                 onChange={handleImageUpload}
    //                 style={{ display: 'none' }}
    //                 ref={fileInputRef}
    //                 multiple
    //             />
    //         </div>
    //         <div className={styles['image-previews']}>
    //             {images.map((image, index) => (
    //                 <div className={styles['image-preview']} key={index} onClick={() => handleImageClick2(image)}>
    //                     <img src={image} alt="Uploaded" className={styles['uploaded-image']} />
    //                     <CloseIcon className={styles['close-icon']} onClick={(e) => { e.stopPropagation(); handleImageRemove(index); }} />
    //                 </div>
    //             ))}
    //         </div>

    //         {showModal && (
    //             <div className={styles.modal} onClick={toggleModal}>
    //                 <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
    //                     <div className={styles.modalBody}>
    //                         <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
    //                         <button onClick={toggleModal} className={styles.modalCloseBtn}>
    //                             <CloseIcon />
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}

    //         {errorMessage && (
    //             <div className={styles['error-message']}>
    //                 <span>{errorMessage}</span>
    //             </div>
    //         )}
    //     </div>
    // );
  

    return (  
        <>
  
         <div className={styles['image-uploader']}>
             <div className={styles['upload-area']} onClick={handleImageClick} style={{ height: uploadAreaHeight }}>
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
         <div className={styles['image-previews']}>
                 {images.map((image, index) => (
             <div className={styles['image-preview']} key={index} onClick={() => handleImageClick2(image)}>
                         <img src={image} alt="Uploaded" className={styles['uploaded-image']} />
                         <CloseIcon className={styles['close-icon']} onClick={(e) => { e.stopPropagation(); handleImageRemove(index); }} />
                         </div>
                 ))}
         </div>
 
 
         {/* Image uploder in popup modal*/}
         {showModal && (
           <div className={styles.modal} onClick={toggleModal}>
             <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
               <div className={styles.modalBody} >
                 <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
             
                 <button onClick={toggleModal} className={styles.modalCloseBtn}>
                   <CloseIcon />
                 </button>
               </div>             
             </div>
           </div>
         )}
 
             {errorMessage && (
                 <div className={styles['error-message']}>
                     <span>{errorMessage}</span>
                 </div>
             )}
 
             
         </div>
        </>
     );



};




export default ImageUploaders;
