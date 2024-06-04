import React, { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import signup from '../style/signup.css';
import logo from '../assest/signup.svg';
import ImageUploader from './ImageUploader';
import SuccessModal from './SuccessModal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { postRequest, postRequestF, postRequestWithToken } from '../api/Requests';

const SignUp = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone: '',
        contactPersonName: '',
        designation: '',
        email: '',
        mobile: '',
        paymentterms: '',
        delivertime: '',
        tags: '',
        originCountry: '',
        operationCountries: [],
        companyLicenseNo: '',
        companyTaxNo: '',
        description: '',
        taxImage: null, 
        taxImageType: 'tax',
        logoImage: null,
        logoImageType: 'logo', 
        licenseImage: null, 
        licenseImageType: 'license'
        
    });

    const [errors, setErrors]             = useState({});
    const [isChecked, setIsChecked]       = useState(false);
    const [showModal, setShowModal]       = useState(false);
    const [countries, setCountries]       = useState([]);
    const [companyPhone, setCompanyPhone] = useState('');
    const [mobile, setMobile]             = useState('');

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

    const handleImageUpload = (hasImage, file, imageType) => {
        setFormData({
          ...formData,
          [`${imageType}Image`]: hasImage ? file : null, 
        });

        setErrors(prevState => ({
            ...prevState,
            [`${imageType}Image`]: !hasImage ? `${imageType} image is required` : '', // Clear error if image uploaded
          }));

      };

    const handleTagsChange = (event) => {
        const { value } = event.target;
        const tagsArray = value.split(',').map(tag => tag.trim());
        if (tagsArray.length <= 5) {
            setFormData(prevState => ({ ...prevState, tags: value }));
            setErrors(prevState => ({ ...prevState, tags: '' }));
        } else {
            setErrors(prevState => ({ ...prevState, tags: 'You can only enter up to 5 tags' }));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (name === 'description' && value.length > 1000) {
            setErrors(prevState => ({ ...prevState, description: 'Description cannot exceed 1000 characters' }));
        } else {
            setErrors(prevState => ({ ...prevState, [name]: '' }));
        }
    };

    const handlePhoneChange = (name, value) => {
        setErrors(prevState => ({ ...prevState, [name]: '' }));
        if (value.trim() !== '') {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (phoneRegex.test(value)) {
                const countryCode = value.slice(0, value.indexOf('-'));
                const nationalNumber = value.slice(value.indexOf('-') + 1);
                const formattedNumber = `+${countryCode} ${nationalNumber}`;

                setFormData(prevState => ({ ...prevState, [name]: formattedNumber }));
                // setFormData(prevState => ({ ...prevState, [name]: value }));
            } else {
                // setErrors(prevState => ({ ...prevState, [name]: 'Invalid phone number' }));
            }
        }
    };

    const handleOperationCountryChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setFormData(prevState => ({ ...prevState, operationCountries: selectedOptions }));
        setErrors(prevState => ({ ...prevState, operationCountries: '' }));
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) setErrors(prevState => ({ ...prevState, terms: '' }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.companyName) formErrors.companyName                                           = 'Company Name is required';
        if (!formData.companyAddress) formErrors.companyAddress                                     = 'Company Address is required';
        if (!formData.companyEmail) formErrors.companyEmail                                         = 'Company Email ID is required';
        if (formData.companyEmail && !validateEmail(formData.companyEmail)) formErrors.companyEmail = 'Invalid Company Email ID';
        if (!companyPhone) formErrors.companyPhone                                                  = 'Company Phone No. is required';
        if (!formData.contactPersonName) formErrors.contactPersonName                               = 'Contact Person Name is required';
        if (!formData.designation) formErrors.designation                                           = 'Designation is required';
        if (!formData.email) formErrors.email                                                       = 'Email ID is required';
        if (formData.email && !validateEmail(formData.email)) formErrors.email                      = 'Invalid Email ID';
        if (!mobile) formErrors.mobile                                                              = 'Mobile No. is required';
        if (!formData.originCountry) formErrors.originCountry                                       = 'Country of Origin is required';
        if (!formData.operationCountries.length) formErrors.operationCountries                      = 'Country of Operation is required';
        if (!formData.companyLicenseNo) formErrors.companyLicenseNo                                 = 'Company License No. is required';
        if (!formData.companyTaxNo) formErrors.companyTaxNo                                         = 'Company Tax No. is required';
        if (!isChecked) formErrors.terms                                                            = 'You must agree to the terms and conditions';
        if (!formData.paymentterms) formErrors.paymentterms                                         = 'Payment Terms are required';
        if (!formData.delivertime) formErrors.delivertime                                           = 'Estimated Delivery Time is required';
        if (!formData.tags) formErrors.tags                                                         = 'Tags are required';
        if (!formData.description) formErrors.description                                           = 'Description is required';
        if (formData.tags.split(',').map(tag => tag.trim()).length > 5) formErrors.tags             = 'You can only enter up to 5 tags';
        if (formData.description.length > 1000) formErrors.description                              = 'Description cannot exceed 1000 characters';
        if (!formData.taxImage) formErrors.taxImage                                                 = 'Tax image is required'; 
        if (!formData.logoImage) formErrors.logoImage                                               = 'Logo image is required'; 
        if (!formData.licenseImage) formErrors.licenseImage                                         = 'License image is required';

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const regObj = {
                supplier_name           : formData.companyName,
                description             : formData.description,
                supplier_address        : formData.companyAddress,
                supplier_email          : formData.companyEmail,
                supplier_mobile_no      : companyPhone,
                license_no              : formData.companyLicenseNo,
                country_of_origin       : formData.originCountry,
                contact_person_name     : formData.contactPersonName,
                designation             : formData.designation,
                payment_terms           : formData.paymentterms,
                tags                    : formData.tags,
                supplier_image          : formData.logoImage,
                estimated_delivery_time : formData.delivertime,
                license_image           : formData.licenseImage,
                tax_image               : formData.taxImage,
                contact_person_mobile   : mobile,
                contact_person_email    : formData.email,
                country_of_operation    : formData.operationCountries.toString(),
                tax_no                  : formData.companyTaxNo
            }

            postRequestF('supplier/register', regObj, async (response) => {
                if (response.code === 200) {
                    setShowModal(true);
                } else {
                   console.log('error in supplier/register api');
                }
              }) 
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    };

    const handleCloseModal = () => setShowModal(false);

    const formatPhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (phoneNumber) {
            const countryCallingCode = `+${phoneNumber.countryCallingCode}`;
            const nationalNumber = phoneNumber.nationalNumber;
            return `${countryCallingCode} ${nationalNumber}`;
        }
        return value;
    };

    return (
        <>
            <div className='signup-container'>
                <div className='signup-logo-section'>
                    <img src={logo} alt='Signup Logo' />
                </div>
                <div className='signup-form-section'>
                    <div className='signup-form-section-heading'>Registration</div>
                    <form className='signup-form-container' onSubmit={handleFormSubmit}>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Company Name</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="companyName"
                                placeholder="Enter the Company Name"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            {errors.companyName && <div className='signup__errors'>{errors.companyName}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Company Address</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="companyAddress"
                                placeholder="Enter the Company Address"
                                value={formData.companyAddress}
                                onChange={handleChange}
                            />
                            {errors.companyAddress && <div className='signup__errors'>{errors.companyAddress}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Company Email ID</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="companyEmail"
                                placeholder="Enter the Company Email ID"
                                value={formData.companyEmail}
                                onChange={handleChange}
                            />
                            {errors.companyEmail && <div className='signup__errors'>{errors.companyEmail}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Company Phone No.</label>
                            <PhoneInput
                                className='signup-form-section-phone-input'
                                defaultCountry="ae"
                                name="companyPhone"
                                value={companyPhone}
                                // onChange={(value) => {
                                //    const formattedValue = formatPhoneNumber(value);
                                //    setCompanyPhone(formattedValue);
                                //     handlePhoneChange('companyPhone', value);
                                // }}
                                onChange={(value) => {
                                    const formattedValue = formatPhoneNumber(value);
                                    setCompanyPhone(formattedValue);
                                    handlePhoneChange('companyPhone', value);
                                }}
                            />
                            {errors.companyPhone && <div className='signup__errors'>{errors.companyPhone}</div>}
                        </div>

                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Contact Person Name</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="contactPersonName"
                                placeholder="Enter the Contact Person Name"
                                value={formData.contactPersonName}
                                onChange={handleChange}
                            />
                            {errors.contactPersonName && <div className='signup__errors'>{errors.contactPersonName}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Designation</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="designation"
                                placeholder="Enter the Designation"
                                value={formData.designation}
                                onChange={handleChange}
                            />
                            {errors.designation && <div className='signup__errors'>{errors.designation}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Email ID</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="email"
                                placeholder="Enter the Email ID"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className='signup__errors'>{errors.email}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Mobile No.</label>
                            <PhoneInput
                                className='signup-form-section-phone-input'
                                defaultCountry="ae"
                                name="mobile"
                                value={mobile}
                                onChange={(value) => {
                                    const formattedValue = formatPhoneNumber(value);
                                    setMobile(formattedValue);
                                    handlePhoneChange('mobile', value);
                                }}
                                
                            />
                            {errors.mobile && <div className='signup__errors'>{errors.mobile}</div>}
                        </div>

                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Est. Delivery Time</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="delivertime"
                                placeholder="Enter the Delivery Time"
                                value={formData.delivertime}
                                onChange={handleChange}
                            />
                            {errors.delivertime && <div className='signup__errors'>{errors.delivertime}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Tags</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="tags"
                                placeholder="Enter the Tags (comma separated, max 5)"
                                value={formData.tags}
                                onChange={handleTagsChange}
                            />
                            {errors.tags && <div className='signup__errors'>{errors.tags}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Country of Origin</label>
                            <select
                                className='signup-form-section-input'
                                name="originCountry"
                                value={formData.originCountry}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select your country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                            {errors.originCountry && <div className='signup__errors'>{errors.originCountry}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Country of Operation</label>
                            <select
                                className='signup-form-section-input'
                                name="operationCountries"
                                value={formData.operationCountries}
                                onChange={handleOperationCountryChange}
                            >
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                            {errors.operationCountries && <div className='signup__errors'>{errors.operationCountries}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Company License No.</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="companyLicenseNo"
                                placeholder="Enter the License No."
                                value={formData.companyLicenseNo}
                                onChange={handleChange}
                            />
                            {errors.companyLicenseNo && <div className='signup__errors'>{errors.companyLicenseNo}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Company Tax No.</label>
                            <input
                                className='signup-form-section-input'
                                type="text"
                                name="companyTaxNo"
                                placeholder="Enter the Company Tax No."
                                value={formData.companyTaxNo}
                                onChange={handleChange}
                            />
                            {errors.companyTaxNo && <div className='signup__errors'>{errors.companyTaxNo}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Payment Terms</label>
                            <textarea
                                className='signup-form-section-input'
                                type="text"
                                name="paymentterms"
                                rows="4"
                                cols="50"
                                placeholder="Enter the Payment Terms"
                                value={formData.paymentterms}
                                onChange={handleChange}
                            />
                            {errors.paymentterms && <div className='signup__errors'>{errors.paymentterms}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>About Company</label>
                            <textarea
                                className='signup-form-section-input'
                                name="description"
                                rows="4"
                                cols="50"
                                placeholder='Enter the Description'
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && <div className='signup__errors'>{errors.description}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Upload License Image</label>
                            <ImageUploader onUploadStatusChange={handleImageUpload} imageType="license" />
                            {errors.licenseImage && <div className='signup__errors'>{errors.licenseImage}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Upload Tax Image</label>
                             <ImageUploader onUploadStatusChange={handleImageUpload} imageType="tax" />
                             {errors.taxImage && <div className='signup__errors'>{errors.taxImage}</div>}
                        </div>
                        <div className='signup-form-section-div'>
                            <label className='signup-form-section-label'>Upload Company Logo</label>
                            <ImageUploader onUploadStatusChange={handleImageUpload} imageType="logo" />
                            {errors.logoImage && <div className='signup__errors'>{errors.logoImage}</div>}
                        </div>
                        <div className='signup-form-section-checkbox'>
                            <div className='signup-form-inner-section-checkbox'>
                                <label className='signup-form-checkbox-label'>
                                    <input
                                        style={{ width: '20px', height: '20px' }}
                                        className='signup-form-checkbox-input'
                                        type='checkbox'
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            {errors.terms && <div className='signup__errors'>{errors.terms}</div>}
                        </div>
                        <div className='signup-form-cont-button'>
                            <div className='signup-form-button-cancel'>Cancel</div>
                            <button type='submit' className='signup-form-button-submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <SuccessModal show={showModal} handleClose={handleCloseModal} />
        </>
    );
};

export default SignUp;
