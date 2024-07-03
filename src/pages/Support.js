import React, { useState } from 'react';
import styles from '../style/support.module.css';
import FaqSupport from './FaqSupport';
import SupportImageUpload from '../pages/SupportImageUpload';
import { useNavigate } from 'react-router-dom';
import { postRequestWithTokenAndFile } from '../api/Requests';

// const Support = () => {
//     const [feedbackVisible, setFeedbackVisible] = useState(true);
//     const [complaintVisible, setComplaintVisible] = useState(false);
//     const [activeButton, setActiveButton] = useState('feedback');

//     const toggleFeedbackForm = () => {
//         setFeedbackVisible(true);
//         setComplaintVisible(false);
//         setActiveButton('feedback');
//     };

//     const toggleComplaintForm = () => {
//         setComplaintVisible(true);
//         setFeedbackVisible(false);
//         setActiveButton('complaint');
//     };

//     // Feedback form state
//     const [orderId, setOrderId] = useState('');
//     const [orderIdError, setOrderIdError] = useState('');
//     const [feedback, setFeedback] = useState('');
//     const [feedbackError, setFeedbackError] = useState('');
//     const [feedbackImages, setFeedbackImages] = useState([]);
//     const [imageError, setImageError] = useState('');

//     // Complaint form state
//     const [compOrderId, setCompOrderId] = useState('');
//     const [compOrderIdError, setCompOrderIdError] = useState('');
//     const [compFeedback, setCompFeedback] = useState('');
//     const [compFeedbackError, setCompFeedbackError] = useState('');
//     const [compImages, setCompImages] = useState([]);
//     const [compImageError, setCompImageError] = useState('');

//     const validate = () => {
//         const errors = {};
//         if (!orderId) {
//             setOrderIdError('Order ID is required');
//             errors.orderId = true;
//         } else {
//             setOrderIdError('');
//         }
//         if (!feedback) {
//             setFeedbackError('Feedback is required');
//             errors.feedback = true;
//         } else {
//             setFeedbackError('');
//         }
//         if (feedbackImages.length === 0) {
//             setImageError('At least one image is required');
//             errors.image = true;
//         } else {
//             setImageError('');
//         }
//         return errors;
//     };

//     const compValidate = () => {
//         const errors = {};
//         if (!compOrderId) {
//             setCompOrderIdError('Order ID is required');
//             errors.compOrderId = true;
//         } else {
//             setCompOrderIdError('');
//         }
//         if (!compFeedback) {
//             setCompFeedbackError('Feedback is required');
//             errors.compFeedback = true;
//         } else {
//             setCompFeedbackError('');
//         }
//         if (compImages.length === 0) {
//             setCompImageError('At least one image is required');
//             errors.compImage = true;
//         } else {
//             setCompImageError('');
//         }
//         return errors;
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const errors = validate();
//         if (Object.keys(errors).length === 0) {
//             console.log({ orderId, feedback, feedbackImages });
//             const feedback_images = Array.from(feedbackImages).map(file => file);

//             const obj = {
//                 order_id       : orderId,
//                 feedback       : feedback,
//                 feedback_image : feedback_images
//             }
//             console.log('feedback Obj', obj)
//         }
//     };

//     const complaintSubmit = (event) => {
//         event.preventDefault();
//         const errors = compValidate();
//         if (Object.keys(errors).length === 0) {
//             console.log({ compOrderId, compFeedback, compImages });
//             const complaint_images = Array.from(compImages).map(file => file);

//             const obj = {
//                 order_id        : compOrderId,
//                 complaint       : compFeedback,
//                 complaint_image : complaint_images
//             }
//             console.log('complaint Obj', obj)
//         }
//     };

//     const clearFeedbackImageError = () => {
//         setImageError('');
//     };

//     const clearComplaintImageError = () => {
//         setCompImageError('');
//     };

