import React, { useEffect, useState } from 'react';
import styles from '../style/product.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/addproductlist.css';
import SecondaryMarket from './SecondaryMarket';
import NewProduct from './NewProduct';
import { postRequest, postRequestWithToken } from '../api/Requests';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [medicineList, setMedicineList] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2


    const [medicineType, setMedicineType] = useState(() => {
        
        switch (location.pathname) {
            case '/product/newproduct':
                return 'new';
            case '/product/secondarymarket':
                return 'secondary market';
            default:
                return 'new';
        }
    });
    

    const getActiveButtonFromPath = (path) => {
        switch (path) {
            case '/product/newproduct':
                return 'newproduct';
            case '/product/secondarymarket':
                return 'secondarymarket';
            default:
                return 'newproduct';
        }
    };


    const activeButton = getActiveButtonFromPath(location.pathname);

    const handleButtonClick = (button) => {
        setCurrentPage(1)
        switch (button) {
            case 'newproduct':
                setMedicineType('new')
                navigate('/product/newproduct');
                break;
            case 'secondarymarket':
                setMedicineType('secondary market')
                navigate('/product/secondarymarket');
                break;
            default:
                navigate('/product/newproduct');
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {

        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/login");
        return;
        }

        const obj = {
            supplier_id   : supplierIdSessionStorage || supplierIdLocalStorage ,
            medicine_type : medicineType,
            pageNo        : currentPage, 
            pageSize      : itemsPerPage,
        }

        postRequestWithToken('medicine/medicine-list', obj, async (response) => {
            if (response.code === 200) {
                setMedicineList(response.result.data)
                setTotalItems(response.result.totalItems)
            } else {
               console.log('error in order list api',response);
            }
          })
    }, [medicineType, currentPage])

    return (
        <>
            <div className={styles['product-main-conatiners']}>
                <div className={styles['supprot-heading-text']}>
                    Add Product
                </div>
                <div className={styles['support-add-product-container']}>
                <div
                    className={`${styles['support-product-new-product']} ${activeButton === 'newproduct' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('newproduct')}
                >
                    New Product
                </div>
                <div
                    className={`${styles['support-product-secondary-product']} ${activeButton === 'secondarymarket' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('secondarymarket')}
                >
                    Secondary Market
                </div>
                </div>
                {activeButton === 'newproduct' && 
                <NewProduct
                    productList = {medicineList}
                    totalItems = {totalItems}
                    currentPage = {currentPage}
                    itemsPerPage    = {itemsPerPage}
                    handlePageChange = {handlePageChange}
                 />}
                {activeButton === 'secondarymarket' && 
                <SecondaryMarket 
                    productList = {medicineList}
                    totalItems = {totalItems}
                    currentPage = {currentPage}
                    itemsPerPage    = {itemsPerPage}
                    handlePageChange = {handlePageChange}
                />}
            </div>
        </>
    )
}

export default Product;




