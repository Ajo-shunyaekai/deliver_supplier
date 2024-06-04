import React, { useState, useEffect } from 'react';
// import styles from './countryDetails.module.css';
import styles from '../style/countryDetails.module.css';

const CountryDetails = () => {
    // State to store the fetched country data
    const [countries, setCountries] = useState([]);
    const limit = 5; // Limiting the rendering to 5 items

    // Function to fetch country data from the API
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    };

    // Fetch country data when the component mounts
    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <>
            <ul className={styles.container}>
                {countries.slice(0, limit).map(country => (
                    <li key={country.name.common}>
                        <h6>{country.name.common}</h6>
                        {country.flags && country.flags.svg && (
                            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ width: '20px', height: 'auto' }} />
                        )}
                    </li>
                ))}
            </ul>
        </ >
    );
}

export default CountryDetails;