//     return (
//         <div className={styles['support-main-container']}>
//             <div className={styles['support-heading']}>Support</div>
//             <div className={styles['support-container']}>
//                 <div className={styles['support-page']}>
//                     <div className={styles['faq-section']}>
//                         <div className={styles['support-btn-container']}>
//                             <div onClick={toggleFeedbackForm}>
//                                 <div className={`${styles['support-btn']} ${activeButton === 'feedback' && styles.active}`}>
//                                     Feedback
//                                 </div>
//                             </div>
//                             <div onClick={toggleComplaintForm}>
//                                 <div className={`${styles['support-btn']} ${activeButton === 'complaint' && styles.active}`}>
//                                     Complaint
//                                 </div>
//                             </div>
//                         </div>
//                         {
//                             feedbackVisible && (
//                                 <div className={styles['form-main-container']}>
//                                     <div className={styles['form-heading']}>Feedback Form</div>
//                                     <form className={styles['form-main-form-section']} onSubmit={handleSubmit}>
//                                         <div className={styles['form-container']}>
//                                             <div className={styles['form-support-main-section']}>
//                                                 <div className={styles['form-cont-input-sec']}>
//                                                     <input
//                                                         type="text"
//                                                         placeholder="Enter your order Id"
//                                                         className={styles['form-input']}
//                                                         value={orderId}
//                                                         onChange={(e) => { setOrderId(e.target.value); setOrderIdError('') }}
//                                                     />
//                                                     {orderIdError && <div className={styles['error-message']}>{orderIdError}</div>}
//                                                 </div>

//                                                 <div className={styles['form-support-textarea']}>
//                                                     <textarea
//                                                         placeholder="Enter your feedback"
//                                                         className={styles['form-textarea']}
//                                                         rows={4}
//                                                         value={feedback}
//                                                         onChange={(e) => { setFeedback(e.target.value); setFeedbackError('') }}
//                                                     />
//                                                     {feedbackError && <div className={styles['error-message']}>{feedbackError}</div>}
//                                                 </div>
//                                             </div>

//                                             <div className={styles['form-support-image']}>
//                                                 <SupportImageUpload
//                                                     images={feedbackImages}
//                                                     setImages={setFeedbackImages}
//                                                     errorMessage={imageError}
//                                                     clearImageError={clearFeedbackImageError}
//                                                 />
//                                                 {/* {imageError && <div className={styles['error-message']}>{imageError }</div>} */}
//                                             </div>
//                                         </div>
//                                         <div className={styles['form-submit-btn-cont']}>
//                                             <button type="submit" className={styles['form-submit-btn']}>Submit</button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             )
//                         }
//                         {
//                             complaintVisible && (
//                                 <div className={styles['form-main-container']}>
//                                     <div className={styles['form-heading']}>Complaint Form</div>
//                                     <form className={styles['form-main-form-section']} onSubmit={complaintSubmit}>
//                                         <div className={styles['form-container']}>
//                                             <div className={styles['form-support-main-section']}>
//                                                 <div className={styles['form-cont-input-sec']}>
//                                                     <input
//                                                         type="text"
//                                                         placeholder="Enter your order Id"
//                                                         className={styles['form-input']}
//                                                         value={compOrderId}
//                                                         onChange={(e) => { setCompOrderId(e.target.value); setCompOrderIdError('') }}
//                                                     />
//                                                     {compOrderIdError && <div className={styles['error-message']}>{compOrderIdError}</div>}
//                                                 </div>

//                                                 <div className={styles['form-support-textarea']}>
//                                                     <textarea
//                                                         placeholder="Enter your complaint"
//                                                         className={styles['form-textarea']}
//                                                         rows={4}
//                                                         value={compFeedback}
//                                                         onChange={(e) => { setCompFeedback(e.target.value); setCompFeedbackError('') }}
//                                                     />
//                                                     {compFeedbackError && <div className={styles['error-message']}>{compFeedbackError}</div>}
//                                                 </div>
//                                             </div>

//                                             <div className={styles['form-support-image']}>
//                                                 <SupportImageUpload
//                                                     images={compImages}
//                                                     setImages={setCompImages}
//                                                     errorMessage={compImageError}
//                                                     clearImageError={clearComplaintImageError}
//                                                 />
//                                                 {/* {compImageError && <div className={styles['error-message']}>{compImageError }</div>} */}
//                                             </div>
//                                         </div>
//                                         <div className={styles['form-submit-btn-cont']}>
//                                             <button type="submit" className={styles['form-submit-btn']}>Submit</button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             )
//                         }
//                     </div>
//                 </div>
//                 <FaqSupport />
//             </div>
//         </div>
//     );
// };

