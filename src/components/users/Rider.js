import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/sb-admin-2.min.css';
import '../../assets/css/partner2.css';
import '../../assets/css/rider.css';
import '../../assets/vendor/fontawesome-free/css/all.min.css';
import { message } from 'antd'; // Import message from 'antd' for displaying notifications
import { useNavigate } from 'react-router-dom';
import decodeJWT from "jwt-decode";
const Rider = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inProgressDeliveries, setInProgressDeliveries] = useState([]);
  const [deliveredDeliveries, setDeliveredDeliveries] = useState([]);
  const [deliveredDeliveryCount, setDeliveredDeliveryCount] = useState(0);

  useEffect(() => {
    fetchDeliveries();
    fetchDeliveredDeliveryCount();
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

  const fetchDeliveries = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const response = await axios.get('/preparation/deliveries',  { headers });
      const deliveries = response.data;
      const inProgress = deliveries.filter((delivery) => delivery.status === 'Assigned');
      const delivered = deliveries.filter((delivery) => delivery.status === 'Delivered');
      setInProgressDeliveries(inProgress);
      setDeliveredDeliveries(delivered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const handleConfirmDelivery = async (deliveryId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const response = await axios.put(`/preparation/deliveries/${deliveryId}/confirm`, {
        status: 'Delivered', 
      },  { headers });
      console.log(response.data); // Handle success or display a notification
      fetchDeliveries(); // Fetch deliveries again to update the tables
    } catch (error) {
      console.error('Error confirming delivery:', error);
      // Handle error or display an error notification
    }
  };


  // Original
  const renderDeliveryRows = () => {
    return inProgressDeliveries.map((delivery) => (
      <tr key={delivery.deliveryId}>
        <td>{delivery.deliveryId}</td>
        <td>{delivery.order.member_name}</td>
        {/* <td>{delivery.order.phoneNumber}</td> */}
        <td>{delivery.order.meal_name}</td>
        <td>{delivery.order.location}</td>
        <td>
          <button
            className="confirmdeliverybtn text-dark"
            type="button"
            onClick={() => handleConfirmDelivery(delivery.deliveryId)}
          >
            Confirm Delivery
          </button>
        </td>
      </tr>
    ));
  };

  const renderDeliveredDeliveries = () => {
    return deliveredDeliveries.map((delivery) => (
      <tr key={delivery.deliveryId}>
        <td>{delivery.deliveryId}</td>
        <td>{delivery.order.member_name}</td>
        {/* <td>{delivery.order.contact}</td> */}
        <td>{delivery.order.meal_name}</td>
        <td>{delivery.order.location}</td>
        <td>Delivered</td>
      </tr>
    ));
  };


  const fetchDeliveredDeliveryCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const response = await axios.get('/preparation/deliveries/delivered/count',  { headers });
      setDeliveredDeliveryCount(response.data);
    } catch (error) {
      console.error('Error fetching delivered delivery count:', error);
    }
  };

  const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: '#F24C3D' }}>
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Rider</div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Addons</div>

          <li className="nav-item">
            <a className="nav-link" href="#projects">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Orders</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/rider/dashboard">
              <i className="fas fa-fw fa-table"></i>
              <span>Riders</span>
            </a>
          </li>
          <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                  <i className="fas fa-sign-out"></i>
                  <span> Logout </span>
              </button>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />

        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-left mb-4 mt-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                  className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
              </div>

              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-dark">Pending Delivery</h6>
                    </div>
                    <div className="card-body tableorder">
                      <div className="chart-area">
                        <div className='table-responsive'>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Recipient</th>
                                {/* <th scope="col">Contact</th> */}
                                <th scope="col">Meal name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">

                              {renderDeliveryRows()}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-9 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-dark">Delivery History</h6>
                    </div>
                    <div className="card-body tableorder">
                      <div className="chart-area">
                        <div className='table-responsive'>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Recipient</th>
                                {/* <th scope="col">Contact</th> */}
                                <th scope="col">Meal name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              {renderDeliveredDeliveries()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-5">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-dark">Total Delivered</h6>
                    </div>
                    <div className="card-body card-bodyrider">
                      <div className="chart-pie totaldelivered pb-4">
                        <h1 className='totaldeliverednum'>{deliveredDeliveryCount}</h1>
                      </div>
                      <div className="mt-4 text-center small">
                        <span className="mr-2">
                          <i className="fas fa-circle text-primary"></i>
                        </span>
                        <span className="mr-2">
                          <i className="fas fa-circle text-success"></i>
                        </span>
                        <span className="mr-2">
                          <i className="fas fa-circle text-info"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Meals on Wheels 2023</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
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
  )
}


export default Rider;