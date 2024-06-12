import React, { useEffect, useState } from 'react';
import styles from '../../style/invoice.module.css';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PendingInvoice from '../invoice/PendingInvoice';
import PaidInvoice from '../invoice/CompleteInvoice';
import { Link } from 'react-router-dom';
import { postRequestWithToken } from '../../api/Requests';


const Invoice = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    
    const headings = ['Pending Invoices', 'Paid Invoices'];

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const [invoiceList, setInvoiceList] = useState([])
    const [totalInvoices, setTotalInvoices] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 1;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // useEffect(() => {
    //     const obj = {
    //         buyer_id: "BYR-jmn98sdanx",
    //         filterKey: activeIndex === 0 ? 'pending' : activeIndex === 1 ? 'completed' : '',
    //         page_no: currentPage,
    //         limit: invoicesPerPage,
    //     }

    //     postRequestWithToken('supplier/order/supplier-invoice-list', obj, async (response) => {
    //         if (response.code === 200) {
    //             setInvoiceList(response.result.data)
    //             // setTotalOrders(response.result.totalItems)
    //         } else {
    //             console.log('error in invoice list api', response);
    //         }
    //     })
    // }, [activeIndex])

    return (
        <>
            <div className={styles[`invoice-container`]}>
                <div className={styles['complete-container-invoice-section']}>
                    <div className={styles['complete-conatiner-head']}>Invoices</div>
                    <Link to='/create-invoice'>
                        <div className={styles['complete-conatiner-create-invoice']}>Create Invoice</div>
                    </Link>
                </div>
                <div className={styles[`invoice-wrapper`]}>
                    <div className={styles[`invoice-wrapper-left`]}>
                        {headings.map((heading, index) => (
                            <div key={index} className={styles['invoice-left-wrapper']} onClick={() => handleItemClick(index)}>
                                <DescriptionOutlinedIcon className={styles['invoice-wrapper-left-icons']} />
                                <div className={`${styles['invoice-wrapper-left-text']} ${activeIndex === index ? styles['active'] : ''}`}>{heading}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles[`invoice-wrapper-right`]}>
                        {activeIndex === 0 && <PendingInvoice invoiceList={invoiceList} />}
                        {activeIndex === 1 && <PaidInvoice invoiceList={invoiceList} />}
                        {/* {activeIndex === 2 && } */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Invoice;
