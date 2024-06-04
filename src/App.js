import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import PopupModal from './pages/PopupModal.js';
import Dashboard from './pages/Dashboard.js';
import Product from './pages/Product.js';
import Order from './pages/Order.js';
import Invoice from './pages/invoice/Invoice.js';
import Support from './pages/Support.js';
import OrderRequest from './pages/OrderRequest.js';
import ActiveOrder from './pages/ActiveOrder.js';
import CompleteOrder from './pages/CompleteOrder.js';
import DeletedOrder from './pages/DeletedOrder.js';
import OrderCancel from './pages/OrderCancel.js';
import OrderDetails from './pages/OrderDetails.js';
import ProductDetails from './pages/ProductDetails.js';
import CountryDetails from './pages/CountryDetails.js';
import Header from './pages/Header.js';
import FaqSupport from './pages/FaqSupport.js';
import PendingInvoice from './pages/invoice/PendingInvoice.js';
import CompleteInvoice from './pages/invoice/CompleteInvoice.js';
import CreateInvoice from './pages/invoice/CreateInvoice.js';
import DashboardOngoing from './pages/dashboardOrders/DashboardOngoing.js';
import OrderRequests from './pages/dashboardOrders/OrderRequest';
import CompletedOrders from './pages/dashboardOrders/CompletedOrders.js';
import OngoingInvoice from './pages/invoice/OngoingInvoice.js';
import SignUp from './signup/SignUp.js';
import ImageUploader from './signup/ImageUploader.js';
import SuccessModal from './signup/SuccessModal.js';
import Login from './signup/Login.js';
import InvoiceDesign from './pages/invoice/InvoiceDesign.js';
import ActiveOrdersDetails from './pages/ActiveOrdersDetails.js';
import ActiveAssignDriver from './pages/details/ActiveAssignDriver.js';
import BuyerDetails from './pages/BuyerDetails.js'
import BuyerCompletedList from './pages/buyer/BuyerCompletedList.js';
import BuyerActiveList from './pages/buyer/BuyerActiveList.js';
import BuyerPendingList from './pages/buyer/BuyerPendingList.js';
function ExcludeSidebar() {
  return (
    <div>
      <Sidebar >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/support" element={<Support />} />
          <Route path="/header" element={<Header />} />
          <Route path="/order-request" element={<OrderRequest />} />
          <Route path="/active-order" element={<ActiveOrder />} />
          <Route path="/complete-order" element={<CompleteOrder />} />
          <Route path="/deleted-order" element={<DeletedOrder />} />
          <Route path="/popup-Modal" element={<PopupModal />} />
          <Route path="/ordercancel" element={<OrderCancel />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/country-details" element={<CountryDetails />} />
          <Route path="/faq-support" element={<FaqSupport />} />
          <Route path="/pending-invoice" element={<PendingInvoice />} />
          <Route path="/complete-invoice" element={<CompleteInvoice />} />
          <Route path="/ongoing-invoice" element={<OngoingInvoice />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/order-requests" element={<OrderRequests />} />
          <Route path="/ongoing-orders" element={<DashboardOngoing />} />
          <Route path="/completed-orders" element={<CompletedOrders />} />
          <Route path="/image-uploader" element={<ImageUploader />} />
          <Route path="/success-modal" element={<SuccessModal />} />
          <Route path="/invoice-design" element={<InvoiceDesign />} />
          <Route path="/active-orders-details" element={<ActiveOrdersDetails />} />
          <Route path="/active-assign-driver" element={<ActiveAssignDriver />} />
          <Route path="/buyer-details" element={<BuyerDetails />} />
          <Route path="/buyer-completed-list" element={<BuyerCompletedList />} />
          <Route path="/buyer-active-list" element={<BuyerActiveList />} />
          <Route path="/buyer-pending-list" element={<BuyerPendingList />} />
        </Routes>
      </Sidebar>
    </div>

  )
}

const App = () => {
  return (
    <div className='App-Container'>
      <BrowserRouter>
        {/* <Routes> */}
        {/* Redirect root to sign-up */}
        {/* <Route path="/" element={<Navigate to="/sign-up" />} />
          <Route path="/sign-up" element={<SignUp />} /> */}

        {/* Routes with Sidebar */}
        {/* <Route
            element={ */}
        {/* <Sidebar> */}
        <Routes>
          {/* <Route path="/" element={<Navigate to="/sign-up" />} /> */}
          <Route path='/*' element={<ExcludeSidebar />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/invoice" element={<Invoice />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/header" element={<Header />} />
                  <Route path="/order-request" element={<OrderRequest />} />
                  <Route path="/active-order" element={<ActiveOrder />} />
                  <Route path="/complete-order" element={<CompleteOrder />} />
                  <Route path="/deleted-order" element={<DeletedOrder />} />
                  <Route path="/popup-Modal" element={<PopupModal />} />
                  <Route path="/ordercancel" element={<OrderCancel />} />
                  <Route path="/order-details" element={<OrderDetails />} />
                  <Route path="/product-details" element={<ProductDetails />} />
                  <Route path="/country-details" element={<CountryDetails />} />
                  <Route path="/faq-support" element={<FaqSupport />} />
                  <Route path="/pending-invoice" element={<PendingInvoice />} />
                  <Route path="/complete-invoice" element={<CompleteInvoice />} />
                  <Route path="/ongoing-invoice" element={<OngoingInvoice />} />
                  <Route path="/pending-form" element={<PendingForm />} />
                  <Route path="/create-invoice" element={<CreateInvoice />} />
                  <Route path="/order-requests" element={<OrderRequests />} />
                  <Route path="/ongoing-orders" element={<DashboardOngoing />} />
                  <Route path="/completed-orders" element={<CompletedOrders />} />
                  <Route path="/image-uploader" element={<ImageUploader />} /> */}

        </Routes>
        {/* </Sidebar> */}
        {/* }
     />
      </Routes> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
