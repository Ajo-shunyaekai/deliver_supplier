import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../style/pendingInvoice.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';


const PendingInvoice = ({ invoiceList }) => {

    const [showModal, setShowModal] = useState(false);

    const invoiceListt = [
        {
            invoice_number: "INV-001",
            order_id: "ORD-123",
            shipping_details: {
                consignor_name: "John Doe"
            },
            totalPrice: 500.00,
            order_status: "Pending"
        },
        {
            invoice_number: "INV-002",
            order_id: "ORD-124",
            shipping_details: {
                consignor_name: "Jane Smith"
            },
            totalPrice: 750.00,
            order_status: "Pending"
        },
        {
            invoice_number: "INV-003",
            order_id: "ORD-125",
            shipping_details: {
                consignor_name: "Acme Corp"
            },
            totalPrice: 1200.50,
            order_status: "Pending"
        }
    ];

    return (
        <div className='pending-invo-container' >
            <div className='table-responsive mh-2 50'>
                <table className="table table-theme table-row v-middle" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <thead>
                        <tr>
                            <th className="text-muted invoice-th">Invoice No.</th>
                            <th className="text-muted invoice-th">Order ID</th>
                            <th className="text-muted invoice-th">Customer Name</th>
                            <th className="text-muted invoice-th">Amount</th>
                            <th className="text-muted invoice-th">Status</th>
                            <th className="text-muted invoice-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className='pending-invoies-tbody-section'>
                        {
                            invoiceListt?.map((invoice, i) => {
                                return (
                                    <tr data-id="9" className='table-row v-middle'>
                                        <td>
                                            <span className="item-title">{invoice.invoice_number}</span>
                                        </td>
                                        <td>
                                            <span className="item-title">{invoice.order_id}</span>
                                        </td>
                                        <td>
                                            <div className="mx-0">
                                                <span className="item-title text-color">{invoice.shipping_details.consignor_name}</span>
                                            </div>
                                        </td>

                                        <td className="flex">
                                            <span className="item-title text-color">{invoice.totalPrice} AED</span>
                                        </td>
                                        <td className="flex">
                                            <span className="item-title text-color">{invoice.order_status}</span>
                                        </td>
                                        <td className='pending-invoices-td'>
                                            <div className='invoice-details-button-row'>
                                                <Link to='/invoice-design'>
                                                    <div className='invoice-details-button-column'>
                                                        <VisibilityOutlinedIcon className='invoice-view' />
                                                    </div>
                                                </Link>
                                                <div className='invoice-details-button-column-download'>
                                                    <CloudDownloadOutlinedIcon className='invoice-view' />
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingInvoice
