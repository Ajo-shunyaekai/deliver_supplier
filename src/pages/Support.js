import React, { useState } from 'react';
import styles from '../style/support.module.css';
import FaqSupport from './FaqSupport';
import { Link } from 'react-router-dom';

const Support = () => {
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


    return (
        <>
            <div className={styles['support-main-container']}>
                <div className={styles[`support-heading`]}>Support</div>
                <div className={styles[`support-container`]}>
                    <div className={styles[`support-page`]}>
                        <div className={styles[`faq-section`]}>
                            <div className={styles[`support-btn-container`]}>
                                <div onClick={toggleFeedbackForm}>
                                    <div className={`${styles[`support-btn`]} ${activeButton === 'feedback' && styles.active}`}>
                                        Feedback
                                    </div>
                                </div>
                                <div onClick={toggleComplaintForm}>
                                    <div className={`${styles[`support-btn`]} ${activeButton === 'complaint' && styles.active}`}>
                                        Complaint
                                    </div>
                                </div>
                            </div>
                            {
                                feedbackVisible && (
                                    <div className={styles[`form-container`]}>
                                        <div className={styles[`form-heading`]}>Feedback Form</div>
                                        <form>
                                            <div className={styles[`form-container`]}>
                                                <input type="text" placeholder="Enter your order Id" className={styles[`form-input`]} />
                                                <textarea placeholder="Enter your feedback" className={styles[`form-input`]} />
                                                <input type="submit" value="Submit" className={styles[`form-submit-btn`]} />
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                            {
                                complaintVisible && (
                                    <div className={styles[`form-container`]}>
                                        <div className={styles[`form-heading`]}>Complaint Form</div>
                                        <form>
                                            <div className={styles[`form-container`]}>
                                                <input type="text" placeholder="Enter your order Id" className={styles[`form-input`]} />
                                                <textarea placeholder="Enter your complaint" className={styles[`form-input`]} />
                                                <input type="submit" value="Submit" className={styles[`form-submit-btn`]} />
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
        </>
    )
}

export default Support;