const Support = () => {
    const navigate = useNavigate()
    const [feedbackVisible, setFeedbackVisible] = useState(true);
    const [complaintVisible, setComplaintVisible] = useState(false);
    const [activeButton, setActiveButton] = useState('feedback');

    const toggleFeedbackForm = () => {
        setFeedbackVisible(true);
        setComplaintVisible(false);
        setActiveButton('feedback');
    };

    const toggleComplaintForm = () => {
        setComplaintVisible(true);
        setFeedbackVisible(false);
        setActiveButton('complaint');
    };

    // Feedback form state
    const [orderId, setOrderId] = useState('');
    const [orderIdError, setOrderIdError] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackImages, setFeedbackImages] = useState([]);
    const [imageError, setImageError] = useState('');

    // Complaint form state
    const [compOrderId, setCompOrderId] = useState('');
    const [compOrderIdError, setCompOrderIdError] = useState('');
    const [compFeedback, setCompFeedback] = useState('');
    const [compFeedbackError, setCompFeedbackError] = useState('');
    const [compImages, setCompImages] = useState([]);
    const [compImageError, setCompImageError] = useState('');

    const validate = () => {
        const errors = {};
        if (!orderId) {
            setOrderIdError('Order ID is required');
            errors.orderId = true;
        } else {
            setOrderIdError('');
        }
        if (!feedback) {
            setFeedbackError('Feedback is required');
            errors.feedback = true;
        } else {
            setFeedbackError('');
        }
        if (feedbackImages.length === 0) {
            setImageError('Please upload at least one image');
            errors.image = true;
        } else {
            setImageError('');
        }
        return errors;
    };

    const compValidate = () => {
        const errors = {};
        if (!compOrderId) {
            setCompOrderIdError('Order ID is required');
            errors.compOrderId = true;
        } else {
            setCompOrderIdError('');
        }
        if (!compFeedback) {
            setCompFeedbackError('Feedback is required');
            errors.compFeedback = true;
        } else {
            setCompFeedbackError('');
        }
        if (compImages.length === 0) {
            setCompImageError('Please upload at least one image');
            errors.compImage = true;
        } else {
            setCompImageError('');
        }
        return errors;
    };

    const handleSubmit = (event) => {

        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/login");
        return;
        }

        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log({ orderId, feedback, feedbackImages });
            // const feedback_images = Array.from(feedbackImages).map(file => file);

            const formData = new FormData();

            formData.append('supplier_id', supplierIdSessionStorage || supplierIdLocalStorage);
            formData.append('order_id', orderId);
            formData.append('feedback', feedback);
            formData.append('support_type', 'feedback');
            Array.from(feedbackImages).forEach(file => formData.append('feedback_image', file))

            postRequestWithTokenAndFile('order/submit-order-feedback', formData, async (response) => {
                if(response.code === 200) {
                    setOrderId('')
                    setFeedback('')
                    setFeedbackImages([])
                } else {

                }
            })
            
        }
    };

    const complaintSubmit = (event) => {
        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/login");
        return;
        }


        event.preventDefault();
        const errors = compValidate();
        if (Object.keys(errors).length === 0) {
            console.log({ compOrderId, compFeedback, compImages });
            const complaint_images = Array.from(compImages).map(file => file);

            const formData = new FormData();

            formData.append('supplier_id', supplierIdSessionStorage || supplierIdLocalStorage);
            formData.append('order_id', compOrderId);
            formData.append('complaint', compFeedback);
            formData.append('support_type', 'complaint');
            Array.from(compImages).forEach(file => formData.append('complaint_image', file))

            postRequestWithTokenAndFile('order/submit-order-complaint', formData, async (response) => {
                if(response.code === 200) {
                    setCompOrderId('')
                    setCompFeedback('')
                    setCompImages([])
                } else {
                    
                }
            })
        }
    };

    const clearFeedbackImageError = () => {
        setImageError('');
    };

    const clearComplaintImageError = () => {
        setCompImageError('');
    };

    return (
        <div className={styles['support-main-container']}>
            <div className={styles['support-heading']}>Support</div>
            <div className={styles['support-container']}>
                <div className={styles['support-page']}>
                    <div className={styles['faq-section']}>
                        <div className={styles['support-btn-container']}>
                            <div onClick={toggleFeedbackForm}>
                                <div className={`${styles['support-btn']} ${activeButton === 'feedback' && styles.active}`}>
                                    Feedback
                                </div>
                            </div>
                            <div onClick={toggleComplaintForm}>
                                <div className={`${styles['support-btn']} ${activeButton === 'complaint' && styles.active}`}>
                                    Complaint
                                </div>
                            </div>
                        </div>
                        {
                            feedbackVisible && (
                                <div className={styles['form-main-container']}>
                                    <div className={styles['form-heading']}>Feedback Form</div>
                                    <form className={styles['form-main-form-section']} onSubmit={handleSubmit}>
                                        <div className={styles['form-container']}>
                                            <div className={styles['form-support-main-section']}>
                                                <div className={styles['form-cont-input-sec']}>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your order Id"
                                                        className={styles['form-input']}
                                                        value={orderId}
                                                        onChange={(e) => { setOrderId(e.target.value); setOrderIdError('') }}
                                                    />
                                                    {orderIdError && <div className={styles['error-message']}>{orderIdError}</div>}
                                                </div>

                                                <div className={styles['form-support-textarea']}>
                                                    <textarea
                                                        placeholder="Enter your feedback"
                                                        className={styles['form-textarea']}
                                                        rows={4}
                                                        value={feedback}
                                                        onChange={(e) => { setFeedback(e.target.value); setFeedbackError('') }}
                                                    />
                                                    {feedbackError && <div className={styles['error-message']}>{feedbackError}</div>}
                                                </div>
                                            </div>

                                            <div className={styles['form-support-image']}>
                                                <SupportImageUpload
                                                    // images={feedbackImages}
                                                    // setImages={setFeedbackImages}
                                                    // errorMessage={imageError}
                                                    // clearImageError={clearFeedbackImageError}
                                                    images={feedbackImages}
                                                    setImages={setFeedbackImages}
                                                    errorMessage={imageError}
                                                    clearImageError={clearFeedbackImageError}
                                                    ErrorMessage={setImageError}
                                                />
                                                {imageError && <div className={styles['error-message']}>{imageError }</div>}
                                            </div>
                                        </div>
                                        <div className={styles['form-submit-btn-cont']}>
                                            <button type="submit" className={styles['form-submit-btn']}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            complaintVisible && (
                                <div className={styles['form-main-container']}>
                                    <div className={styles['form-heading']}>Complaint Form</div>
                                    <form className={styles['form-main-form-section']} onSubmit={complaintSubmit}>
                                        <div className={styles['form-container']}>
                                            <div className={styles['form-support-main-section']}>
                                                <div className={styles['form-cont-input-sec']}>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your order Id"
                                                        className={styles['form-input']}
                                                        value={compOrderId}
                                                        onChange={(e) => { setCompOrderId(e.target.value); setCompOrderIdError('') }}
                                                    />
                                                    {compOrderIdError && <div className={styles['error-message']}>{compOrderIdError}</div>}
                                                </div>

                                                <div className={styles['form-support-textarea']}>
                                                    <textarea
                                                        placeholder="Enter your complaint"
                                                        className={styles['form-textarea']}
                                                        rows={4}
                                                        value={compFeedback}
                                                        onChange={(e) => { setCompFeedback(e.target.value); setCompFeedbackError('') }}
                                                    />
                                                    {compFeedbackError && <div className={styles['error-message']}>{compFeedbackError}</div>}
                                                </div>
                                            </div>

                                            <div className={styles['form-support-image']}>
                                                <SupportImageUpload
                                                    // images={compImages}
                                                    // setImages={setCompImages}
                                                    // errorMessage={compImageError}
                                                    // clearImageError={clearComplaintImageError}
                                                    images={compImages}
                                                    setImages={setCompImages}
                                                    errorMessage={imageError}
                                                    clearImageError={clearComplaintImageError}
                                                    ErrorMessage={setImageError}
                                                />
                                                {compImageError && <div className={styles['error-message']}>{compImageError }</div>}
                                            </div>
                                        </div>
                                        <div className={styles['form-submit-btn-cont']}>
                                            <button type="submit" className={styles['form-submit-btn']}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
                <FaqSupport />
            </div>
        </div>
    );
};


export default Support;


