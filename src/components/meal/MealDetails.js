import { Component, createRef, useState, useEffect, useRef } from "react";
// import meal from '../assets/images/potato-gratin-tarts.jpg';
// import 'bootstrap/dist/js/bootstrap.js';
// import 'boxicons/css/boxicons.min.css';
import "../../assets/css/menu.css";
import { Link, useParams, withRouter, useNavigate } from "react-router-dom";
import axios from "axios";

function MealDetails() {
  const [meal, setMeal] = useState({
    meal_name: "",
    meal_desc: "",
    meal_nutri: "",
    meal_photo: "",
    category: "",
    type: "",
  });

  const history = useNavigate();
  const [member, setMember] = useState(null);

  const getEmail = () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const email = localStorage.getItem("email");
    console.log("email before /find:", email);
    console.log("Member before /find:", member);

    axios
      .get(`http://localhost:8080/api/users/find/${email}`, { headers })
      .then((response) => {
        const member = response.data;
        setMember(member); // Set the user data in the state
        console.log("Member:", member);
        localStorage.setItem("id", member.id);
        localStorage.setItem("firstName", member.firstName);
        localStorage.setItem("lastName", member.lastName);
        localStorage.setItem("address", member.address);
        console.log(member);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { id } = useParams();

  useEffect(() => {
    const loadMeal = async () => {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      try {
        const result = await axios.get(
          `http://localhost:8080/api/meal/mealdetails/${id}`,
          { headers }
        ); // ID from useParams();
        setMeal(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMeal();
  }, [id]);

  console.log(meal);
  console.log(id);

  const addOrder = async (event) => {
    await getEmail(); // Wait for getEmail to fetch and update member data

    const memberId = localStorage.getItem("userId");
    const memberFirstName = localStorage.getItem("firstName");
    const memberLastName = localStorage.getItem("lastName");
    const memberName = `${memberFirstName} ${memberLastName}`;
    const memberAddress = localStorage.getItem("address");

    const order = {
      member_id: memberId,
      member_name: memberName,
      location: memberAddress,
      meal_name: meal.meal_name,
      order_status: "Pending",
    };
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: "Bearer " + token,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/add_order",
        order,
        { headers }
      );
      alert("Order successful: " + response.data);
      window.location.href = "/member/menu";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="menudivmain">
      <div className="tab">
        <button onClick={() => history(-1)} style={{ marginTop: "40vh" }}>
          <i className="bi bi-arrow-left-circle-fill"></i> Back
        </button>
      </div>
      <div className="container-fluid">
        <div className="row mb-5">
          {" "}
          {/* Meal Details */}
          <div className="col-xl-5 col-lg-5 mb-4 mt-5">
            <div className="shadow ">
              <img
                src={`http://localhost:8080/api/meal/images/${meal.meal_id}/${meal.meal_photo}`}
                style={{
                  minHeight: "420px",
                  maxHeight: "420px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="card-img-top rounded shadow h-100"
                alt="meal"
              />
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 mt-5">
            <div className="card shadow cardmealdetails">
              <div className="card-body">
                <h5 className="card-title fw-bold mealdetailsname">
                  {meal.meal_name}
                </h5>
                <p className="card-text mt-3 mealdetailsdesc">
                  {meal.meal_desc}
                </p>
                <h6 className="card-subtitle text-muted mt-5 mealdetailsnutrihead">
                  Nutritional Facts
                </h6>
                <div className="card-text text-muted row mt-2">
                  <div className="col-5 ps-4 mealdetailsnutri">
                    {meal.meal_nutri}
                  </div>
                  <div className="col-5 ps-4 mealdetailsnutri">
                    {meal.category}
                    {meal.type}
                  </div>
                </div>
                <button
                  className="btn btn-block btn-warning mt-5 fw-bold"
                  onClick={(event) => {
                    event.preventDefault();
                    getEmail();
                    addOrder();
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          {" "}
          {/* Allergen Declaration */}
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item rounded-2 shadow">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button text-white rounded-top-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                  style={{ backgroundColor: "#f24c3d" }}
                >
                  Allergen Declaration
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">
                  MerryMeals' manufacturing and kitchen operations involve the
                  utilization of shared cooking equipment, preparation areas,
                  tools, and utensils that may come into contact with or contain
                  allergens. Consequently, we are unable to provide a guarantee
                  that a food ingredient or product is completely free from a
                  specific allergen, as there is a possibility of allergen
                  cross-contact between different products.
                  <br></br>
                  <br></br>
                  The allergen information presented in this document is based
                  on data provided by our suppliers. MerryMeals, along with its
                  directors, officers, employees, subsidiaries, and franchisees,
                  cannot be held responsible for the accuracy and reliability of
                  the provided allergen information.
                  <br></br>
                  <br></br>
                  The listing is periodically updated in an effort to accurately
                  represent the allergen content; however, variations may occur
                  due to ongoing product improvements. Additionally,
                  non-permanent products such as test items and limited-time
                  offerings may not be included in this document.
                  <br></br>
                  <br></br>
                  The allergen information provided in this document is meant to
                  be a general guide and does not constitute legal or medical
                  advice. Customers should seek separate medical or legal advice
                  relevant to their specific circumstances. MerryMeals, along
                  with its directors, employees, subsidiaries, and franchisees,
                  disclaims any liability for any loss, costs, or damages
                  incurred by users who rely on this document.
                  <br></br>
                  <br></br>
                  This information is specific to MerryMeals stores operating
                  within the Philippines and does not pertain to stores located
                  outside the Philippines.
                  <br></br>
                  <br></br>
                  Current as of: June 13, 2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;
