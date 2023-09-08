import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Import message from 'antd' for displaying notifications
import { useNavigate } from 'react-router-dom'; // Import useHistory to handle redirection

import '../../assets/css/sb-admin-2.min.css';
import '../../assets/css/partner2.css';
import '../../assets/css/partner.css';
import '../../assets/vendor/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import frozenlogo from '../../assets/images/frozen.png';
import hotlogo from '../../assets/images/hot.png';
import riderlogo from '../../assets/images/rider-logo.png';
import decodeJWT from "jwt-decode";

const Partner = ({ partnerId }) => {
    const navigate = useNavigate(); // Create a history object for redirection
    const [totalRiders, setTotalRiders] = useState(0);
    const [riders, setRiders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRider, setSelectedRider] = useState('');
    const [deliveries, setDeliveries] = useState([]);
    const [inProgressOrders, setInProgressOrders] = useState([]);
    const [assignedDeliveries, setAssignedDeliveries] = useState([]);

    useEffect(() => {
        fetchRiders();
        fetchOrders();
        fetchDeliverOrders();
    }, []);

    useEffect(() => {
        // Check if the token exists and is not expired
        const token = localStorage.getItem('accessToken');
        if (token && !isTokenValid(token)) {
          // Token is expired, remove it from local storage and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('roleName');
          message.error('Your session has timed out. Please login again.');
          navigate('/login'); // Redirect to the login page
        }
      }, [navigate]);
    
      // Define the isTokenValid function
      const isTokenValid = (token) => {
        if (!token) {
          return false;
        }
    
        const decodedToken = decodeJWT(token);
    
        if (!decodedToken.exp) {
          return true;
        }
    
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
      };

    const fetchRiders = () => {
        const token = localStorage.getItem("accessToken");
        const headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get('/preparation/showRiders', { headers }) // Adjust the URL based on your backend API endpoint
            .then(response => {
                setRiders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching riders:', error);
                setLoading(false);
            });
    };

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = {
                Authorization: "Bearer " + token,
            };
            const response = await axios.get('/preparation/partnerOrders', { headers });
            const pending = response.data;
            const inProgress = pending.filter((preparation) => preparation.prepStatus !== 'Approval');
            setInProgressOrders(inProgress);
            // setOrders(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchDeliverOrders = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = {
                Authorization: "Bearer " + token,
            };
            const response = await axios.get('/preparation/deliveries', { headers });

            setDeliveries(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ongoing orders:', error);
        }
    };

    const assignRiderToOrder = async (orderId, riderId) => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = {
                Authorization: "Bearer " + token,
            };
            const response = await axios.post(`/preparation/assignRider/${orderId}`, {
                riderId: riderId,

            }, { headers });
            // Disable the assign button for the assigned order
            const updatedOrders = orders.map((order) => {
                if (order.prepId === orderId) {
                    order.assigned = true;
                    order.prepStatus = 'Assigned'; // Update the prepStatus to 'Assigned'
                }
                return order;
            });
            setOrders(updatedOrders);


            console.log(response.data); // Handle success or display a notification
        } catch (error) {
            console.error('Error assigning rider:', error);
            // Handle error or display an error notification
        }
    };

    const renderAssignedOrders = () => {
        const assignRider = (orderId, riderId) => {
            assignRiderToOrder(orderId, riderId);

            const updatedOrders = orders.filter((order) => order.prepId !== orderId);
            setOrders(updatedOrders);

        };


        return inProgressOrders.map((order) => (
            <tr key={order.prepId}>
                {/* <td>{order.order.meal_id}</td> */}
                <td>{order.prepId}</td>
                <td>{order.order.member_id}</td>
                <td>{order.order.meal_name}</td>
                <td>{order.order.member_name}</td>
                <td>
                    <p className="text-warning fw-bold">{order.prepStatus}</p>
                </td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle assignbtn" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                        >
                            Assign
                        </button>
                        <ul className="dropdown-menu">
                            {riders.map((rider) => (
                                <li className="typeli" key={rider.id}>
                                    <button className="dropdown-item"
                                        onClick={() => assignRider(order.prepId, rider.id)}
                                    >
                                        {rider.firstName} {rider.lastName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </td>
            </tr>
        ));
    };

    const renderOngoing = () => {
        return deliveries.map((delivery, index) => (
            <tr key={index}>
                <td>{delivery.deliveryId}</td>
                <td>{`${delivery.rider.firstName} ${delivery.rider.lastName}`}</td>
                <td>{delivery.order.meal_name}</td>
                <td>{delivery.order.member_name}</td>
                <td>{delivery.order.location}</td>
                <td>{delivery.status}</td>
            </tr>
        ));
    };

    const renderRiders = () => {
        return riders.map((rider) => (
            <div className='each-rider' key={rider.id}>
                <img
                    src={riderlogo}
                    alt="..."
                    className='rider-logo'
                    style={{ width: "50px", height: "50px" }}
                />
                <div className='rider-details'>
                    <h5 className='rider-name'>{rider.firstName} {rider.lastName}</h5>
                    <p className='rider-loc'>{rider.address}</p>
                </div>
            </div>
        ));
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };


    if (loading) {
        return <div>Loading riders...</div>;
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: '#F24C3D', widows: "100%" }}>
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div class="sidebar-brand-icon rotate-n-15">
                            <i class="fas fa-laugh-wink"></i>
                        </div>
                        <div class="sidebar-brand-text mx-3">P Name</div>
                    </a>
                    <hr class="sidebar-divider my-0" />

                    <li class="nav-item active">
                        <a class="nav-link" href="index.html">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <hr class="sidebar-divider" />

                    <div class="sidebar-heading">Addons</div>

                    <li class="nav-item">
                        <a class="nav-link" href="tables.html">
                            <i class="fas fa-fw fa-table"></i>
                            <span>Orders</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="tables.html">
                            <i class="fas fa-fw fa-table"></i>
                            <span>Rider</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout}>
                            <i className="fas fa-sign-out"></i>
                            <span> Logout </span>
                        </button>
                    </li>

                    <hr class="sidebar-divider d-none d-md-block" />
                </ul>

                <div id="content-wrapper" class="d-flex flex-column">

                    <div id="content">

                        <div class="container-fluid">

                            <div class="d-sm-flex align-items-center justify-content-left mb-4 mt-4">
                                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>

                            </div>

                            <div class="row">

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-danger shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                        PENDING ORDERS</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                </div>
                                                <div class="col-auto">

                                                    <i class='bx bx-table fa-2x text-gray-300' ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-success shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Completed Orders
                                                    </div>
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col-auto">
                                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="progress progress-sm mr-2">
                                                                <div class="progress-bar progress-bar6 bg-success" role="progressbar"
                                                                    aria-valuenow="50" aria-valuemin="0"
                                                                    aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class='bx bxs-bowl-hot fa-2x text-gray-300' ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-warning shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Riders</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{totalRiders}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class='bx bxl-periscope  fa-2x text-gray-300' ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-info shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Donated Meals</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">2075</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class='bx bx-table fa-2x text-gray-300' ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row">

                                <div class="col-xl-9 col-lg-7">
                                    <div class="card shadow mb-4">
                                        <div
                                            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-dark">Pending Orders</h6>

                                        </div>
                                        <div class="card-body tableorder">
                                            <div class="chart-area">
                                                <div className='table-responsive'>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Member ID</th>
                                                                <th scope="col">Meal name</th>
                                                                <th scope="col">Customer</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Rider</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-group-divider">

                                                            {/* {this.renderOrderDetails()} */}
                                                            {renderAssignedOrders()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-5">
                                    <div class="card shadow mb-4">
                                        <div
                                            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-dark">Riders</h6>
                                        </div>

                                        <div class="card-body card-bodyrider">
                                            <div class="chart-pie pb-4">
                                                {renderRiders()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <div class="col-xl-12 col-lg-12">
                                    <div class="card shadow mb-4">
                                        <div
                                            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-dark">Ongoing Delivery</h6>

                                        </div>
                                        <div class="card-body tableorder">
                                            <div class="chart-area">
                                                <div className='table-responsive'>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Rider</th>
                                                                <th scope="col">Meal name</th>
                                                                <th scope="col">Customer</th>
                                                                <th scope="col">Location</th>
                                                                <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-group-divider">
                                                            {renderOngoing()}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>

                    <footer class="sticky-footer bg-white">
                        <div class="container my-auto">
                            <div class="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2021</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>

            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a class="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );


}
export default Partner;