import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardOrder from '../../style/dashboardorder.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment/moment';
import OrderCancel from '../OrderCancel';


const CompletedOrders = () => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const [modal, setModal] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const showModal = (orderId) => {
        setSelectedOrderId(orderId)
        setModal(!modal)
    }

    const [orderList, setOrderList]     = useState([])
    const [totalOrders, setTotalOrders] = useState()

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage     = 2;
    const indexOfLastOrder  = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    // const currentOrders     = activeOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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
            filterKey : 'completed',
            page_no   : currentPage, 
            limit     : ordersPerPage,
        }

        postRequestWithToken('supplier/order/supplier-order-list', obj, async (response) => {
            if (response.code === 200) {
                setOrderList(response.result.data)
                setTotalOrders(response.result.totalItems)
            } else {
               console.log('error in order list api',response);
            }
          })
    },[currentPage])

    return (
        <>
            <div className='request-main-container'>
                <div className="request-name"> Completed Orders</div>
                <div className="request-container">
                    <div className="request-container-section">
                        <div className='request-inner-container-section'>
                            <table className="table-request">
                                <thead className='request-container-thead'>
                                    <tr className='request-container-tr'>
                                        <th className="request-container-th"><div className="request-container-head"> Order ID</div></th>
                                        <th className="request-container-th"> <div className="request-container-head"> Date</div></th>
                                        <th className="request-container-ths"><div className="request-container-heads">Buyer Name</div></th>
                                        <th className="request-container-th"><div className="request-container-head">Quantity</div></th>
                                        <th className="request-container-th"><div className="request-container-head">Status</div></th>
                                        <th className="request-container-th-action"><div className="request-container-head">Action</div></th>
                                    </tr>
                                </thead>
                                <tbody className='request-container-tbody'>
                                    <tr className="request-section-tr">
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">18452025</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">12/12/2019</div>
                                        </td>
                                        <td className='request-section-tds'>
                                            <div className="request-section-heading">Abdul Medical Shop</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">200</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">Delivered</div>
                                        </td>
                                        <td className='request-section-button-cont'>
                                            <div className='request-section-button'>
                                                <Link to='/active-orders-details/087565'>
                                                    <div className='request-section-view'>
                                                        <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                    </div>
                                                </Link>
                                                {/* <Link to='#'> */}
                                                    <div className='request-section-delete' onClick={() => showModal('087565')}>
                                                        <HighlightOffIcon className='request-section-off' />
                                                    </div>
                                                {/* </Link> */}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody className='request-container-tbody'>
                                    <tr className="request-section-tr">
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">18452025</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">12/12/2019</div>
                                        </td>
                                        <td className='request-section-tds'>
                                            <div className="request-section-heading">Abdul Medical Shop</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">200</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">Delivered</div>
                                        </td>
                                        <td className='request-section-button-cont'>
                                            <div className='request-section-button'>
                                                <Link to='/active-orders-details/087565'>
                                                    <div className='request-section-view'>
                                                        <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                    </div>
                                                </Link>
                                                {/* <Link to='#'> */}
                                                    <div className='request-section-delete' onClick={() => showModal('087565')}>
                                                        <HighlightOffIcon className='request-section-off' />
                                                    </div>
                                                {/* </Link> */}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody className='request-container-tbody'>
                                    <tr className="request-section-tr">
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">18452025</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">12/12/2019</div>
                                        </td>
                                        <td className='request-section-tds'>
                                            <div className="request-section-heading">Abdul Medical Shop</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">200</div>
                                        </td>
                                        <td className='request-section-td'>
                                            <div className="request-section-heading">Delivered</div>
                                        </td>
                                        <td className='request-section-button-cont'>
                                            <div className='request-section-button'>
                                                <Link to='/active-orders-details/087565'>
                                                    <div className='request-section-view'>
                                                        <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                    </div>
                                                </Link>
                                                {/* <Link to='#'> */}
                                                    <div className='request-section-delete' onClick={() => showModal('087565')}>
                                                        <HighlightOffIcon className='request-section-off' />
                                                    </div>
                                                {/* </Link> */}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                {/* {
                                    orderList && orderList?.length > 0 ? (
                                        orderList.map((order, i) => {
                                            const totalQuantity = order.items.reduce((total, item) => {
                                                return total + item.quantity;
                                              }, 0);
                                              const orderedDate = moment(order.created_at).format("DD/MM/YYYY")
                                            return (
                                                <tbody className='request-container-tbody'>
                                                <tr className="request-section-tr">
                                                    <td className='request-section-td'>
                                                        <div className="request-section-heading">{order.order_id}</div>
                                                    </td>
                                                    <td className='request-section-td'>
                                                        <div className="request-section-heading">{orderedDate}</div>
                                                    </td>
                                                    <td className='request-section-tds'>
                                                        <div className="request-section-heading">{order.buyer.buyer_name}</div>
                                                    </td>
                                                    <td className='request-section-td'>
                                                        <div className="request-section-heading">{totalQuantity}</div>
                                                    </td>
                                                    <td className='request-section-td'>
                                                        <div className="request-section-heading">{order.order_status}</div>
                                                    </td>
                                                    <td className='request-section-button-cont'>
                                                        <div className='request-section-button'>
                                                            <Link to={`/order-details/${order.order_id}`}>
                                                                <div className='request-section-view'>
                                                                    <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                                </div>
                                                            </Link>
                                                                <div className='request-section-delete' onClick={() => showModal(order.order_id)}>
                                                                    <HighlightOffIcon className='request-section-off' />
                                                                </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            ) 
                                        })
                                    ) : 'no orders'
                                } */}
                            </table>
                        </div>
                        {
                            modal === true ? <OrderCancel setModal={setModal} orderId = {selectedOrderId} activeLink = {'completed'} /> : ''
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default CompletedOrders