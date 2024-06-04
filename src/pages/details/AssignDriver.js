import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

const AssignDriver = () => {
    return (
        <div className="card-body">
            <div>
                <div className="table-assign-driver-heading">Product List</div>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-not-names">PR1234567</span>
                            </div>
                        </td>
                        <td className='tables-td-cont' >
                            <div className="table-second-container">
                                <span className="table-g-section">G</span>
                                <div className="table-g-section-content">
                                    <span className="table-g-driver-name">Product Name</span>
                                    <span className="table-g-not-name">Paracetamol (acetaminophen) </span>
                                </div>
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Quantity</span>
                                <span className="table-g-not-name">200</span>
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Unit Price</span>
                                <input type='text' className='tables-td-input' name='Unit Price' placeholder='Unit Price' />
                                {/* <span className="table-g-not-name">4 AED</span> */}
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Total Amount</span>
                                <span className="table-g-not-name">500 AED</span>
                            </div>
                        </td>
                        <td className='tables-status'>
                            <div className='tables-button-conatiner'>
                                <div className='table-accept-button'>Accept</div>
                                <div className='table-reject-button'>Reject</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-not-names">PR1234567</span>
                            </div>
                        </td>
                        <td className='tables-td-cont' >
                            <div className="table-second-container">
                                <span className="table-g-section">G</span>
                                <div className="table-g-section-content">
                                    <span className="table-g-driver-name">Product Name</span>
                                    <span className="table-g-not-name">Paracetamol (acetaminophen) </span>
                                </div>
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Quantity</span>
                                <span className="table-g-not-name">200</span>
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Unit Price</span>
                                <input type='text' className='tables-td-input' name='Unit Price' placeholder='Unit Price' />
                                {/* <span className="table-g-not-name">4 AED</span> */}
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Total Amount</span>
                                <span className="table-g-not-name">500 AED</span>
                            </div>
                        </td>
                        <td className='tables-status'>
                            <div className='tables-button-conatiner'>
                                <div className='table-accept-button'>Accept</div>
                                <div className='table-reject-button'>Reject</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-not-names">PR1234567</span>
                            </div>
                        </td>
                        <td className='tables-td-cont' >
                            <div className="table-second-container">
                                <span className="table-g-section">G</span>
                                <div className="table-g-section-content">
                                    <span className="table-g-driver-name">Product Name</span>
                                    <span className="table-g-not-name">Paracetamol (acetaminophen) </span>
                                </div>
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Quantity</span>
                                <span className="table-g-not-name">200</span>
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Unit Price</span>
                                <input type='text' className='tables-td-input' name='Unit Price' placeholder='Unit Price' />
                                {/* <span className="table-g-not-name">4 AED</span> */}
                            </div>
                        </td>
                        <td className='tables-td'>
                            <div className="table-g-section-content">
                                <span className="table-g-driver-name">Total Amount</span>
                                <span className="table-g-not-name">500 AED</span>
                            </div>
                        </td>
                        <td className='tables-status'>
                            <div className='tables-button-conatiner'>
                                <div className='table-accept-button'>Accept</div>
                                <div className='table-reject-button'>Reject</div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default AssignDriver