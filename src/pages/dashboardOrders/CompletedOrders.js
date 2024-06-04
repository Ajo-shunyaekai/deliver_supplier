import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardOrder from '../../style/dashboardorder.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CompletedOrders = () => {

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
                                                <Link to='/order-details'>
                                                    <div className='request-section-view'>
                                                        <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                    </div>
                                                </Link>
                                                <Link to='#'>
                                                    <div className='request-section-delete'>
                                                        <HighlightOffIcon className='request-section-off' />
                                                    </div>
                                                </Link>
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
                                                <Link to='/order-details'>
                                                    <div className='request-section-view'>
                                                        <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                    </div>
                                                </Link>
                                                <Link to='#'>
                                                    <div className='request-section-delete'>
                                                        <HighlightOffIcon className='request-section-off' />
                                                    </div>
                                                </Link>
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
                                                <Link to='/order-details'>
                                                    <div className='request-section-view'>
                                                        <RemoveRedEyeOutlinedIcon className='request-section-eye' />
                                                    </div>
                                                </Link>
                                                <Link to='#'>
                                                    <div className='request-section-delete'>
                                                        <HighlightOffIcon className='request-section-off' />
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CompletedOrders