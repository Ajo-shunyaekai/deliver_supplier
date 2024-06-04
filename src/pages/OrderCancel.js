import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import orderCancel from '../style/orderCancel.css';

const OrderCancel = ({ setModal }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        setModal(false);
    };

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation">
            <div className="order-cancel-container">
                <div className="order-cancel-header">
                    <div className="order-cancel-heading">Order ID : 22585</div>
                    <CloseIcon onClick={handleClose} style={{ fontSize: '20px', color: '#5e676f' }} />
                </div>

                <div className="order-cancel-content">
                    This order is allotted to you. If you cancel this order, this order will no longer be allotted to you. Still want to cancel this, proceed further.
                </div>

                <div className="order-textarea-heading">
                    <span>Reason</span>
                    <textarea name="" id="" rows="4" className="order-textarea" />
                </div>

                <div className="order-btn-container">
                    <div className="order-close-btn" onClick={handleClose}>Close</div>
                    <div className="order-submit-btn" onClick={handleClose}>Delete</div>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <Drawer anchor="right" open={open}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default OrderCancel;
