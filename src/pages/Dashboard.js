import React, { useEffect, useState } from 'react';
import WorldMap from "react-svg-worldmap";
import { Link, useNavigate } from 'react-router-dom';
import dashboards from '../style/dashboard.css'
import trending from "../assest/dashboard/trendingup.svg"
import Arrow from "../assest/dashboard/arrow.svg"
import Form from 'react-bootstrap/Form';
import ThreeDot from '../assest/dashboard/three-dot.svg'
import LineChart from '../pages/chart/LineChart'
import ProgressBar from '../pages/chart/ProgressBar';
import OrangeBar from '../pages/chart/OrangeBar'
import PinkBar from '../pages/chart/PinkBar'
import CircularBar from '../pages/chart/CircularBar';
import WeeklyBar from '../pages/chart/WeeklyBar';
import MonthlyBar from '../pages/chart/MonthlyBar';
import ConversionChart from '../pages/chart/ConversionChart';
import SearchEngineChart from '../pages/chart/SearchEngineChart'
import DirectlyChart from '../pages/chart/DirectlyChart'
import { postRequestWithToken } from '../api/Requests';
import {countryToCodeMapping, convertCountryToCode} from '../assest/countryCodes/countryCode'


const Dashboard = () => {
    const navigate = useNavigate()

    const [countryData, setCountryData]     = useState([]);
    const [orderSummary, setOrderSummary]   = useState()
    const [sellerCountry, setSellerCountry] = useState()
    const [activeButton, setActiveButton]   = useState('1h');

    const handleButtonClick = (value) => {
        setActiveButton(value);
    };

    useEffect(() => {
        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/login");
        return;
        }

        const obj = {
            supplier_id : supplierIdSessionStorage || supplierIdLocalStorage
        }

        postRequestWithToken('supplier/orders-buyer-country', obj, async (response) => {
            if (response.code === 200) {
                setSellerCountry(response?.result)
                const convertedData = convertCountryToCode(response?.result);
                setCountryData(convertedData);
            } else {
               console.log('error in orders-buyer-country api',response);
            }
        })
    },[])

    useEffect(() => {

        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/login");
        return;
        }

        const obj = {
            supplier_id  : supplierIdSessionStorage || supplierIdLocalStorage,
            user_type    : 'supplier'
        }

        postRequestWithToken('supplier/orders-summary-details', obj, async (response) => {
            if (response.code === 200) {
                setOrderSummary(response?.result)
            } else {
               console.log('error in orders-summary-details api',response);
            }
        })
    },[])

    return (
        <>
            <div className='dashboard-section'>
                <div className='dashboard-heading'>Dashboard</div>
                <div className='analystic-button' >
                    <div className='buttons'>Analytics</div>
                </div>
                {/* start the card container */}
                <div className='cart-main-container'>
                    <div className='cart-left-main-container'>
                        <div className='cart-left-top-section'>
                            <div className='cart-top-right-section'>
                                <div className='top-container'>
                                    <Link to='/order-requests'>
                                        <div className='top-content-section'>
                                            <div className='top-head'>Order Request</div>
                                            <div className='top-text'>{orderSummary?.completedCount[0]?.count || 100}</div>
                                        </div>
                                    </Link>
                                    <Link to='/ongoing-orders'>
                                        <div className='top-content-section'>
                                            <div className='top-head'>Ongoing Orders</div>
                                            <div className='top-text'>{orderSummary?.activeCount[0]?.count || 50}</div>
                                        </div>
                                    </Link>
                                    <Link to='/completed-orders'>
                                        <div className='top-content-section'>
                                            <div className='top-head'>Completed Orders</div>
                                            <div className='top-text'>{orderSummary?.pendingCount[0].count || 20}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='bottom-container'>
                                    <Link to='/invoice/pending'>
                                        <div className='bottom-cart-cont'>
                                            <div className='bottom-head'>Pending Invoices:<span className='bottom-text'> 65</span></div>
                                            <div className='bottom-graph'>
                                                <ProgressBar />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/invoice/paid'>
                                        <div className='bottom-cart-cont'>
                                            <div className='bottom-head'> Completed Invoices:<span className='bottom-text'> 25</span></div>
                                            <div className='bottom-graph'>
                                                <OrangeBar />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className='cart-top-left-section'>
                                <div className='left-head'>Total Sales Amount</div>
                                <div className='circular-process'>
                                    <CircularBar totalSalesAmount = {orderSummary?.totalPurchaseAmount[0].total_purchase} />
                                </div>
                            </div>
                        </div>
                        <div className='cart-left-bottom-section'>
                            <div className='cart-left-bottom-container'>
                                <div className='left-bottom-cart-top'>
                                    <span className='left-bottom-pert'>30</span>
                                    <span className='left-bottom-plus'>+3.5</span>
                                </div>
                                <div className='left-bottom-head'>Weekly Sales</div>
                                <div className='line-chart-graph'>
                                    <ConversionChart />
                                </div>
                            </div>
                            <div className='cart-left-bottom-container'>
                                <div className='left-bottom-cart-top'>
                                    <span className='left-bottom-pert'>25</span>
                                    <span className='left-bottom-plus'>-2.0</span>
                                </div>
                                <div className='left-bottom-head'>Monthly Sales</div>
                                <div className='line-chart-graph'>
                                    <SearchEngineChart />
                                </div>
                            </div>
                            <div className='cart-left-bottom-container'>
                                <div className='left-bottom-cart-top'>
                                    <span className='left-bottom-pert'>40</span>
                                    <span className='left-bottom-plus'>+4.5</span>
                                </div>
                                <div className='left-bottom-head'>Yearly Sales</div>
                                <div className='line-chart-graph'>
                                    <DirectlyChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cart-right-main-container'>
                        <div className='map-container'>
                            <WorldMap
                                color="red"
                                value-suffix="people"
                                size="sm"
                                data={countryData}
                            />
                        </div>
                        <div className='right-head'>Your buyer countries</div>
                        <div className='right-country-section'>
                            <div className='country-sect'>
                                <span className='country-names'>{countryData[0]?.country}</span>
                                <span className='country-price'>{countryData[0]?.value} AED</span>
                            </div>
                            <div className='country-sect'>
                                <span className='country-name'>{countryData[1]?.country}</span>
                                <span className='country-price'>{countryData[1]?.value} AED</span>
                            </div>
                            {/* <div className='country-sect'>
                                <span className='country-name'>India</span>
                                <span className='country-price'>$1234</span>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* end the card conatiner */}
                {/* start the bottom container */}
                {/* <div className='main-bottom-cart-container'>
                    <div className='bottom-section-left-cont'>
                        <div className='bottom-first-sections'>
                            <div className='bottom-img-cont'>
                                <img src={trending} />
                            </div>
                            <div className='bottom-text-cont'>
                                <div className='bottom-text-head'>Weekly top sell</div>
                                <div className='bottom-text-pect'>+ 2.50%</div>
                            </div>
                        </div>
                        <div className='bottom-arrow-cont'>
                            <img src={Arrow} />
                        </div>
                    </div>
                    <div className='bottom-section-right-cont'>
                        <div className='bottom-cont-left-sec'>
                            <div className='bottom-cont-left-head'>Task statistics</div>
                            <div className='bottom-cont-left-cart'>
                                <div className='bottom-cont-left-one'>
                                    <div className='bottom-cont-left-text'>52</div>
                                    <div className='bottom-cont-left-num'>Tasks</div>
                                </div>
                                <div className='bottom-cont-left-one'>
                                    <div className='bottom-cont-left-texts'>+15</div>
                                    <div className='bottom-cont-left-num'>Added</div>
                                </div>
                                <div className='bottom-cont-left-one'>
                                    <div className='bottom-cont-left-text'>45.5%</div>
                                    <div className='bottom-cont-left-num'>Remain</div>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-cont-right-sec'>
                            <div className='bottom-cont-right-sec-head'>This week</div>
                            <div className='bottom-cont-right-sec-completion'>
                                <div className='bottom-cont-right-sections-head'>Task completion</div>
                                <div className='bottom-cont-right-sect-progress'> <PinkBar /> <span className='bottom-cont-right-cont-pinkbar'>65%</span> </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* end the botom container */}
                {/* start the graph container */}
                {/* <div className='graph-main-container'>
                    <div className='graph-left-container'>
                        <div className='graph-top-left-cont'>
                            <div className='graph-top-weekly'>
                                <div className='graph-topweekly-circu-bar'>
                                    <WeeklyBar />
                                </div>
                                <div className='graph-topweekly-head'>Weekly</div>
                            </div>
                            <div className='graph-top-weekly'>
                                <div className='graph-topweekly-circu-bar'>
                                    <MonthlyBar />
                                </div>
                                <div className='graph-topweekly-head'>Monthly</div>
                            </div>
                        </div>
                        <div className='graph-bottom-left-cont'>
                            <div className='graph-toogle-section'>
                                <div className='graph-toogle-head'>
                                    <div className='graph-toogle-main-text'>Upcoming tasks</div>
                                    <div className='graph-toogle-content'>Active: 9</div>
                                </div>
                                <div className='graph-toggle-button'>
                                    <label className={`btn ${activeButton === '1h' ? 'active' : ''}`} onClick={() => handleButtonClick('1h')}>
                                        <input type="radio" name="options" /> 1h
                                    </label>
                                    <label className={`btn ${activeButton === '1d' ? 'active' : ''}`} onClick={() => handleButtonClick('1d')}>
                                        <input type="radio" name="options" /> 1d
                                    </label>
                                </div>
                            </div>
                            <div className='graph-checkbox-main-container'>
                                <div className='graph-check-section'>
                                    <div className='graph-checkbox'>
                                        <label className='checkbox-label'>
                                            <input type="checkbox" onChange={() => { }} />
                                            <span className='checkbox-heading-graph'>Html5 dashboard conference</span>
                                            <span className='checkbox-heading-graph-light'>Less than a month till we head over to...</span>
                                        </label>
                                    </div>
                                    <div className='graph-check-icon'>
                                        <img src={ThreeDot} />
                                    </div>
                                </div>
                                <div className='graph-check-section'>
                                    <div className='graph-checkbox'>
                                        <label className='checkbox-label'>
                                            <input type="checkbox" onChange={() => { }} />
                                            <span className='checkbox-heading-graph'>Html5 dashboard conference</span>
                                            <span className='checkbox-heading-graph-light'>Less than a month till we head over to...</span>
                                        </label>
                                    </div>
                                    <div className='graph-check-icon'>
                                        <img src={ThreeDot} />
                                    </div>
                                </div>
                                <div className='graph-check-section'>
                                    <div className='graph-checkbox'>
                                        <label className='checkbox-label'>
                                            <input type="checkbox" onChange={() => { }} />
                                            <span className='checkbox-heading-graph'>Html5 dashboard conference</span>
                                            <span className='checkbox-heading-graph-light'>Less than a month till we head over to...</span>
                                        </label>
                                    </div>
                                    <div className='graph-check-icon'>
                                        <img src={ThreeDot} />
                                    </div>
                                </div>
                                <div className='graph-check-section'>
                                    <div className='graph-checkbox'>
                                        <label className='checkbox-label'>
                                            <input type="checkbox" onChange={() => { }} />
                                            <span className='checkbox-heading-graph'>Html5 dashboard conference</span>
                                            <span className='checkbox-heading-graph-light'>Less than a month till we head over to...</span>
                                        </label>
                                    </div>
                                    <div className='graph-check-icon'>
                                        <img src={ThreeDot} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='graph-right-container'>
                        <LineChart />
                    </div>
                </div> */}
                {/* end the graph container */}
            </div>
        </>
    )
}

export default Dashboard