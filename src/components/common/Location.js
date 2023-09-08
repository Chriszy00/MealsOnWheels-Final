import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import '../../assets/css/home.css';
import jwt_decode from 'jwt-decode';
import { navigate } from "@reach/router";


function Location() {
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(null);
  const [within10km, setWithin10km] = useState(null);
  const [calculationTriggered, setCalculationTriggered] = useState(false); // New state variable

  
  const saveAddress = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const userId = getCurrentUserId(); // Replace this with the code to get the actual ID of the current user
      await axios.post(`/api/users/${userId}/address`, location, {headers});
      // Address saved successfully
      navigate("/member/menu");
    } catch (error) {
      console.log("Error occurred while saving the address:", error);
    }
  };
  
  const getCurrentUserId = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const tokenParts = accessToken.split('.');
      if (tokenParts.length === 3) {
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);
        return payload.sub;
      }
    }
    return null; // Return null or handle the case when the token is not found
  };
  
  // Example usage
  const userId = getCurrentUserId();
  console.log(userId);
  
  


  const calculateDistance = (e) => {
    e.preventDefault();
    try {
      const geocoder = new window.google.maps.Geocoder();
      const service = new window.google.maps.DistanceMatrixService();
  
      geocoder.geocode(
        { address: "6000 Gov. M. Cuenco Ave, Cebu City, 6000 Cebu" },
        (results, status) => {
          if (status === "OK" && results.length > 0) {
            const fixedLocation = results[0].geometry.location;
  
            geocoder.geocode({ address: location }, (results, status) => {
              if (status === "OK" && results.length > 0) {
                const userLocation = results[0].geometry.location;
  
                service.getDistanceMatrix(
                  {
                    origins: [userLocation],
                    destinations: [fixedLocation],
                    travelMode: "DRIVING",
                    unitSystem: window.google.maps.UnitSystem.METRIC,
                  },
                  (response, status) => {
                    if (
                      status === "OK" &&
                      response.rows.length > 0 &&
                      response.rows[0].elements.length > 0
                    ) {
                      const distanceResult = response.rows[0].elements[0];
                      if (distanceResult.status === "OK") {
                        const distanceInMeters = distanceResult.distance.value;
                        const distanceInKm = distanceInMeters / 1000;
                        setDistance(distanceInKm);
  
                        // Set the within10km status
                        const isWithin10km = distanceInKm <= 10;
                        setWithin10km(isWithin10km);
  
                        // Save the within10km status to localStorage
                        localStorage.setItem(
                          "within10km",
                          JSON.stringify(isWithin10km)
                        );
  
                        setCalculationTriggered(true); // Update the calculationTriggered state
                        saveAddress(); // Save the address
                        navigate("/member/menu");
                        window.location.reload(); // Reload the page
                      }
                    }
                  }
                );
              }
            });
          }
        }
      );
    } catch (error) {
      console.log("Error occurred during distance calculation:", error);
    }
  };
  

  const handleAutocomplete = () => {
    const input = document.getElementById("location");
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        setLocation(place.formatted_address);
      }
    });
  };

  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateDistance(e);
    }
  };

  useEffect(() => {
    const storedWithin10km = localStorage.getItem("within10km");
    if (storedWithin10km !== null) {
      setWithin10km(JSON.parse(storedWithin10km));
    }
  }, []);

  return (
    <div className="satoshi" style={{ marginTop: "7.5%"}}>
      <div className="container mt-5" >
        <div className="d-flex justify-content-center">
          <div
            className="card shadow"
            style={{ width: "800px", borderRadius: "4%", padding: "10px" }}
          >
            <div className="card-body">
              <h5
                className="card-title mb-4"
                style={{
                  fontSize: "30px",
                  color: "black",
                }}
              >
                Location
              </h5>
              <form onSubmit={calculateDistance}>
                <div className="form-group">
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={handleAutocomplete}
                    className="form-control"
                    placeholder="Enter your address..... Only within the Philippines"
                    required
                  />
                </div>
                <div className="map-container">
                  {/* Replace "YOUR_API_KEY" with your actual Google Maps API key */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.04280196614!2d123.90935737450371!3d10.338459889784923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a998e133925eeb%3A0xfeda037a6ba9d730!2sUniversity%20of%20Cebu%20-%20Banilad%20Campus!5e0!3m2!1sen!2sph!4v1688033971842!5m2!1sen!2sph"
                    width="100%"
                    height="300"
                    className="rounded"
                    allowFullScreen
                    loading="lazy"
                    title="Map"
                  ></iframe>
                </div>
                <button type="submit" className="btn btn-warning text-black"  onClick={saveAddress}>
                  CONFIRM
                </button>
                {/* {calculationTriggered && within10km !== null && (
                  <p>
                    Distance:{" "}
                    {distance !== null ? distance.toFixed(2) + " km" : "-"} (
                    {within10km ? "Within 10 km" : "Not within 10 km"})
                  </p>
                )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDmldRw6iaw0w2EKiVJa26mmSf7kwAZhf4", // Replace with your actual Google Maps API key
})(Location);