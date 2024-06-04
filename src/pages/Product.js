import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink
// import styles from '../style/support.module.css';
import styles from '../style/product.module.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import Button from 'react-bootstrap/Button';
import ProductDetails from './ProductDetails';

const Buy = () => {
    // download button dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleItemClick = (path) => {
        setDropdownOpen(false); // Close the dropdown
        NavLink.push(path); // Navigate to the specified path
    };


    return (
        <>
            <div className={styles['product-main-conatiners']}>
                <div className={styles[`supprot-heading-container`]}>
                    <div className={styles[`supprot-heading-text`]}>
                        Add Product
                    </div>

                    <div className={styles.supportDownloadBtnContainer}>
                        <div onClick={toggleDropdown} className={styles.supportDownloadbtn}>
                            Bulk Download
                        </div>
                        {dropdownOpen && (
                            <div className={styles.dropdownContent}>
                                {/* Add links for each dropdown item */}
                                <Link to='#'>
                                    <div className={styles.dropdownbtn} onClick={() => handleItemClick('/sample-sheet')}>
                                        <DescriptionOutlinedIcon /> Sample Sheet
                                    </div>
                                </Link>
                                <Link to='#'>
                                    <div className={styles.dropdownbtn} onClick={() => handleItemClick('/download')}>
                                        <CloudDownloadOutlinedIcon /> Download
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div >

                <div className={styles[`support-container`]}>
                    <div className={styles[`support-container-text-add`]}>Add a Product</div>
                    <div className={styles[`support-add-card`]}>
                        <div className={styles[`support-add-icon-container`]}>
                            <AddOutlinedIcon className={styles[`support-add-icon`]} />
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Buy
