import React, { useState, useEffect } from 'react';
import styles from '../../style/createInvoice.module.css';
import CloseIcon from '@mui/icons-material/Close';

const CreateInvoice = () => {
    // Country Code
    const [formData, setFormData] = useState({
        operationCountries: [],
    });

    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const countryNames = data.map(country => country.name.common).sort();
                setCountries(countryNames);
            } catch (error) {
                console.error('Error fetching the countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (name === 'description' && value.length > 1000) {
            setErrors(prevState => ({ ...prevState, description: 'Description cannot exceed 1000 characters' }));
        } else {
            setErrors(prevState => ({ ...prevState, [name]: '' }));
        }
    };

    // Add items section code start from here

    const [formItems, setFormItems] = useState([{ id: Date.now() }]);

    const addFormItem = () => {
        setFormItems([...formItems, { id: Date.now() }]);
    };

    const removeFormItem = (id) => {
        setFormItems(formItems.filter(item => item.id !== id));
    };


    return (
        <>
            <div className={styles['create-invoice-container']}>
                <div className={styles['create-invoice-heading']}>Create Invoice</div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Supplier</div>
                    <form className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Supplier Name</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the supplier name' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Invoice Number</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the invoice number' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Invoice Date</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the invoice date' />
                        </div>

                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}> Address</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the supplier address' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Country</label>
                            <select
                                className='signup-form-section-input'
                                name="originCountry"
                                value={formData.originCountry}
                                onChange={handleChange}
                                placeholder='Select Country Code'
                            >
                                <option value="" disabled>Select your country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                            {/* <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the supplier country name' /> */}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>VAT Reg No.</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the supplier vat reg no.' />
                        </div>

                    </form>
                </div>

                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Buyer</div>
                    <form className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Buyer Name</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the buyer name' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Address</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the buyer address' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Country</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the buyer country name' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>VAT Reg No.</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the buyer vat reg no' />
                        </div>
                    </form>
                </div>

                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-add-item-cont']}>
                        <div className={styles['create-invoice-form-heading']}>Add Item</div>
                        <span className={styles['create-invoice-add-tem-button']} onClick={addFormItem}>Add More</span>
                    </div>

                    {/* {formItems.map((item, index) => (

                    <form className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Item Name</label>
                            <input className={styles['create-invoice-div-input']} type='text' name={`Name-${item.id}`} placeholder='Enter the item name' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Qty</label>
                            <input className={styles['create-invoice-div-input']} type='text' name={`Qty-${item.id}`} placeholder='Enter the qty' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Unit Price</label>
                            <input className={styles['create-invoice-div-input']} type='text' name={`UnitPrice-${item.id}`} placeholder='Enter the unit price' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Total Amount</label>
                            <input className={styles['create-invoice-div-input']} type='text' name={`TotalAmount-${item.id}`}  placeholder='Enter the total amount' />
                        </div>


                    </form>
                    ))}

                    {formItems.length > 1 && ( <div className={styles['create-invoice-close-btn']} onClick={() => removeFormItem(item.id)}><CloseIcon / > </div>)} */}



                    {formItems.map((item, index) => (
                        <div className={styles['form-item-container']} key={item.id}>
                            <form className={styles['craete-invoice-form']}>
                                <div className={styles['create-invoice-div-container']}>
                                    <label className={styles['create-invoice-div-label']}>Item Name</label>
                                    <input className={styles['create-invoice-div-input']} type='text' name={`Name-${item.id}`} placeholder='Enter the item name' />
                                </div>
                                <div className={styles['create-invoice-div-container']}>
                                    <label className={styles['create-invoice-div-label']}>Qty</label>
                                    <input className={styles['create-invoice-div-input']} type='text' name={`Qty-${item.id}`} placeholder='Enter the qty' />
                                </div>
                                <div className={styles['create-invoice-div-container']}>
                                    <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                    <input className={styles['create-invoice-div-input']} type='text' name={`UnitPrice-${item.id}`} placeholder='Enter the unit price' />
                                </div>
                                <div className={styles['create-invoice-div-container']}>
                                    <label className={styles['create-invoice-div-label']}>Total Amount</label>
                                    <input className={styles['create-invoice-div-input']} type='text' name={`TotalAmount-${item.id}`} placeholder='Enter the total amount' />
                                </div>
                            </form>
                            {formItems.length > 1 && (
                                <div className={styles['create-invoice-close-btn']} onClick={() => removeFormItem(item.id)}>
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                    ))}





                    {/* <div className={styles['create-invoice-add-item-cont']}>
                        <span className={styles['create-invoice-add-tem-button'] } onClick={addFormItem}>Add More</span>
                    </div> */}
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}> </div>
                    <form className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>VAT @ 20%</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the vat @ 20%' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Total Payable Amount </label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the total payable amount ' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Account Number</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the account number' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Sort Code</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='Name' placeholder='Enter the sort code' />
                        </div>
                    </form>
                </div>
                <div className={styles['craete-invoices-button']}>
                    <div className={styles['create-invoices-cancel']}>Cancel</div>
                    <div className={styles['create-invoices-submit']}>Create Invoice</div>
                </div>
            </div>
        </>
    )
}
export default CreateInvoice