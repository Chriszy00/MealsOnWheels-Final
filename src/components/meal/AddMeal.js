import { Component } from "react";
import mealBanner from "../../assets/images/add-meal-banner.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

class AddMeal extends Component {
  constructor() {
    super();
    this.state = {
      meal_name: "",
      meal_desc: "",
      meal_nutri: "",
      category: "",
      type: "",
      image: null,
    };
  }

  mealNameChange = (event) => {
    this.setState({
      meal_name: event.target.value,
    });
  };

  mealDescChange = (event) => {
    this.setState({
      meal_desc: event.target.value,
    });
  };

  mealNutriChange = (event) => {
    this.setState({
      meal_nutri: event.target.value,
    });
  };

  categoryChange = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  typeChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  imageChange = (event) => {
    if (event.target.name === "image") {
      this.setState({
        image: event.target.files[0],
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  addMeal = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();
    formData.append("meal_name", this.state.meal_name);
    formData.append("meal_desc", this.state.meal_desc);
    formData.append("meal_nutri", this.state.meal_nutri);
    formData.append("category", this.state.category);
    formData.append("type", this.state.type);
    formData.append("image", this.state.image);

    axios
      .post("http://localhost:8080/api/meal/add_meal", formData, { headers })
      .then((response) => {
        console.log(response.data);
        window.location.href = "/admin/dashboard";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
    };

    return (
      <div>
        <div className="row p-0 satoshi">
          <div className="col-2 mx-0">
            {/* Sidebar */}
            <ul
              className="navbar-nav bg-secondary-color sidebar sidebar-dark accordion"
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
                <Link className="nav-link" to="/admin/dashboard">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Nav Item - Partners */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/admin/dashboard#deliveries"
                >
                  <i className="fas fa-fw fa-table"></i>
                  <span>Orders</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/admin/dashboard#partners"
                >
                  <i className="fas fa-fw fa-table"></i>
                  <span>Partners</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/admin/dashboard#meals"
                >
                  <i className="fas fa-fw fa-table"></i>
                  <span>Meals</span>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-meal">
                  <i className="fas fa-plus"></i>
                  <span> Add a Meal</span>
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  <i className="fas fa-sign-out"></i>
                  <span> Logout </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-10 px-0 mx-0 my-auto">
            {" "}
            {/* FORM */}
            <div
              className="card mx-auto rounded-top-4 rounded-bottom-4 shadow"
              style={{ minWidth: "480px", maxWidth: "600px" }}
            >
              <img
                className="card-img-top rounded-top-4 bottom-top-4"
                src={mealBanner}
                alt="Add meal banner"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              <form onSubmit={this.addMeal} className="validated px-4 satoshi">
                <h3 className=" card-title text-center mx-auto mt-3 satoshi-bold">
                  Add a meal
                </h3>
                <p className="text-center">
                  Please fill in the form below to insert a new meal in the
                  menu.
                </p>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Meal name"
                    required
                    value={this.state.meal_name}
                    onChange={this.mealNameChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Meal details"
                    rows="3"
                    required
                    value={this.state.meal_desc}
                    onChange={this.mealDescChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Meal nutrients"
                    rows="2"
                    required
                    value={this.state.meal_nutri}
                    onChange={this.mealNutriChange}
                  />
                </div>
                <div className="d-flex d-grid justify-content-end gap-3 mb-3">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary bg-secondary-color border-0 dropdown-toggle"
                      type="button"
                      id="dropdownCategory"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      required
                    >
                      Category
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownCategory"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          value="Plant Based"
                          onClick={this.categoryChange}
                        >
                          Plant Based
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          value="Meat Based"
                          onClick={this.categoryChange}
                        >
                          Meat Based
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary bg-secondary-color border-0 dropdown-toggle"
                      type="button"
                      id="dropdownType"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      required
                    >
                      Type
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownType"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          value="Hot"
                          onClick={this.typeChange}
                        >
                          Hot
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          value="Frozen"
                          onClick={this.typeChange}
                        >
                          Frozen
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-3 justify-content-center">
                  <p className="form-label">Select an image:</p>
                  <input
                    className="form-control mb-3"
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    onChange={this.imageChange}
                    required
                  />
                </div>
                <div className="mx-auto text-center mt-5 mb-3">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn-add-meal p-2 px-5 satoshi-bold text-center mb-3"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMeal;
