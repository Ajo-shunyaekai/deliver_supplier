import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import order from '../style/order.css';
import order_list from '../assest/dashboard/order_list.svg'
import OrderCancel from './OrderCancel';
import OrderDetails from './OrderDetails';
import OrderRequest from './OrderRequest';
import ActiveOrders from './ActiveOrder';
import CompletedOrders from './CompleteOrder';
import DeletedOrders from './DeletedOrder';
import Sidebar from '../components/Sidebar';
import { postRequestWithToken } from '../api/Requests';


const Order = () => {
    const navigate = useNavigate()
    // Alloted Order JSOn file
    const [allotedOrders, setAllotedOrders] = useState([
        {
            "order_id": "000001",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
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
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
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
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
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
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
    ]);

    // Active Order JSOn file
    const [activeOrders, setActiveOrders] = useState([
        {
            "order_id": "000002",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
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
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
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
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
        {
            "order_id": "000005",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
        {
            "order_id": "000006",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
        {
            "order_id": "000007",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        },
    ]);

    // Complete Order JSOn file
    const [completeOrders, setCompleteOrders] = useState([
        {
            "order_id": "000003",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
            },
            "source_destination": {
                "source": "Pharmaceutical Pvt Ltd",
                // "destination": "Sharjah - United Arab Emirates"
            },
            "number_of_TRWB": 4,
            "commodity": {
                "name": "Steel",
                "quantity": "(20 Ton)"
            },
            "status": "Order Placed"
        }
    ]);

    // Delete Order JSOn file
    const [deleteOrders, setDeleteOrders] = useState([
        {
            "order_id": "000005",
            "date": {
                "date": "12/12/2019",
                // "time": "10:00 am"
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
        }
    ]);

    // Active class apply
    const [activeLink, setActiveLink]   = useState('order-request');
    const [orderList, setOrderList]     = useState([])
    const [totalOrders, setTotalOrders] = useState()
    const [currentPage, setCurrentPage] = useState(1); 
    const ordersPerPage = 2;

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setCurrentPage(1)
        // Here you can set the respective orders state variable based on the link clicked
        switch (link) {
            case 'order-request':
                // Set allotedOrders state
                break;
            case 'active':
                // Set activeOrders state
                break;

            case 'completed':
                // Set completeOrders state
                break;
            // case 'delete':
            // Set deleteOrders state
            // break;
            // Add cases for completed and deleted orders similarly
            default:
                break;
        }
    };


    // Based on the activeLink, select the appropriate orders
    const ordersToShow = activeLink === 'order-request' ? allotedOrders : activeLink === 'completed' ?
        completeOrders : activeLink === 'deleted' ? deleteOrders : activeOrders;


    // Calculate total pages
    const totalPages = Math.ceil(ordersToShow.length / ordersPerPage);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(!modal)
    }

    const [showOrder, showOrderDetails] = useState(false)

    const showOrderModal = () => {
        showOrderDetails(!showOrder)
    }

    // pagination end
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
            supplier_id  : supplierIdSessionStorage || supplierIdLocalStorage,
            filterKey    : activeLink,
            page_no      : currentPage, 
            limit        : ordersPerPage,
        }

        // postRequestWithToken('supplier/order/supplier-order-list', obj, async (response) => {
        //     if (response.code === 200) {
        //         setOrderList(response.result.data)
        //         setTotalOrders(response.result.totalItems)
        //     } else {
        //        console.log('error in order list api',response);
        //     }
        //   })
    },[activeLink, currentPage])

    return (
        <>
            <div className='order-main-container'>
                <div className="order-name">
                    {(() => {
                        switch (activeLink) {
                            case 'order-request':
                                return 'Order Request';
                            case 'active':
                                return 'Active Orders';
                            case 'completed':
                                return 'Completed Orders';
                            default:
                                return 'Orders';
                        }
                    })()}
                </div>
                {/* <div className="order-name">Orders</div> */}
                <div className="order-container">
                    <div className="order-container-left">
                        <div onClick={() => handleLinkClick('order-request')} className={activeLink === 'order-request' ? 'active order-left-wrapper' : 'order-left-wrapper'}>
                            <img src={order_list} alt="order icon" />
                            <div>Order Request</div>
                        </div>
                        <div onClick={() => handleLinkClick('active')} className={activeLink === 'active' ? 'active order-left-wrapper' : 'order-left-wrapper'}>
                            <img src={order_list} alt="order icon" />
                            <div>Active Orders</div>
                        </div>
                        <div onClick={() => handleLinkClick('completed')} className={activeLink === 'completed' ? 'active order-left-wrapper' : 'order-left-wrapper'}>
                            <img src={order_list} alt="order icon" />
                            <div>Completed Orders</div>
                        </div>
                    </div>

                    {/* Order Right side table  */}
                    <div className="order-container-right">
                        <div responsive="xl" className='order-table-responsive'>
                            {
                                activeLink === 'active' ? 
                                <ActiveOrders 
                                    orderList        = {orderList} 
                                    totalOrders      = {totalOrders} 
                                    currentPage      = {currentPage}
                                    ordersPerPage    = {ordersPerPage}
                                    handlePageChange = {handlePageChange}
                                    activeLink       = {activeLink}
                                /> 
                                : activeLink === 'completed' ?
                                 <CompletedOrders 
                                    orderList        = {orderList} 
                                    totalOrders      = {totalOrders} 
                                    currentPage      = {currentPage}
                                    ordersPerPage    = {ordersPerPage}
                                    handlePageChange = {handlePageChange}
                                    activeLink       = {activeLink}
                                 /> 
                                : activeLink === 'deleted' ? 
                                <DeletedOrders /> 
                                : activeLink === 'order-request' ? 
                                <OrderRequest 
                                    orderList        = {orderList} 
                                    totalOrders      = {totalOrders} 
                                    currentPage      = {currentPage}
                                    ordersPerPage    = {ordersPerPage}
                                    handlePageChange = {handlePageChange}
                                    activeLink       = {activeLink}
                                /> : ''
                            }
                        </div>
                        {
                            modal === true ? <OrderCancel setModal={setModal} /> : ''
                        }
                        {
                            showOrder === true ? <OrderDetails showOrderDetails={showOrderDetails} /> : ''
                        }


                    </div>
                </div>
            </div>
        </>
    )
}
export default Order
