import React, { Component, createRef } from "react";
import axios from "axios";
import '../../assets/css/sb-admin-2.min.css';
import '../../assets/css/donor.css';
import '../../assets/css/all.css';
import "../../assets/vendor/fontawesome-free/css/all.min.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";

class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donors: [],
    };
  }

  componentDidMount() {
    this.fetchDonors();
    this.fetchTotalDonors();
    
  }

  fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/donors");
      const donors = response.data;
      this.setState({ donors });
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };
fetchTotalDonors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/totalDonors");
      const totalDonors = response.data;
      this.setState({ totalDonors });
    } catch (error) {
      console.error("Error fetching total donors:", error);
    }
  };

  renderDonors = () => {
    return this.state.donors.map((donor, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{donor.name}</td>
        <td>${donor.donated}</td>
        <td>{donor.donatedDate}</td>
      </tr>
    ));
  };
  renderRecentDonors = () => {
    const recentDonors = this.state.donors
      .sort((a, b) => b.id - a.id) // Sort donors by donorId in descending order
      .slice(0, 4); // Get the first 4 recent donors
    return recentDonors.map((donor, index) => (
      <div key={index} className="col-xl-3 col-md-6 mb-4">
        <div className="card shadow h-100 py-2" style={{borderLeft: "4px solid #22a699"}}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{fontFamily: "satoshi"}}>
                  {donor.name}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  ${donor.donated}
                </div>
              </div>
              <div className="col-auto">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                  <style>{`svg { fill: #dddfeb; }`}</style>
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  
  
  render() {
    const { donors, totalDonors } = this.state;
  const totalDonated = donors.reduce(
    (total, donor) => total + parseFloat(donor.donated || 0),
    0
  );
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the 'auth' key from localStorage
    localStorage.removeItem("accessToken"); // Remove the 'accessToken' key from localStorage
    // localStorage.clear;
    window.location.href = "/";
  };
    return (
      <div id="page-top" className="satoshi">
        <div id="wrapper">
          <ul
            class="navbar-nav sidebar sidebar-dark accordion"
            id="accordionSidebar"
            style={{ backgroundColor: "#F24C3D", widows: "100%" }}
          >
            <a
              class="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
              </div>
              <div class="sidebar-brand-text mx-3">Donor List</div>
            </a>

            <hr class="sidebar-divider my-0" />

            <li class="nav-item active">
              <a class="nav-link" href="/admin/dashboard">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <hr class="sidebar-divider" />

            <div class="sidebar-heading">Addons</div>

            <li class="nav-item">
            <Link className="nav-link" to="/admin/add-meal">
            <i class="bx bxs-bowl-hot fa-2x text-gray-300"></i>
                <span> Add a Meal</span>
              </Link>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/admin/dashboard#orders">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Orders</span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/admin/dashboard#partner">
                <i class="fas fa-fw fa-user"></i>
                <span>Partner</span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/admin/dashboard#rider">
                <i class="bx bxl-periscope"></i>
                <span>Rider</span>
              </a>
            </li>

            <li class="nav-item">
            <Link className="nav-link" to="/admin/donors">
                <i class="fas fa-fw fa-user"></i>
                <span>Donors</span>
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                <i className="fas fa-sign-out"></i>
                <span> Logout </span>
              </button>
            </li>

            {/* <li class="nav-item">
              <a class="nav-link" href="tables.html">
                <i class="bx bx-right-arrow-circle"></i>
                <span>Logout</span>
              </a>
            </li> */}
            <hr class="sidebar-divider d-none d-md-block" />

            <div class="text-center d-none d-md-inline">
              <button
                class="rounded-circle border-0"
                id="sidebarToggle"
              ></button>
            </div>
          </ul>

          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-left mb-4 mt-4">
                  <h1 class="h3 mb-0 text-gray-800" style={{ position: "" }}>
                    Recent Donors
                  </h1>
                </div>

                <div class="row">
                {this.renderRecentDonors()}
                </div>

                <div class="row">
                  <div class="col-xl-9 col-lg-7">
                    <div class="card shadow mb-4">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-dark">
                          Donation History
                        </h6>
                      </div>
                      <div class="card-body tableorder">
                        <div class="chart-area">
                          <div className="table-responsive">
                            <table class="table table-striped" style={{color: "black"}}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Donor Name</th>
                                  <th scope="col">Donation</th>
                                  <th scope="col">Date Donated</th>
                                </tr>
                              </thead>
                              <tbody class="table-group-divider">
                              {this.renderDonors()}
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
                        <h6 className="m-0 font-weight-bold text-dark">
                          Raised Funds
                        </h6>
                      </div>

                      <div className="card-body card-bodyrider">
                        <div
                          className="donor pb-4"
                          style={{
                            height: "calc(6.7rem - 7px)",
                            important: true,
                          }}
                        >
                          <div className="each-rider">
                            <div className="rider-details">
                              <h5
                                className="rider-name text-center"
                                style={{
                                  alignItems: "center",
                                  fontSize: "40px",
                                  color: "black"
                                }}
                              >
                                     ${totalDonated}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-dark">
                          Total Donors
                        </h6>
                      </div>

                      <div className="card-body card-bodyrider">
                        <div
                          className="donor pb-4"
                          style={{
                            important: true,
                          }}
                        >
                          <div className="each-rider">
                            <div className="rider-details">
                              <h5
                                className="rider-name text-center"
                                style={{
                                  alignItems: "center",
                                  fontSize: "40px",
                                  color: "black",
                                }}
                              >
                                {totalDonors}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a class="scroll-to-top rounded" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>

        <div
          class="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  class="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a class="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Donor;
 