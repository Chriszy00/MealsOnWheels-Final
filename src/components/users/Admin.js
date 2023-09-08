import { Component } from "react";
import "../../assets/css/sb-admin-2.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import logoPartner from "../../assets/images/logo-partner-2.png";
import { Link } from "react-router-dom";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      order: [],
      partner: [],
      admin: [],
      member: [],
      delivery: [],
      loading: true,
    };
  }

  // Fetch data from API
  componentDidMount() {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: "Bearer " + token,
    };
    
    axios
      .get("http://localhost:8080/api/meal/showMenu", { headers })
      .then((response) => {
        this.setState({
          menu: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    
    axios
      // API call to retrieve order data
      .get("http://localhost:8080/showOrder", { headers })
      .then((response) => {
        this.setState({
          order: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      // API call to retrieve all partners
      .get("/api/users/showPartners", { headers })
      .then((response) => {
        this.setState({
          partner: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      // API call to retrieve all admins
      .get("/api/users/showAdmins", { headers })
      .then((response) => {
        this.setState({
          admin: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      // API call to retrieve all members
      .get("/api/users/showMembers", { headers })
      .then((response) => {
        this.setState({
          member: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      // API call to retrieve all deliveries
      .get("/preparation/deliveries", { headers })
      .then((response) => {
        this.setState({
          delivery: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  render() {
    const assignPartner = async ({ orderId, partnerId, memberId }) => {
      console.log("IDs:", orderId, partnerId, memberId);
      const requestBody = {
        partnerId: partnerId,
        memberId: memberId,
      };
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };

      try {
        const response = await axios.post(
          `/preparation/assignPartner/${orderId}`,
          requestBody, { headers }
        );
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error("Error assigning partners:", error);
      }
    };

    const fetchDeliveries = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        const response = await axios.get('/preparation/deliveries', { headers });
        const deliveries = response.data;
        const inProgress = deliveries.filter(delivery => delivery.status !== 'Delivered');
        const delivered = deliveries.filter(delivery => delivery.status === 'Delivered');
        this.setState({
          inProgressDeliveries: inProgress,
          deliveredDeliveries: delivered,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
  
    const handleApproveDelivery = async (deliveryId) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        const response = await axios.put(`/preparation/deliveries/${deliveryId}/approve`, {
          status: 'Approved',
        }, { headers });
        console.log(response.data); // Handle success or display a notification
        fetchDeliveries(); // Fetch deliveries again to update the tables
        window.href.location = "/admin";
      } catch (error) {
        console.error('Error confirming delivery:', error);
        // Handle error or display an error notification
      }
    };

    // Menu Table
    const mealdata = this.state.menu;
    console.log("menudata:", mealdata);
    const mealHeader = (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Meal Name</th>
          <th scope="col">Meal Description</th>
          <th scope="col">Nutrition Facts</th>
          <th scope="col">Category</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
    );
    const mealCell = mealdata.map((m, index) => (
      <tr key={index}>
        <th scope="row">{m.meal_id}</th>
        <td>{m.meal_name}</td>
        <td>{m.meal_desc}</td>
        <td>{m.meal_nutri}</td>
        <td>{m.category}</td>
        <td>{m.type}</td>
      </tr>
    ));
    // END of menu table

    // Partners data
    const partnerdata = this.state.partner;
    console.log("partnerdata:", partnerdata);
    const partnerbody = partnerdata.map((p, partner_index) => (
      <div className="d-flex" key={partner_index}>
        <div className="p-0">
          <img
            src={logoPartner}
            style={{ width: "50px", height: "50px" }}
            alt="partner logo"
          />
        </div>
        <div>
          <span className="satoshi-bold">
            {p.firstName} 
            {/* {p.lastName} */}
          </span>
          <br></br>
          <span className="small">{p.address}</span>
        </div>
      </div>
    ));
    
    const pendingorderdata = this.state.order;
    const pendingOrders = pendingorderdata.filter((o) => o.order_status === "Pending");
    console.log("orderdata:", pendingOrders);
    const orderHeader = (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Member</th>
          <th scope="col">Meal Name</th>
          <th scope="col">Location</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Partner</th>
        </tr>
      </thead>
    );
    const orderCell = pendingOrders.map((o, order_index) => (
      <tr key={order_index}>
        <th scope="row">{o.order_id}</th>
        <td>{o.member_id}</td>
        <td>{o.member_name}</td>
        <td>{o.meal_name}</td>
        <td>{o.location}</td>
        <td className="text-warning satoshi-bold">{o.order_status}</td>
        <td>{o.order_date}</td>
        <td>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle py-1 text-white"
              style={{ backgroundColor: "#22a699" }}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Assign
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {/* {partnerDropdown} */}
              {partnerdata.map((p, partner_index) => (
                <li key={partner_index}>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      assignPartner({
                        orderId: o.order_id,
                        partnerId: p.id,
                        memberId: o.member_id,
                      })
                    }
                  >
                    {p.firstName} 
                    {/* {p.lastName} */}
                  </button>
                </li>
              ))}
              ;
            </ul>
          </div>
        </td>
      </tr>
    ));
    // END of pending orders table

    // Admin table
    const admindata = this.state.admin;
    console.log("admindata:", admindata);
    const adminBody = admindata.map((a, admin_index) => (
      <tr key={admin_index}>
        <th scope="row">{a.id}</th>
        <td>
          {a.firstName} {a.lastName}
        </td>
      </tr>
    ));
    // END of admin table

    // Member table
    const memberdata = this.state.member;
    console.log("memberdata:", memberdata);
    const memberHeader = (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Address</th>
        </tr>
      </thead>
    );
    const memberCell = memberdata.map((b, member_index) => (
      <tr key={member_index}>
        <th scope="row">{b.id}</th>
        <td>
          {b.firstName} {b.lastName}{" "}
        </td>
        <td>{b.email}</td>
        <td>{b.phoneNumber}</td>
        <td>{b.address}</td>
      </tr>
    ));
    // END of member table

    // Delivery table
    const deliverydata = this.state.delivery;
    const deliveryDatum = deliverydata.filter((d) => d.status === "Assigned");
    console.log("deliverydata:", deliverydata);
    const deliveryHeader = (
      <tr>
        <th scope="col">#</th>
        <th scope="col">Rider</th>
        <th scope="col">Meal name</th>
        <th scope="col">Customer</th>
        <th scope="col">Location</th>
        <th scope="col">Status</th>
      </tr>
    );
    const deliveryCell = deliveryDatum.map((r, delivery_index) => (
      <tr key={delivery_index}>
        <td>{r.deliveryId}</td>
        <td>{`${r.rider.firstName} ${r.rider.lastName}`}</td>
        <td>{r.order.meal_name}</td>
        <td>{r.order.member_name}</td>
        <td>{r.order.location}</td>
        <td>{r.order.orderstatus}</td>
        <td>
          <button
            className="confirmdeliverybtn text-dark" 
            type="button"
            onClick={() => handleApproveDelivery(r.deliveryId)}
          >
            Approve
          </button>
        </td>
      </tr>
    ));
    // END of delivery table
 
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
    };

    return (
      <>
        <div id="wrapper">
          {/* Sidebar */}
          <ul
            className="navbar-nav bg-secondary-color sidebar sidebar-dark accordion satoshi"
            id="accordionSidebar"
          >
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="admin"
            >
              <div className="sidebar-brand-icon">
                <i className="fas fa-user-plus fs-4"></i>
              </div>
              <div className="sidebar-brand-text mx-1 satoshi-bold">
                Administrator
              </div>
            </a>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Pending Orders */}
            <li className="nav-item active">
              <a className="nav-link" href="#dashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            {/* Nav Item - Partners */}
            <li className="nav-item">
              <a className="nav-link" href="#orders">
                <i className="fas fa-fw fa-table"></i>
                <span>Orders</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#partners">
                <i className="fas fa-fw fa-table"></i>
                <span>Partners</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#meals">
                <i className="fas fa-fw fa-table"></i>
                <span>Meals</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#deliveries">
                <i className="fas fa-fw fa-table"></i>
                <span>Delivery</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/add-meal">
                <i className="fas fa-plus"></i>
                <span> Add a Meal</span>
              </Link>
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
          </ul>
          <div className="container-fluid pt-3">
            {/* CARDS */}
            <div className="row satoshi">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div
                          className="text-xs font-weight-bold text-danger text-uppercase mb-1"
                          id="orders"
                        >
                          PENDING ORDERS
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          6
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        <i className="fa-duotone fa-pan-food fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Assigned Orders
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              16.67%
                            </div>
                          </div>
                          <div className="col">
                            <div className="progress progress-sm mr-2">
                              <div
                                className="progress-bar progress-bar6 bg-success"
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Partners
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          6
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-users fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Donated Meals
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          2075
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa-solid fa-bowl-food fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row satoshi">
              {/* PENDING ORDERS */}
              <div className="col-xl-9 col-lg-8 mb-4">
                <div
                  className="card overflow-auto shadow"
                  style={{ height: "420px" }}
                >
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-black" id="orders">
                      Pending Orders
                    </h6>
                  </div>
                  <div className="table-responsive p-3">
                    <table className="table table-responsive-md table-striped table-hover">
                      {orderHeader}
                      <tbody>{orderCell}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* PARTNERS */}
              <div className="col-xl-3 col-lg-4 mb-4">
                <div className="card shadow" style={{ height: "420px" }}>
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-black">
                      Partners
                    </h6>
                  </div>
                  <div className="table-responsive ">
                    <div className="table table-responsive-md table-striped table-hover">
                      <div className="p-3">{partnerbody}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row satoshi">
              {/* MENU */}
              <div className="col-xl-12 col-lg-12 mb-4">
                <div
                  className="card overflow-auto shadow"
                  style={{ height: "470px" }}
                >
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-black" id="meals">
                      Menu
                    </h6>
                  </div>
                  <div className="table-responsive p-3">
                    <table className="table table-responsive-md table-striped table-hover">
                      {mealHeader}
                      <tbody>{mealCell}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row satoshi">
              {/* ADMINS */}
              <div className="col-xl-3 col-lg-4 mb-4">
                <div className="card shadow" style={{ height: "470px" }}>
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-black">
                      Administrators
                    </h6>
                  </div>
                  <div className="table-responsive p-3">
                    <table className="table table-responsive-md table-striped table-hover">
                      <tbody>{adminBody}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* MEMBERS */}
              <div className="col-xl-9 col-lg-8 mb-4">
                <div className="card shadow" style={{ height: "470px" }}>
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-black">Members</h6>
                  </div>
                  <div className="table-responsive p-3">
                    <table className="table table-responsive-md table-striped table-hover">
                      {memberHeader}
                      <tbody>{memberCell}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* DELIVERY */}
              <div className="row" id="deliveries">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-dark">
                        Ongoing Delivery
                      </h6>
                    </div>
                    <div className="card-body tableorder">
                      <div className="chart-area">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>{deliveryHeader}</thead>
                            <tbody className="table-group-divider">
                              {deliveryCell}
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
        </div>
      </>
    );
  }
}

export default Admin;
