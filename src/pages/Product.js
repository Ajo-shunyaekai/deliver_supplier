import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../style/product.module.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import MedicineOne from '../assest/paracetamol.png';
import '../style/addproductlist.css'
const Buy = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleItemClick = (path) => {
        setDropdownOpen(false);
        NavLink.push(path);
    };
    <Link to='/add-product'></Link>

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
                        <Link to='/add-product' style={{marginTop:'-20px'}}>
                            <div className={styles[`support-container-text-add`]}>Add a Product</div>
                            <div className={styles[`support-add-card`]}>
                                <div className={styles[`support-add-icon-container`]}>
                                    <AddOutlinedIcon className={styles[`support-add-icon`]} />
                                </div>
                            </div>
                        </Link>

                    <div className='buy-product-card-section'>
                        <div className='buy-product-card-first-section-right'>
                            <div className='buy-product-card-first-medicine-image'>
                                <img src={MedicineOne} alt="Medicine" />
                            </div>
                            <div className='buy-product-card-first-button-container'>
                                <Link to='/product-details'>
                                    <div className='buy-product-card-first-send-button'>
                                        View Details
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='buy-product-card-first-section'>
                            <div className='buy-product-card-first-left'>
                                <div className='buy-product-card-first-copmany-name'>Medicine Name</div>
                                <div className='buy-product-card-first-copmany-description'>Drugs Name</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Country of origin</div>
                                <div className='buy-product-card-second-text'>Dubai UAE</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Stocked in</div>
                                <div className='buy-product-card-second-text'>450</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Type</div>
                                <div className='buy-product-card-second-text'>EU CTU</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Status</div>
                                <div className='buy-product-card-second-text'>Ready to file</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>GMP Approvals</div>
                                <div className='buy-product-card-second-text'>GU EMP</div>
                            </div>

                        </div>
                    </div>

                    <div className='buy-product-card-section'>
                        <div className='buy-product-card-first-section-right'>
                            <div className='buy-product-card-first-medicine-image'>
                                <img src={MedicineOne} alt="Medicine" />
                            </div>
                            <div className='buy-product-card-first-button-container'>
                                <Link to='/product-details'>
                                    <div className='buy-product-card-first-send-button'>
                                        View Details
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='buy-product-card-first-section'>
                            <div className='buy-product-card-first-left'>
                                <div className='buy-product-card-first-copmany-name'>Medicine Name</div>
                                <div className='buy-product-card-first-copmany-description'>Drugs Name</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Country of origin</div>
                                <div className='buy-product-card-second-text'>Dubai UAE</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Stocked in</div>
                                <div className='buy-product-card-second-text'>450</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Type</div>
                                <div className='buy-product-card-second-text'>EU CTU</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Status</div>
                                <div className='buy-product-card-second-text'>Ready to file</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>GMP Approvals</div>
                                <div className='buy-product-card-second-text'>GU EMP</div>
                            </div>

                        </div>
                    </div>

                    <div className='buy-product-card-section'>
                        <div className='buy-product-card-first-section-right'>
                            <div className='buy-product-card-first-medicine-image'>
                                <img src={MedicineOne} alt="Medicine" />
                            </div>
                            <div className='buy-product-card-first-button-container'>
                                <Link to='/product-details'>
                                    <div className='buy-product-card-first-send-button'>
                                        View Details
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='buy-product-card-first-section'>
                            <div className='buy-product-card-first-left'>
                                <div className='buy-product-card-first-copmany-name'>Medicine Name</div>
                                <div className='buy-product-card-first-copmany-description'>Drugs Name</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Country of origin</div>
                                <div className='buy-product-card-second-text'>Dubai UAE</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Stocked in</div>
                                <div className='buy-product-card-second-text'>450</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Type</div>
                                <div className='buy-product-card-second-text'>EU CTU</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Status</div>
                                <div className='buy-product-card-second-text'>Ready to file</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>GMP Approvals</div>
                                <div className='buy-product-card-second-text'>GU EMP</div>
                            </div>

                        </div>
                    </div>

                    <div className='buy-product-card-section'>
                        <div className='buy-product-card-first-section-right'>
                            <div className='buy-product-card-first-medicine-image'>
                                <img src={MedicineOne} alt="Medicine" />
                            </div>
                            <div className='buy-product-card-first-button-container'>
                                <Link to='/product-details'>
                                    <div className='buy-product-card-first-send-button'>
                                        View Details
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='buy-product-card-first-section'>
                            <div className='buy-product-card-first-left'>
                                <div className='buy-product-card-first-copmany-name'>Medicine Name</div>
                                <div className='buy-product-card-first-copmany-description'>Drugs Name</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Country of origin</div>
                                <div className='buy-product-card-second-text'>Dubai UAE</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Stocked in</div>
                                <div className='buy-product-card-second-text'>450</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Type</div>
                                <div className='buy-product-card-second-text'>EU CTU</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Status</div>
                                <div className='buy-product-card-second-text'>Ready to file</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>GMP Approvals</div>
                                <div className='buy-product-card-second-text'>GU EMP</div>
                            </div>

                        </div>
                    </div>

                    <div className='buy-product-card-section'>
                        <div className='buy-product-card-first-section-right'>
                            <div className='buy-product-card-first-medicine-image'>
                                <img src={MedicineOne} alt="Medicine" />
                            </div>
                            <div className='buy-product-card-first-button-container'>
                                <Link to='/product-details'>
                                    <div className='buy-product-card-first-send-button'>
                                        View Details
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='buy-product-card-first-section'>
                            <div className='buy-product-card-first-left'>
                                <div className='buy-product-card-first-copmany-name'>Medicine Name</div>
                                <div className='buy-product-card-first-copmany-description'>Drugs Name</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Country of origin</div>
                                <div className='buy-product-card-second-text'>Dubai UAE</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Stocked in</div>
                                <div className='buy-product-card-second-text'>450</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Type</div>
                                <div className='buy-product-card-second-text'>EU CTU</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Status</div>
                                <div className='buy-product-card-second-text'>Ready to file</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>GMP Approvals</div>
                                <div className='buy-product-card-second-text'>GU EMP</div>
                            </div>

                        </div>
                    </div>

                    <div className='buy-product-card-section'>
                        <div className='buy-product-card-first-section-right'>
                            <div className='buy-product-card-first-medicine-image'>
                                <img src={MedicineOne} alt="Medicine" />
                            </div>
                            <div className='buy-product-card-first-button-container'>
                                <Link to='/product-details'>
                                    <div className='buy-product-card-first-send-button'>
                                        View Details
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='buy-product-card-first-section'>
                            <div className='buy-product-card-first-left'>
                                <div className='buy-product-card-first-copmany-name'>Medicine Name</div>
                                <div className='buy-product-card-first-copmany-description'>Drugs Name</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Country of origin</div>
                                <div className='buy-product-card-second-text'>Dubai UAE</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Stocked in</div>
                                <div className='buy-product-card-second-text'>450</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Type</div>
                                <div className='buy-product-card-second-text'>EU CTU</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>Dossier Status</div>
                                <div className='buy-product-card-second-text'>Ready to file</div>
                            </div>
                            <div className='buy-product-card-second-section'>
                                <div className='buy-product-card-second-head'>GMP Approvals</div>
                                <div className='buy-product-card-second-text'>GU EMP</div>
                            </div>

                        </div>
                    </div>

                </div >

                {/* Add Product Card */}

                {/* <AddProductCard/> */}

            </div>
        </>
    )
}

export default Buy





