import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import order from '../style/order.css';
import activeorder from '../style/activeOrder.css'
import Pagination from "react-js-pagination";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import OrderCancel from './OrderCancel';

const CompleteOrder = () => {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);

    // Alloted Order JSON file
    const [allotedOrders, setAllotedOrders] = useState([
        {
            "order_id": "000001",
            "date": {
                "date": "12/12/2019",
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
        {
            "order_id": "000002",
            "date": {
                "date": "12/12/2019",
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
        {
            "order_id": "000003",
            "date": {
                "date": "12/12/2019",
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
        {
            "order_id": "000004",
            "date": {
                "date": "12/12/2019",
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 2; // Change this to set the number of orders per page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = allotedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(allotedOrders.length / ordersPerPage);

    return (
        <>
            <div className='order-main-container'>
                <div className="order-name-2"> Order Request</div>
                <div className="order-container">
                    <div className="order-container-right-section">
                        <div className='order-inner-container-section'>
                            <table className="table-container">
                                <thead className='order-container-thead'>
                                    <tr className='order-container-tr'>
                                        <th className=" text-muted order-container-th"><div className="order-container-head"> Order ID</div></th>
                                        <th className=" order-container-th"> <div className="order-container-head"> Date</div></th>
                                        <th className="order-container-ths"><div className="order-container-heads">Buyer Name</div></th>
                                        <th className="order-container-th"><div className="order-container-head">Quantity</div></th>
                                        <th className="order-container-th"><div className="order-container-head">Status</div></th>
                                        <th className="order-container-th-action"><div className="order-container-head">Action</div></th>
                                    </tr>
                                </thead>
                                {currentOrders.map(order => (
                                    <tbody className='order-container-tbody' key={order.order_id}>
                                        <tr className="order-section-tr" >
                                            <td className='order-section-td'>
                                                <div className="order-section-heading">{order.order_id}</div>
                                            </td>
                                            <td className='order-section-td'>
                                                <div className="order-section-heading">{order.date.date}</div>
                                            </td>
                                            <td className='order-section-tds'>
                                                <div className="order-section-heading">{order.source_destination.source}</div>
                                            </td>
                                            <td className='order-section-td'>
                                                <div className="order-section-heading">{order.number_of_TRWB}</div>
                                            </td>
                                            <td className='order-section-td'>
                                                <div className="order-section-heading">{order.status}</div>
                                            </td>
                                            <td className='order-section-button-cont'>
                                                <div className='order-section-button'>
                                                    <Link to='/active-orders-details'>
                                                        <div className='order-section-view'>
                                                            <RemoveRedEyeOutlinedIcon className='order-section-eye' />
                                                        </div>
                                                    </Link>
                                                    <Link to='#' onClick={() => setModal(true)}>
                                                        <div className='order-section-delete'>
                                                            <HighlightOffIcon className='order-section-off' />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                        {modal && <OrderCancel setModal={setModal} />}
                        <div className='pagi-container'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={ordersPerPage}
                                totalItemsCount={allotedOrders.length}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                prevPageText={<KeyboardDoubleArrowLeftIcon style={{ fontSize: '15px' }} />}
                                nextPageText={<KeyboardDoubleArrowRightIcon style={{ fontSize: '15px' }} />}
                                hideFirstLastPages={true}
                            />
                            <div className='pagi-total'>
                                <div className='pagi-total'>
                                    Total Items: {allotedOrders.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompleteOrder;
