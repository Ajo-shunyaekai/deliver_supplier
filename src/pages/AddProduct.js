import React, { useState, useEffect } from 'react';
import styles from '../style/addproduct.module.css';
import Select, { components } from 'react-select';
import countryList from 'react-select-country-list';
import ImageAddUploader from './ImageAppUploader';
import CloseIcon from '@mui/icons-material/Close';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const MultiSelectOption = ({ children, ...props }) => (
    <components.Option {...props}>
        <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
        />{" "}
        <label>{children}</label>
    </components.Option>
);

// MultiSelectDropdown Component
const MultiSelectDropdown = ({ options, value, onChange }) => {
    return (
        <Select
            options={options}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: MultiSelectOption }}
            onChange={onChange}
            value={value}
        />
    );
};


const AddProduct = () => {
    const formTypes = [
        { value: 'tablet', label: 'Tablet' },
        { value: 'syrup', label: 'Syrup' }
    ];
    const [formSections, setFormSections] = useState([
        {
            strength: '',
            quantity: '',
            typeOfForm: null,
            unitPrice: '',
            estDeliveryTime: ''
        }
    ]);

    const [formData, setFormData] = useState({
        originCountry: ''
    });

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const countryOptions = countryList().getData();
        setCountries(countryOptions);
    }, []);

    // Handle change for the dropdown
    const handleChange = (index, selected) => {
        const newFormSections = [...formSections];
        newFormSections[index].typeOfForm = selected;
        setFormSections(newFormSections);
    };

    // Handle input change
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFormSections = [...formSections];
        newFormSections[index][name] = value;
        setFormSections(newFormSections);
    };

    // Add new form section
    const addFormSection = () => {
        setFormSections([
            ...formSections,
            {
                strength: '',
                quantity: '',
                typeOfForm: null,
                unitPrice: '',
                estDeliveryTime: ''
            }
        ]);
    };

    // Remove form section
    const removeFormSection = (index) => {
        if (formSections.length > 1) {
            const newFormSections = formSections.filter((_, i) => i !== index);
            setFormSections(newFormSections);
        }
    };


    const handleOperationCountriesChange = (selectedOptions) => {
        setFormData({
          ...formData,
          operationCountries: selectedOptions
        });
      };

      const getDropdownButtonLabel = ({ placeholderButtonLabel, value }) => {
        if (value && value.length) {
            return value.map(country => country.label).join(', ');
        }
        return placeholderButtonLabel;
    };


    return (
        <>
            <div className={styles['create-invoice-container']}>
                <div className={styles['create-invoice-heading']}>Add Product</div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Product Details</div>
                    <form className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Product Name </label>
                            <input className={styles['create-invoice-div-input']} type='text' name='productName' placeholder='Enter the product name' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Composition</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='composition' placeholder='Enter the composition' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Dossier Type</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='dossierType' placeholder='Enter the dossier type' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Dossier Status</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='dossierStatus' placeholder='Enter the dossier status' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>GMP Approvals</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='gmpApprovals' placeholder='Enter the gmp approvals' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Shipping Time</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='shippingTime' placeholder='Enter the shipping time' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Registered In</label>
                            {countries.length > 0 && (
                                <ReactMultiSelectCheckboxes
                                    className='signup-forms-sections-select custom-multi-select'
                                    options={countries}
                                    value={formData.operationCountries}
                                    onChange={handleOperationCountriesChange}
                                    getDropdownButtonLabel={getDropdownButtonLabel}
                                    style={{width:'100%!important'}}
                                />
                            )}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Tags</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='tags' placeholder='Enter the tags' />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Available For</label>
                            <input className={styles['create-invoice-div-input']} type='text' name='availableFor' placeholder='Enter the available countries' />
                        </div>
                        <div className={styles['create-invoice-div-container-description']}>
                            <label className={styles['create-invoice-div-label']}>Product Description</label>
                            <textarea
                                className={styles['create-invoice-div-input']}
                                name="description"
                                rows="4"
                                cols="50"
                                placeholder='Enter the Description'
                            />
                        </div>
                    </form>
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-add-item-cont']}>
                        <div className={styles['create-invoice-form-heading']}>Product Inventory</div>
                        <span className={styles['create-invoice-add-item-button']} onClick={addFormSection}>Add More</span>
                    </div>
                    {formSections.map((section, index) => (
                        <form className={styles['craete-invoice-form']} key={index}>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Strength</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='strength'
                                    placeholder='Enter the strength'
                                    value={section.strength}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Quantity</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='quantity'
                                    placeholder='Enter the quantity'
                                    value={section.quantity}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Type of form</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    value={section.typeOfForm}
                                    onChange={(selected) => handleChange(index, selected)}
                                    options={formTypes}  // Use formTypes instead of countries
                                    placeholder="Select the form type"
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='unitPrice'
                                    placeholder='Enter the unit price'
                                    value={section.unitPrice}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Est. Delivery Time</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='estDeliveryTime'
                                    placeholder='Enter the est. delivery time'
                                    value={section.estDeliveryTime}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            {formSections.length > 1 && (
                                <div className={styles['create-invoice-div-container']}>
                                    <div className={styles['craete-add-cross-icon']} onClick={() => removeFormSection(index)}>
                                        <CloseIcon />
                                    </div>
                                </div>
                            )}
                        </form>
                    ))}
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Product Image</div>
                    <form className={styles['craete-invoice-form']}>
                        <ImageAddUploader />
                    </form>
                </div>

                <div className={styles['craete-invoices-button']}>
                    <div className={styles['create-invoices-cancel']}>Cancel</div>
                    <div className={styles['create-invoices-submit']}>Add Product</div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
