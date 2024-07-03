import React, { useState, useEffect } from 'react';
import styles from '../style/addproduct.module.css';
import Select, { components } from 'react-select';
import countryList from 'react-select-country-list';
import ImageAddUploader from './ImageAppUploader';
import CloseIcon from '@mui/icons-material/Close';
import AddPdfUpload from './AddPdfUpload';
import { postRequestWithTokenAndFile } from '../api/Requests';
import { useNavigate } from 'react-router-dom';


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

    const navigate = useNavigate()

    const productTypeOptions = [
        { value: 'new_product', label: 'New Product' },
        { value: 'secondary_market', label: 'Secondary Market' }
    ];

    const formTypesOptions = [
        { value: 'tablet', label: 'Tablet' },
        { value: 'syrup', label: 'Syrup' }
    ];
    const conditionOptions = [
        { value: 'new', label: 'New' },
        { value: 'used', label: 'Used' },
        { value: 'refurbished', label: 'Refurbished' }
    ];

    const quantityOptions = [
        { value: '0-500', label: '0-500' },
        { value: '500-1000', label: '500-1000' },
        { value: '1000-2000', label: '1000-2000' },
        { value: '2000-5000', label: '2000-5000' },
    ];

    const productCategoryOptions = [
        { value: 'generies', label: 'Generies' },
        { value: 'orignals', label: 'Orignals' },
        { value: 'biosimilars', label: 'Biosimilars' },
        { value: 'medicaldevices', label: 'Medical Devices' },
        { value: 'nutraceuticals', label: 'Nutraceuticals' }
    ];

    const [productType, setProductType] = useState( { value: 'new_product', label: 'New Product' },);
    const [formType, setFormType] = useState()
    const [productCategory, setProductCategory] = useState()
    const [countryOfOrigin, setCountryOfOrigin] = useState()
    const [registeredCountries, setRegisteredCountries] = useState()
    const [availableCountries, setAvailableCountries] = useState([])
    const [countries, setCountries] = useState([]);
    const [medicineImages, setMedicineImages] = useState()
    const [invoiceImages, setInvoiceImages] = useState()
    

    const [errors, setErrors]     = useState({});
    const [formData, setFormData] = useState({
        productName : '',
        productType : productType,
        composition  : '',
        strength : '',
        typeOfForm : '',
        shelfLife : '',
        dossierType : '',
        dossierStatus : '',
        productCategory : '',
        totalQuantity : '',
        gmpApprovals : '',
        shippingTime : '',
        originCountry : '',
        registeredIn : '',
        availableFor : '',
        tags : '',
        description : '', 
        product_image : medicineImages,
        invoice_image : invoiceImages,
        //for secondary market
        purchasedOn : '',
        minPurchaseUnit : '',
        countryAvailableIn : ''


    })

    useEffect(() => {
        const countryOptions = countryList().getData();
        setCountries(countryOptions);
    }, []);

    const handleConditionChange = (index, selected) => {
        const newFormSections = [...formSections];
        newFormSections[index].condition = selected;
        // setFormSections(newFormSections);
        setErrors(prevErrors => ({
            ...prevErrors,
            [`condition${index}`]: ''
        }));

        const conditions = newFormSections.map(section => section.condition);

    setFormData({
        ...formData,
        condition : conditions
    });

        setFormSections(newFormSections);
    };

    const handleQuantityChange = (index, selected) => {
        
        if(productType.label === 'New Product') {
            const newFormSections = [...formSections];
        newFormSections[index].quantity = selected;

        setErrors(prevErrors => ({
            ...prevErrors,
            [`quantity${index}`]: ''
        }));

        const quantities = newFormSections.map(section => section.quantity);

    setFormData({
        ...formData,
        quantity : quantities
    });

        setFormSections(newFormSections);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFormSections = [...formSections];
        newFormSections[index][name] = value;
        setFormSections(newFormSections);
    
        if (value.trim() === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                [`${name}${index}`]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            }));
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [`${name}${index}`]: ''
            }));

            if(productType.label === 'New Product') {
                const unitPrices = newFormSections.map(section => section.unitPrice);
                const totalPrices = newFormSections.map(section => section.totalPrice);
                const estDeliveryTimes = newFormSections.map(section => section.estDeliveryTime);

            setFormData({
                ...formData,
                unitPrice : unitPrices ,
                totalPrice : totalPrices,
                estDeliveryTime : estDeliveryTimes
            });
            } else {
                const unitPrices = newFormSections.map(section => section.unitPricee);
                const quantities = newFormSections.map(section => section.quantityNo)

                setFormData({
                    ...formData,
                    unitPricee : unitPrices ,
                    quantityNo : quantities ,
                    // estDeliveryTime : estDeliveryTimes
                });
            }

        setFormSections(newFormSections);
        }
    };
    
    const addFormSection = () => {
        let newProductValid = true;
        let secondaryMarketValue = true;

        if(productType && productType.label === 'New Product') {
            formSections.forEach((section, index) => {
                if (!section.quantity || !section.unitPrice || !section.totalPrice || !section.estDeliveryTime) {
                    newProductValid = false;
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [`quantity${index}`]: !section.quantity ? 'Quantity is required' : '',
                        [`unitPrice${index}`]: !section.unitPrice ? 'Unit Price is required' : '',
                        [`totalPrice${index}`]: !section.totalPrice ? 'Total Price is required' : '',
                        [`estDeliveryTime${index}`]: !section.estDeliveryTime ? 'Estimated Delivery Time is required' : '',
                        
                    }));
                }
            });
           
    
            if (newProductValid && productType.label === 'New Product') {
                setFormSections([
                    ...formSections,
                    {
                        id: formSections.length,
                        // strength: '',
                        quantity: null,
                        typeOfForm: null,
                        totalPrice: '',
                        unitPrice: '',
                        shelfLife: '',
                        estDeliveryTime: '',
                        // condition: ''
                    }
                ]);
                
                setErrors({});
            }
        } else if(productType && productType.label === 'Secondary Market') {

            formSections.forEach((section, index) => {
                if (!section.quantityNo || !section.unitPrice || !section.condition) {
                    secondaryMarketValue = false;
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [`quantityNo${index}`]: !section.quantityNo ? 'Quantity is required' : '',
                        [`unitPricee${index}`]: !section.unitPricee ? 'Unit Price is required' : '',
                        [`condition${index}`]: !section.condition ? 'Condition is required' : '',
                        
                    }));
                }
            });


            if (secondaryMarketValue && productType.label === 'Secondary Market') {
                setFormSections([
                    ...formSections,
                    {
                        id: formSections.length,
                        // strength: '',
                        quantityNo: '',
                        // typeOfForm: null,
                        // totalPrice: '',
                        unitPricee: '',
                        // shelfLife: '',
                        // estDeliveryTime: '',
                        condition: ''
                    }
                ]);
                setErrors({});
            }
        }  
    };

    const removeFormSection = (index) => {
        if (formSections.length > 1) {
            const newFormSections = formSections.filter((_, i) => i !== index);

            const newQuantities = formData.quantity.filter((_, i) => i !== index);
            const newUnitPrices = formData.unitPrice.filter((_, i) => i !== index);
            const newTotalPrices = formData.totalPrice.filter((_, i) => i !== index);
            const newEstDeliveryTimes = formData.estDeliveryTime.filter((_, i) => i !== index);

            setFormSections(newFormSections);
            setFormData({
                ...formData,
                quantity: newQuantities,
                unitPrice: newUnitPrices,
                totalPrice: newTotalPrices,
                estDeliveryTime: newEstDeliveryTimes
            });
        }
    };
    

    const handleProductTypeChange = (selected) => {
        setProductType(selected);
        // setSelectedCompanyType(selectedOption);
        setFormData(prevState => ({ ...prevState, productType: selected}));
        if (!selected) {
            setErrors(prevState => ({ ...prevState, productType: 'Product Type is required' }));
        } else {
            setErrors(prevState => ({ ...prevState, productType: '' }));
        }
    };

    const handleFormTypeChange = (selected) => {
       setFormType(selected)
        setFormData(prevState => ({ ...prevState, typeOfForm: selected }));
        if (!selected) {
            setErrors(prevState => ({ ...prevState, typeOfForm: 'Type of form is required' }));
        } else {
            setErrors(prevState => ({ ...prevState, typeOfForm: '' }));
        }
    };
 
    const handleProductCategoryChange = (selected) => {
        setProductCategory(selected)
         setFormData(prevState => ({ ...prevState, productCategory: selected }));
         if (!selected) {
             setErrors(prevState => ({ ...prevState, productCategory: 'Product category is required' }));
         } else {
             setErrors(prevState => ({ ...prevState, productCategory: '' }));
         }
     };

     const handleCountryOriginChange = (selected) => {
        setCountryOfOrigin(selected)
         setFormData(prevState => ({ ...prevState, originCountry: selected }));
         if (!selected) {
             setErrors(prevState => ({ ...prevState, originCountry: 'Country of origin is required' }));
         } else {
             setErrors(prevState => ({ ...prevState, originCountry: '' }));
         }
     };

     const handleRegisteredInChange = (selectedOptions) => {
        const selectedLabels = selectedOptions?.map(option => option.label) || [];
      
        setFormData({
            ...formData,
            registeredIn: selectedOptions
        });

        setRegisteredCountries(selectedOptions)
    
        setErrors(prevState => ({
            ...prevState,
            registeredIn: selectedLabels.length === 0 ? 'Registered in is required' : ''
        }));
     };

     const handleAvailableInChange = (selectedOptions) => {
        const selectedLabels = selectedOptions?.map(option => option.label) || [];

        setFormData({
            ...formData,
            countryAvailableIn: selectedOptions
        });

        setAvailableCountries(selectedOptions)
    
        setErrors(prevState => ({
            ...prevState,
            countryAvailableIn: selectedLabels.length === 0 ? 'Country available in is required' : ''
        }));

     }
    
    const getDropdownButtonLabel = ({ placeholderButtonLabel, value }) => {
        if (value && value.length) {
            return value.map(country => country.label).join(', ');
        }
        return placeholderButtonLabel;
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

   //useEffect to update the invoice images
    useEffect(() => {
        setFormData({
            ...formData,
            invoice_image : invoiceImages
        });
    }, [invoiceImages])

  //useEffect to update the medicineImages
   useEffect(() => {
    setFormData({
        ...formData,
        product_image : medicineImages
    });
   }, [medicineImages])

   //useEffect to update the variables to inital state based on productType
   useEffect(() => {
    if(productType && productType.label === 'New Product') {
        setInvoiceImages([])
        setAvailableCountries()
        setFormData({
            ...formData,
            purchasedOn : '' ,
            minPurchaseUnit : ''
        });
    } else if(productType && productType.label === 'Secondary Market') {
        setFormData({
            ...formData,
            totalQuantity : ''
        });
    }
   }, [productType])

   //validation
    const validateForm = () => {
        let formErrors = {};
    
        if (!formData.productName) formErrors.productName = 'Product name is required';
        if (!productType) formErrors.productType = 'Product type is required';
        if (!formData.composition) formErrors.composition = 'Composition is required';
        if (!formData.strength) formErrors.strength = 'Strength is required';
        if (!formType) formErrors.typeOfForm = 'Type of form is required';
        if (!formData.shelfLife) formErrors.shelfLife = 'Shelf lifeis required';
        if (!formData.dossierStatus) formErrors.dossierStatus = 'Dossier Status is required';
        if (!formData.dossierType) formErrors.dossierType = 'Dossier Type is required';
        if(productType && productType.label === 'New Product') {
            if (!formData.totalQuantity) formErrors.totalQuantity = 'Total quantity is required';
        }
        
        if (!formData.gmpApprovals) formErrors.gmpApprovals = 'Gmp approval is required';
        if (!formData.shippingTime) formErrors.shippingTime = 'Shipping time is required';
        if (!formData.availableFor) formErrors.availableFor = 'Available for is required';
        if (!formData.tags) formErrors.tags = 'Tags are required';
        if (!formData.description) formErrors.description = 'Description is required';
        if (!countryOfOrigin) formErrors.originCountry = 'Country of Origin is required';
        if (!registeredCountries) formErrors.registeredIn = 'Registered in is required';
        if (!productCategory) formErrors.productCategory = 'Product Category is required';

        if(productType && productType.label === 'New Product') {
            formSections.forEach((section, index) => {
                if (!section.quantity) formErrors[`quantity${index}`] = 'Quantity is required';
                if (!section.unitPrice) formErrors[`unitPrice${index}`] = 'Unit Price is required';
                if (!section.totalPrice) formErrors[`totalPrice${index}`] = 'Total Price is required';
                if (!section.estDeliveryTime) formErrors[`estDeliveryTime${index}`] = 'Estimated Delivery Time is required';
            });
        } else if(productType && productType.label === 'Secondary Market') {
            formSections.forEach((section, index) => {
                if (!section.quantityNo) formErrors[`quantityNo${index}`] = 'Quantity is required';
                if (!section.unitPricee) formErrors[`unitPricee${index}`] = 'Unit Price is required';
                if (!section.condition) formErrors[`condition${index}`] = 'Condition is required';
            });
        }

        if(formData.product_image?.length === 0) formErrors.medicineImage = 'Medicine Image is required';
        
        

        if(productType && productType.label === 'Secondary Market') {
            if (!availableCountries) formErrors.countryAvailableIn = 'Country available in is required';
            if (!formData.purchasedOn) formErrors.purchasedOn = 'Purchased on is required';
            if (!formData.minPurchaseUnit) formErrors.minPurchaseUnit = 'Min. purchase unit is required';
            if(invoiceImages?.length === 0 || formData.invoice_image === undefined) formErrors.invoiceImage = 'Invoice Image is required';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }
    

    const [formSections, setFormSections] = useState([
        {
            strength: '',
            quantity: null,
            typeOfForm: null,
            productCategory: null,
            unitPrice: '',
            estDeliveryTime: '',
            condition: '',
            quantityNo : '',
            unitPricee : ''
        }
    ]);

    const handleSubmit = (e) => {

        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/login");
        return;
        }
        e.preventDefault()

        if(validateForm()) {
            
            const newFormData       = new FormData()
            const secondaryFormData = new FormData()

            const registered = formData.registeredIn?.map(country => {
                return country ? country.label : '';
            }) || [];

            console.log('formData', formData);
            if(productType && productType.label === 'New Product') {

                const quantities = formData.quantity?.map(qty => {
                    return qty ? qty?.label : ''
                })
                
                newFormData.append('supplier_id', supplierIdSessionStorage || supplierIdLocalStorage);
                newFormData.append('medicine_name', formData.productName);
                newFormData.append('product_type', 'new');
                newFormData.append('composition', formData.composition);
                newFormData.append('strength', formData.strength);
                newFormData.append('type_of_form', formData.typeOfForm?.label);
                newFormData.append('shelf_life', formData.shelfLife);
                newFormData.append('dossier_type', formData.dossierType);
                newFormData.append('dossier_status', formData.dossierStatus);
                newFormData.append('product_category', formData.productCategory?.label);
                newFormData.append('total_quantity', formData.totalQuantity);
                newFormData.append('gmp_approvals', formData.gmpApprovals);
                newFormData.append('shipping_time', formData.shippingTime);
                newFormData.append('country_of_origin', countryOfOrigin?.label);
                // newFormData.append('registered_in', registered);
                registered.forEach(item => newFormData.append('registered_in[]', item));
                newFormData.append('available_for', formData.availableFor);
                newFormData.append('tags', formData.tags);
                newFormData.append('description', formData.description);
                // newFormData.append('quantity[]', formData.quantity);
                quantities.forEach(item => newFormData.append('quantity[]', item));
                // newFormData.append('unit_price', formData.unitPrice.join(','));
                // newFormData.append('total_price', formData.totalPrice.join(','));
                // newFormData.append('est_delivery_days', formData.estDeliveryTime.join(','));
                formData.unitPrice.forEach(price => newFormData.append('unit_price[]', price));
                formData.totalPrice.forEach(price => newFormData.append('total_price[]', price));
                formData.estDeliveryTime.forEach(time => newFormData.append('est_delivery_days[]', time));
                Array.from(formData.product_image).forEach(file => newFormData.append('product_image', file));

                postRequestWithTokenAndFile('/medicine/add-medicine', newFormData, async (response) => {
                    if(response.code === 200) {
                       
                    } else {
                        console.log('error in new  /medicine/add-medicine');
                    }
                })

            } else if(productType && productType.label === 'Secondary Market') {
                const countryLabels = formData.countryAvailableIn?.map(country => {
                    return country ? country.label : '';
                }) || [];

                // const countryLabels = formData.countryAvailableIn.map(country => country.label).join(', ');
                
                secondaryFormData.append('supplier_id', supplierIdSessionStorage || supplierIdLocalStorage);
                secondaryFormData.append('medicine_name', formData.productName);
                secondaryFormData.append('product_type', 'secondary market');
                secondaryFormData.append('purchased_on', formData.purchasedOn);
                // secondaryFormData.append('country_available_in', formData.countryAvailableIn);
                countryLabels.forEach(item => secondaryFormData.append('country_available_in[]', item));
                secondaryFormData.append('strength', formData.strength);
                secondaryFormData.append('min_purchase_unit', formData.minPurchaseUnit);
                
                secondaryFormData.append('composition', formData.composition);
                secondaryFormData.append('type_of_form', formData.typeOfForm?.label);
                secondaryFormData.append('shelf_life', formData.shelfLife);
                secondaryFormData.append('dossier_type', formData.dossierType);
                secondaryFormData.append('dossier_status', formData.dossierStatus);
                secondaryFormData.append('product_category', formData.productCategory?.label);
                // newFormData.append('total_quantity', formData.totalQuantity);
                secondaryFormData.append('gmp_approvals', formData.gmpApprovals);
                secondaryFormData.append('shipping_time', formData.shippingTime);
                secondaryFormData.append('country_of_origin', countryOfOrigin?.label);
                // secondaryFormData.append('registered_in', formData.registeredIn);
                registered.forEach(item => secondaryFormData.append('registered_in[]', item));
                secondaryFormData.append('available_for', formData.availableFor);
                secondaryFormData.append('tags', formData.tags);
                secondaryFormData.append('description', formData.description);
                // secondaryFormData.append('quantity', formData.quantityNo);
                secondaryFormData.append('quantity', formData.quantityNo.join(','));
                secondaryFormData.append('unit_price', formData.unitPricee);
                // secondaryFormData.append('condition', formData.condition);
                secondaryFormData.append('condition', formData.condition[0].value);
                // if (formData.condition && formData.condition.length > 0) {
                //     formData.condition.forEach((condition, index) => {
                //         secondaryFormData.append(`condition[${index}]`, condition.value);
                //     });
                // }
                
                Array.from(formData.product_image).forEach(file => secondaryFormData.append('product_image', file));
                Array.from(formData.invoice_image).forEach(file => secondaryFormData.append('invoice_image', file));

                postRequestWithTokenAndFile('/medicine/add-medicine', secondaryFormData, async (response) => {
                    if(response.code === 200) {
                        window.alert()
                    } else {
                        console.log('error in secondary  /medicine/add-medicine');
                    }
                })
            }
        } else {
            console.log('errorrrrr');
            console.log(formData);
        }
    }

    return (
        <>
            <div className={styles['create-invoice-container']}>
                <div className={styles['create-invoice-heading']}>Add Product</div>
                <div className={styles['create-invoice-section']}>
                    <form className={styles['craete-invoice-form']}  onSubmit={handleSubmit}>

                        {/* details section */}
                        <div className={styles['create-invoice-inner-form-section']}>
                            <div className={styles['create-invoice-add-item-cont']}>
                                <div className={styles['create-invoice-form-heading']}>Product Details</div>
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Product Name</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='productName'
                                    placeholder='Enter Product Name'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                              {errors.productName && <div className='add-product-errors'>{errors.productName}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Product Type</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    value={productType}
                                    onChange={handleProductTypeChange}
                                    options={productTypeOptions}
                                    placeholder="Select Product Type"
                                    name = 'productType'
                                />
                                {errors.productType && <div className='add-product-errors'>{errors.productType}</div>}
                            </div>

                            {productType && productType.value === 'secondary_market' && (
                                <>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Purchased On</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name='purchasedOn'
                                            placeholder='Enter Purchased On'
                                            autoComplete='off'
                                            onChange={handleChange}
                                        />
                                        {errors.purchasedOn && <div className='add-product-errors'>{errors.purchasedOn}</div>}
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Country Available In</label>
                                        <MultiSelectDropdown
                                            options={countries}
                                            placeholderButtonLabel="Select Countries"
                                            onChange={handleAvailableInChange}
                                            getDropdownButtonLabel={getDropdownButtonLabel}
                                        />
                                        {errors.countryAvailableIn && <div className='add-product-errors'>{errors.countryAvailableIn}</div>}
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Minimum Purchase Unit</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name='minPurchaseUnit'
                                            placeholder='Enter Min Purchase Unit'
                                            autoComplete='off'
                                            onChange={handleChange}
                                        />
                                        {errors.minPurchaseUnit && <div className='add-product-errors'>{errors.minPurchaseUnit}</div>}
                                    </div>
                                </>
                            )}
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Composition</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='composition'
                                    placeholder='Enter Composition'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                                {errors.composition && <div className='add-product-errors'>{errors.composition}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Strength</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='strength'
                                    placeholder='Enter Strength'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                                {errors.strength && <div className='add-product-errors'>{errors.strength}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Type of form</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    value={formType}
                                    options={formTypesOptions}
                                    onChange={handleFormTypeChange}
                                    placeholder="Select Type of Form"
                                    name='typeOfForm'
                                />
                                {errors.typeOfForm && <div className='add-product-errors'>{errors.typeOfForm}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Shelf Life</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='shelfLife'
                                    placeholder='Enter Shelf Life'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                                {errors.shelfLife && <div className='add-product-errors'>{errors.shelfLife}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Dossier Type</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='dossierType'
                                    placeholder='Enter Dossier Type'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                                {errors.dossierType && <div className='add-product-errors'>{errors.dossierType}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Dossier Status</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='dossierStatus'
                                    placeholder='Enter Dossier Status'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                                {errors.dossierStatus && <div className='add-product-errors'>{errors.dossierStatus}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Product Category</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    options={productCategoryOptions}
                                    placeholder="Select Product Category"
                                    name='produtCategory'
                                    onChange={handleProductCategoryChange}
                                />
                                 {errors.productCategory && <div className='add-product-errors'>{errors.productCategory}</div>}
                            </div>
                            {productType && productType.value === 'new_product' && (
                                <>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Total Quantity</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name='totalQuantity'
                                            placeholder='Enter Total Quantity'
                                            autoComplete='off'
                                            onChange={handleChange}
                                        />
                                        {errors.totalQuantity && <div className='add-product-errors'>{errors.totalQuantity}</div>}
                                    </div>
                                </>
                            )}
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>GMP Approvals</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='gmpApprovals'
                                    placeholder='Enter GMP Approvals'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                                {errors.gmpApprovals && <div className='add-product-errors'>{errors.gmpApprovals}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Shipping Time</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='shippingTime'
                                    placeholder='Enter Shipping Time'
                                    onChange={handleChange}
                                />
                                {errors.shippingTime && <div className='add-product-errors'>{errors.shippingTime}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Country of Origin</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    name='originCountry'
                                    options={countries}
                                    placeholder="Select Country of Origin"
                                    autoComplete='off'
                                    onChange={handleCountryOriginChange}
                                />
                                 {errors.originCountry && <div className='add-product-errors'>{errors.originCountry}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Registered In</label>
                                <MultiSelectDropdown
                                    options={countries}
                                    placeholderButtonLabel="Select Countries"
                                    onChange={handleRegisteredInChange}
                                    getDropdownButtonLabel={getDropdownButtonLabel}
                                />
                                {errors.registeredIn && <div className='add-product-errors'>{errors.registeredIn}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Available For</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='availableFor'
                                    placeholder='Enter Available For'
                                    onChange={handleChange}
                                />
                                {errors.availableFor && <div className='add-product-errors'>{errors.availableFor}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Tags</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='tags'
                                    placeholder='Enter Tags'
                                    onChange={handleChange}
                                />
                                 {errors.tags && <div className='add-product-errors'>{errors.tags}</div>}
                            </div>
                            <div className={styles['create-invoice-div-container-description']}>
                                <label className={styles['create-invoice-div-label']}>Product Description</label>
                                <textarea
                                    className={styles['create-invoice-div-input']}
                                    name="description"
                                    rows="4"
                                    cols="50"
                                    placeholder='Enter Description'
                                    onChange={handleChange}
                                />
                                {errors.description && <div className='add-product-errors'>{errors.description}</div>}
                            </div>
                        </div>

                       {/* inventory section */}
                        <div className={styles['create-invoice-inner-form-section']}>
                            <div className={styles['create-invoice-section']}>
                                <div className={styles['create-invoice-add-item-cont']}>
                                    <div className={styles['create-invoice-form-heading']}>Product Inventory</div>
                                    <span className={styles['create-invoice-add-item-button']} onClick={addFormSection}>Add More</span>
                                </div>
                                {formSections.map((section, index) => (
                                    <div className={styles['form-item-container']} >

                                        {productType && productType.value === 'new_product' && (
                                            <div className={styles['create-invoice-new-product-section-containers']}>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Quantity</label>
                                                    <Select
                                                        className={styles['create-invoice-div-input-select']}
                                                        value={section.quantity}
                                                        onChange={(selected) => handleQuantityChange(index, selected)}
                                                        options={quantityOptions}
                                                        placeholder="Select Quantity"
                                                        name='quantity'
                                                    />
                                                     {/* {errors.quantity && <div className='add-product-errors'>{errors.quantity}</div>} */}
                                                     {errors[`quantity${index}`] && <div className='add-product-errors'>{errors[`quantity${index}`]}</div>}

                                                </div>

                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='unitPrice'
                                                        placeholder='Enter Unit Price'
                                                        value={section.unitPrice}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                    {/* {errors.unitPrice && <div className='add-product-errors'>{errors.unitPrice}</div>} */}
                                                    {errors[`unitPrice${index}`] && <div className='add-product-errors'>{errors[`unitPrice${index}`] }</div>}
                                                </div>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Total Price</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='totalPrice'
                                                        placeholder='Enter Total Price'
                                                        value={section.totalPrice}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                     {/* {errors.totalPrice && <div className='add-product-errors'>{errors.totalPrice}</div>} */}
                                                     {errors[`totalPrice${index}`] && <div className='add-product-errors'>{errors[`totalPrice${index}`]}</div>}

                                                </div>

                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Est. Delivery Time</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='estDeliveryTime'
                                                        placeholder='Enter Est. Delivery Time'
                                                        value={section.estDeliveryTime}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                     {/* {errors.estDeliveryTime && <div className='add-product-errors'>{errors.estDeliveryTime}</div>} */}
                                                     {errors[`estDeliveryTime${index}`] &&  <div className='add-product-errors'>{errors[`estDeliveryTime${index}`]}</div>}
                                                </div>
                                               

                                            </div>
                                        )}

                                        {productType && productType.value === 'secondary_market' && (
                                            <div className={styles['create-invoice-new-product-section-containers']}>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Quantity</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='quantityNo'
                                                        placeholder='Enter Quantity'
                                                        value={section.quantityNo}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                    {errors[`quantityNo${index}`] && <div className='add-product-errors'>{errors[`quantityNo${index}`]}</div>}
                                                </div>

                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='unitPricee'
                                                        placeholder='Enter Unit Price'
                                                        value={section.unitPricee}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                     {errors[`unitPricee${index}`] && <div className='add-product-errors'>{errors[`unitPricee${index}`]}</div>}
                                                </div>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Condition</label>
                                                    <Select
                                                        className={styles['create-invoice-div-input-select']}
                                                        value={section.condition}
                                                        onChange={(selected) => handleConditionChange(index, selected)}
                                                        options={conditionOptions}
                                                        placeholder="Select Condition"
                                                    />
                                                    {errors[`condition${index}`] && <div className='add-product-errors'>{errors[`condition${index}`]}</div>}
                                                </div>
                                            </div>
                                        )}
                                        {formSections.length > 1 && (
                                            <div className={styles['craete-add-cross-icon']} onClick={() => removeFormSection(index)}>
                                                <CloseIcon />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* image upload section */}
                        <div className={styles['create-invoice-inner-form-section']}>
                            <div className={styles['create-invoice-product-image-section']}>
                                <div className={styles['create-invoice-upload-purchase']}>
                                    <div className={styles['create-invoice-form-heading']}>Upload Product Image</div>
                                    <ImageAddUploader 
                                    image={medicineImages}
                                    setImage={setMedicineImages}
                                    />
                                    {!medicineImages || errors.product_image && <div className='add-product-errors'>{errors.medicineImage}</div>}
                                </div>
                                {productType && productType.value === 'secondary_market' && (
                                    <>
                                        <div className={styles['create-invoice-upload-purchase']}>
                                            <div className={styles['create-invoice-form-heading']}>Upload Purchase Invoice</div>
                                            <AddPdfUpload 
                                            invoiceImage = {invoiceImages}
                                            setInvoiceImage = {setInvoiceImages}
                                            />
                                            {!invoiceImages || errors.invoice_image && <div className='add-product-errors'>{errors.invoiceImage}</div>}
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>

                        <div className={styles['craete-invoices-button']}>
                            <div className={styles['create-invoices-cancel']}>Cancel</div>
                            <button type='submit' className={styles['create-invoices-submit']}>Add Product</button>
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
};

export default AddProduct;
