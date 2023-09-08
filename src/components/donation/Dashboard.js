
import '../../assets/css/donor.css';
import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donors: [],
      totalDonors: 0,
    };
  }

  componentDidMount() {
    this.fetchDonors();
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

 

  render() {
    const { donors } = this.state;
    const totalDonated = donors.reduce(
      (total, donor) => total + parseFloat(donor.donated || 0),
      0
    );
  return (
    <>
 
{/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="w3-top">

        <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
          <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 4</a>
        </div>
      </div> */}

      {/* Header */}
      <header className="w3-center headhead" style={{ backgroundImage: "url('https://i.imgur.com/PTbTChK.jpg')", color: "white", padding: "100px 16px" }}>
        


        <h1  className='makeadiff'>MAKE A DIFFERENCE!</h1>
        <p className="w3-xlarge yourdonation">Your Donation Supports Nutritious Meals<br /> for Vulnerable Adults!</p>
        <h1 className='donationcount'>  ${totalDonated}</h1>
        <p className="w3-xlarge totaldonated" style={{ marginBottom: "150px", lineHeight: "0px" }}>Raised Funds</p>
      </header>

      <img className="image2" src="https://i.imgur.com/vl72IHJ.png" alt="" />

      <Link to="/donor/donate"><button className="donatebutton" style={{ border: "none", outline: "none" }}>DONATE</button></Link>

      {/* First Grid */}
      <div style={{ paddingTop: "400px", textAlign: "justify"}} className="w3-row-padding w3-container">
        <div className="w3-content" >
          <div className="w3-twothird" style={{}}>
              <h1 className='donateAboutUs'>About Us</h1>
            <p className="w3-text-grey donateAboutUstext">At 'Meals on Wheels', our mission is to ensure that no one in our community goes hungry or malnourished. We are driven by the commitment to provide nutritious meals and support to those in need. Our dedicated team of compassionate volunteers and valuable partners work tirelessly to make a positive impact on the lives of individuals and families facing food insecurity.
</p>
          </div>
          <div className="w3-third w3-center">

          <img className="" src="https://clipart-library.com/image_gallery/255180.png" alt="" width="50%"/>
          </div>
        </div>
      </div>
      {/* Second Grid */}
      <div style={{ marginTop: "50px", marginBottom: "100px", textAlign: "justify"}}className="w3-row-padding w3-light-greyr">
        <div className="w3-content">
          <div className="w3-third w3-center">
            <img className="" src="https://cdn-icons-png.flaticon.com/512/2904/2904845.png" alt="" width="50%"/>
          </div>
          <div className="w3-twothird">
            <h1 className='donateAboutUs'>Where does my donation go?</h1> <p className="w3-text-grey donateAboutUstext">At 'Meals on Wheels', we are transparent about where donations go and ensure that they are utilized efficiently and effectively to support our mission of combating hunger and malnutrition in the community. </p>
          </div>
        </div>
      </div>

      {/* <br/>
      <br/>

      <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
        <h1 className="w3-margin w3-xlarge">Quote of the day: live life</h1>
      </div> */}

    </>
  );
}
}

export default Dashboard;
