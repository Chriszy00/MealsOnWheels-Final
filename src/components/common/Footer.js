import React, { Component } from "react";
import "../../assets/css/style-footer.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    return (
      <div className="container-fluid no-padding">
        {/* Footer */}
        <footer
          className="text-center text-white"
          style={{ backgroundColor: "#212529" }}
        >
          {/* Grid container */}
          <div
            className="container "
           
          >
            {/* Section: Links */}
            <section className="">
              {/* Grid row*/}
              <div className="row text-center d-flex justify-content-center pt-5">
                {/* Grid column */}
                <div className="col-md-2">
                  <h6
                    className="text-uppercase font-weight-bold"
                    
                  >
                    <Link
                      to="/aboutus"
                      className="text-white"
                      onClick={this.handleLinkClick}
                    >
                      About us
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-2">
                  <h6
                    className="text-uppercase font-weight-bold"
                    
                  >
                    <Link
                      to="/tc"
                      className="text-white"
                      onClick={this.handleLinkClick}
                    >
                      Terms & Conditions
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-2">
                  <h6
                    className="text-uppercase font-weight-bold"
                   
                  >
                    <Link
                      to="/contactus"
                      className="text-white"
                      onClick={this.handleLinkClick}
                    >
                      Contact Us
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </section>
            {/* Section: Links */}

            <hr className="my-3" />

            {/* Section: Text */}
            <section className="mb-3">
              <div className="row d-flex justify-content-center text-light">
                <div className="col-lg-8 fs-6">
                  <p className="lh-lg">Meals On Wheels</p>
                </div>
              </div>
            </section>
            {/* Section: Text */}
          </div>
          {/* Grid container */}

          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023
            <a
              className="text-white ms-2"
              href="/"
             
            >
              MOW
            </a>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
    );
  }
}

export default Footer;
