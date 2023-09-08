import React, { Component } from "react";
import "../../assets/css/style-t&c.css";
import tcbg from "../../assets/images/t&c.png";
// import "bootstrap/dist/css/bootstrap.min.css";

class TermsAndConditions extends Component {
  render() {
    return (
      <div className="container-fluid p-0 mt-5 custom-font">
        <div className="row">
          <div className="col">
            <div className="hero-image">
              <img src={tcbg} alt="heroImage" />
              <div className="hero-overlay ms-5">
                <h1 className="text-center custom-title fs-1 fw-bold">
                  Terms and Conditions
                </h1>
                <p className="text-justify pt-3">
                  These terms and conditions govern your use of the software
                  development services provided by Unity One Solutions for the
                  project "Meals On Wheels". By accessing and using the software
                  developed for MerryMeal, you agree to comply with and be bound
                  by these terms and conditions. If you do not agree with any
                  part of this Agreement, you may not use the software or
                  services provided.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row min-vh-100">
          <div className="col-md-10 offset-md-1">
            <div className="terms-and-conditions">
              <div className="text-justify">
                <h4>1. Scope of Services</h4>
                <ul>
                  <li>
                    The Company will provide software development services for
                    the "Meals On Wheels" Project, as assigned by Mr. David,
                    your manager.
                  </li>
                  <li>
                    <strong>1.2</strong> The software will be designed to assist
                    MerryMeal, a charitable organization, in preparing and
                    delivering hot noon meals to qualified adults who are unable
                    to cook or maintain their nutritional status due to age,
                    disease, or disability.
                  </li>
                  <li>
                    The software will facilitate meal ordering, delivery
                    logistics, member management, and coordination with food
                    service providers.
                  </li>
                  <li>
                    The service will be available Monday through Friday, with
                    frozen meals provided over the weekend to members outside a
                    10-kilometer radius of their outsourced kitchens.
                  </li>
                </ul>

                <h4>2. Intellectual Property</h4>
                <ul>
                  <li>
                    All intellectual property rights, including copyrights and
                    trademarks, associated with the software developed for the
                    "Meals On Wheels" Project shall remain the property of
                    MerryMeal.
                  </li>
                  <li>
                    The Company will provide MerryMeal with a non-exclusive,
                    non-transferable license to use the software solely for the
                    purposes of its operations.
                  </li>
                </ul>

                <h4>3. Confidentiality</h4>
                <ul>
                  <li>
                    The Company and its employees shall maintain the
                    confidentiality of any proprietary or confidential
                    information disclosed by MerryMeal.
                  </li>
                  <li>
                    MerryMeal shall provide necessary information to the Company
                    to fulfill the development requirements of the Project,
                    understanding that such information may be shared with the
                    Company's employees or subcontractors involved in the
                    Project.
                  </li>
                </ul>

                <h4>4. Development Process</h4>
                <ul>
                  <li>
                    The Company will work collaboratively with the client and
                    other team members to design and develop the software.
                  </li>
                  <li>
                    The Company will provide MerryMeal with a detailed design
                    proposal, development plan, and functional application based
                    on the Project requirements.
                  </li>
                  <li>
                    The Company will regularly communicate with MerryMeal to
                    gather feedback, address concerns, and provide progress
                    updates.
                  </li>
                  <li>
                    The software development process will be subject to change
                    based on mutual agreement between the Company and MerryMeal.
                  </li>
                </ul>

                <h4>5. Delivery and Acceptance</h4>
                <ul>
                  <li>
                    The Company will deliver the developed software to MerryMeal
                    within the agreed-upon timeline.
                  </li>
                  <li>
                    MerryMeal will have a specified period to review and test
                    the software for acceptance.
                  </li>
                  <li>
                    If MerryMeal identifies any bugs, errors, or deficiencies
                    during the acceptance testing, the Company will make
                    reasonable efforts to rectify them promptly.
                  </li>
                  <li>
                    Upon successful acceptance testing, the software will be
                    considered delivered and the Project will be deemed
                    complete.
                  </li>
                </ul>

                <h4>6. Warranty and Support</h4>
                <ul>
                  <li>
                    The Company will provide a warranty period during which it
                    will address any software defects or errors that arise due
                    to the Company's work.
                  </li>
                  <li>
                    The warranty period will be defined in the development plan
                    and agreed upon by both parties.
                  </li>
                  <li>
                    Support services, including bug fixes and updates, may be
                    provided by the Company beyond the warranty period upon
                    mutual agreement.
                  </li>
                </ul>

                <h4>7. Limitation of Liability</h4>
                <ul>
                  <li>
                    The Company shall not be liable for any indirect,
                    incidental, special, or consequential damages arising out of
                    the use or inability to use the software, even if advised of
                    the possibility of such damages.
                  </li>
                  <li>
                    In no event shall the Company's total liability, whether in
                    contract, tort (including negligence), or otherwise, exceed
                    the amount paid by MerryMeal for the development services.
                  </li>
                </ul>

                <h4>8. Governing Law and Jurisdiction</h4>
                <ul>
                  <li>
                    This Agreement shall be governed by and construed in
                    accordance with the laws of the jurisdiction in which Unity
                    One Solutions is located.
                  </li>
                  <li>
                    Any disputes arising out of or in connection with this
                    Agreement shall be subject to the exclusive jurisdiction of
                    the courts in that jurisdiction.
                  </li>
                </ul>

                <h4>9. Modifications and Amendments</h4>
                <ul>
                  <li>
                    The Company reserves the right to modify or amend these
                    terms and conditions at any time.
                  </li>
                  <li>
                    Any modifications or amendments will be communicated to
                    MerryMeal in writing and shall become effective upon
                    acceptance by both parties.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsAndConditions;
