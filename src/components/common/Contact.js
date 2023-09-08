import React, { Component } from 'react';

class Contact extends Component {

  render() {
    return (
    <section className="page-section mb-0" id="terms" style={{ marginTop: "10%"}}>
        <div className="container">
        <div className="row">
        <h2 className="page-section-heading text-center text-uppercase"  style={{color: "black"}}>Contact us</h2>
        <div className="divider-custom-contact divider-light-contact mt-3">
            <div className="divider-custom-line-contact"></div>
            <div className="divider-custom-icon-contact"></div>
            <div className="divider-custom-line-contact"></div>
        </div>
        <p className="lead mb-0 text-center text-dark">
            Do you have any questions? Please do not hesitate to contact us directly.
            Our team will come back to you within a matter of hours to help you.</p>
        <div className="col-lg-6 mx-auto mt-3 embed-responsive embed-responsive-21by9 rounded">
        <iframe
            className="embed-responsive-item container-fluid mx-auto"
            style={{ border: "0" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.0214424380756!2d123.91167657158076!3d10.340168927641235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a998e133925eeb%3A0xfeda037a6ba9d730!2sUniversity%20of%20Cebu%20-%20Banilad%20Campus!5e0!3m2!1sen!2sph!4v1683106151228!5m2!1sen!2sph"
            title="Google Maps"
            width="500"
            height="200"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
        <section className="signup-section-contact pt-5 pb-0 col-lg-6" id="signup">
            <div className="container">
                <div className="row gx-4 gx-lg-5">
                    <div className="col-md-12 col-lg-10 mx-auto text-center sign-up">
                        <i className="far fa-paper-plane fa-2x mb-2 text-black"></i>
                        <h2 className="text-black fw-bold mb-5">Tell us your concern.</h2>
                        <form className="form-signup" id="contactForm" data-sb-form-api-token="API_TOKEN">
                            <div className="row input-group-newsletter">
                                <div className="col-12">
                                  <input className="form-control bg-whitish" id="emailAddress" type="email" 
                                    placeholder="Enter email address..." aria-label="Enter email address..." 
                                    data-sb-validations="required,email" /></div>
                                <div className="col-12">
                                <input type="text" className="form-control mt-2" placeholder="Subject" required/>
                                <textarea type="text" className="form-control mt-2" 
                                    placeholder="Description" style={{height: "150px"}} required></textarea></div>
                                <div className="col-auto mt-2">
                                    <button className="btn btn-dark px-3 d-flex justify-content-end" 
                                    id="submitButton" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
        {/*  Contact */}
        <section className="contact-section pb-5 pt-4 mt-5">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card py-4 h-100 bg-accent text-white">
                            <div className="card-body text-center">
                                <i className="fas fa-map-marked-alt mb-2"></i>
                                <h4 className="text-uppercase m-0">Address</h4>
                                <hr className="my-4 mx-auto" />
                                <div className="small text-white-50">Gov. M. Cuenco Ave, Cebu City, 6000 Cebu, Philippines</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card py-4 h-100 bg-accent text-white ">
                            <div className="card-body text-center">
                                <i className="fas fa-envelope mb-2"></i>
                                <h4 className="text-uppercase m-0">Email</h4>
                                <hr className="my-4 mx-auto" />
                                <div><a className="small text-white-50" href="#!">
                                  mealsonwheels@gmail.com</a></div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card py-4 h-100 bg-accent text-white ">
                            <div className="card-body text-center">
                                <i className="fas fa-mobile-alt mb-2"></i>
                                <h4 className="text-uppercase m-0">Phone</h4>
                                <hr className="my-4 mx-auto" />
                                <div className="small text-white-50">+8 (092) 3396-9832</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div> 
    </section>
    );
  }
}

export default Contact;