import React, { Component } from 'react';
import axios from 'axios';
// import '../../assets/css/sb-admin-2.min.css';
// import '../../assets/css/all.css';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      displaysearchdata: [],
    };
    this.resultsRef = React.createRef(); // Create a ref for the results container
  }

  changeOfInput = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  searchMyData = (event) => {
    event.preventDefault();
    const { keyword } = this.state;
  
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: "Bearer " + token,
    };

    axios
      .get("/api/meal/search", { headers, params: { keyword: keyword } } , { headers })
      .then((res) => {
        console.log(res.data);
        this.setState({
          displaysearchdata: res.data,
        });
        this.scrollToResults(); // Scroll to the results container
      })
      .catch((error) => {
        console.log(error);
      });
  };

  scrollToResults = () => {
    this.resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    let result;
    if (this.state.displaysearchdata.length > 0) {
      result = this.state.displaysearchdata.map((meal, key) => (
        <div className="col-sm-3" key={key}>
          <div className="card" style={{ width: "18rem", margin: "10px" }}>
            <img  src={`http://localhost:8080/api/meal/images/${meal.meal_id}/${meal.meal_photo}`} className="card-img-top" alt={meal.meal_photo} style={{ height: "180px" }} />
            <div className="card-body">
              <h5 className="card-title mealname">{meal.meal_name}</h5>
              <p className="card-text mealdesc">{meal.meal_desc}</p>
              <a href={`/member/mealdetails/${meal.meal_id}`} className="btn btn-warning">
                View Meal Details
              </a>
            </div>
          </div>
        </div>
      ));
    } else {
      result = (
        <tr className='text-center'>
          <td colSpan="4">No result found for {this.state.keyword}, please try again.</td>
        </tr>
      );
    }

    return (
      <div>
        <style>
          {`
          .input-container {
            width: 220px;
            position: relative;
          }

          .item {
            display: none;
            position: relative;
            transition: 0.6s ease-in-out left;
          }

          body {
            background-color: #222;
          }

          .input2 {
            position: absolute;
            bottom: 380px;
            left: 160px;
            width: 300%;
            color: white;
          }

          .input {
            position: absolute;
            bottom: 300px;
            left: 160px;
            width: 200%;
            height: 40px;
            padding: 10px;
            transition: 0.2s linear;
            border: 2.5px solid black;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 30px;
            padding-right: 40px;
          }

          .input:focus {
            outline: none;
            border: 0.5px solid black;
            box-shadow: -5px -5px 0px black;
          }

          .input-container:hover > .icon {
            animation: anim 1s linear infinite;
          }

          @keyframes anim {
            0%,
             100% {
              transform: translateY(calc(-50% - 5px)) scale(1);
            }

            50% {
              transform: translateY(calc(-50% - 5px)) scale(1.1);
            }
          }

          .d-block {
            filter: brightness(60%);
            background-color: #222;
          }

          .carousel-item {
            transition-duration: 0.2s !important;
          }
          `}
        </style>

        <head>
          <title>Bootstrap Example</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </head>

        <body className="satoshi">
          <div id="myCarousel" className="carousel slide" data-bs-interval="2000" data-bs-ride="carousel">
            <ol className="carousel-indicators">
              <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
              <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
              <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active bg-dark">
                <img
                  src="https://i.imgur.com/iapqJut.jpg"
                  alt="food"
                  className="d-block"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.imgur.com/MdlTiHR.jpg"
                  alt="food"
                  className="d-block"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.imgur.com/liON5G4.jpg"
                  alt="food"
                  className="d-block"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </a>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap"
              rel="stylesheet"
            />

            <div className="input-container">
              <h1
                className="input2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '69px',
                  textShadow: '1px 0 10px #000',
                }}
              >
                Need a meal? <br />Find now!
              </h1>
              <form className="search-form" onSubmit={this.searchMyData}>
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="search..."
                  onChange={this.changeOfInput}
                />
              </form>
              <span className="icon"></span>
            </div>
          </div>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

          <script>
            {`
            document.addEventListener('DOMContentLoaded', function() {
              var carousel = new bootstrap.Carousel(document.getElementById('myCarousel'), {
                interval: 2000
              });
            });
            `}
          </script>

          <div className="container p-5" ref={this.resultsRef}>
            <h1 className="text-center mt-4 mb-4">Search Results</h1>
            <div className="row">
              {result}
            </div>
          </div>

        </body>
      </div>
    );
  }
}

export default Search;
