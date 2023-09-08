import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = ({ currency }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [customAmount, setCustomAmount] = useState("");
  const [donor, setDonor] = useState({
    email: "",
    name: "",
    roleId: "5",
  });
  const [donated, setDonated] = useState("");
  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");

  const { email, name, roleId } = donor;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
    if (name === "name") {
      nameRef.current = value; // Update nameRef with the latest value
    } else if (name === "email") {
      emailRef.current = value; // Update emailRef with the latest value
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current; // Get the latest name value
    const email = emailRef.current; // Get the latest email value

    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Payment Cancelled ❌\n❌ Invalid name or email address ❌");
      return;
    }

    await axios.post("http://localhost:8080/addDonor", {
      ...donor,
      donated: donated,
      email: email,
      name: name,
    });
    navigate("/donor/thankyou");
  };

  const handleApprove = (data, actions) => {
    // Handle successful payment
    onSubmit(new Event("submit"));
  };

  useEffect(() => {
    updateAmount(customAmount);
  }, [currency, customAmount]);

  const createOrder = (data, actions) => {
    const amountValue = parseFloat(customAmount);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: amountValue.toString(),
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: amountValue.toString(),
                },
              },
            },
            items: [
              {
                name: "donation-example",
                quantity: "1",
                unit_amount: {
                  currency_code: currency,
                  value: amountValue.toString(),
                },
                category: "DONATION",
              },
            ],
          },
        ],
      })
      .then((orderId) => {
        // Your code here after creating the donation
        return orderId;
      });
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setCustomAmount(numericInput);
    setDonated(numericInput);
    const donationTextValue = document.getElementById("donation-text-value");
    if (donationTextValue) {
      donationTextValue.textContent = "$" + numericInput + ".00";
    }
  };

  const updateAmount = (newAmount) => {
    setCustomAmount(newAmount);

    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  };

  // Check if all three forms are empty
  const isFormsEmpty = customAmount === "" && name === "" && email === "";

  // Check if email is valid
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <body style={{ paddingBottom: "100px" }}>
      <div className="donation">
        <style
          dangerouslySetInnerHTML={{
            __html:
              " \n.list-group-item.valid {\nbackground-color: #D7D7D6 !important;\n}\nbody {background-color:#F3F3EE;}\n\n.donation {\n  font-family: sans-serif;\n  font-size: 15px;\n  width:600px;\n  padding: 50px;\n  position: absolute;\n margin-top:50px 0px;padding-bottom: 10px; top: 10%;\n  left: 50%;\n transform: translate(-50%);\n  background-color: #fff;\n  border-radius: 40px;\noutline:none;\n\n}\n\n  .list-group-item {\n    background-color: #fff;\n    border-color: transparent;\n    cursor: pointer;\n    position: relative;\n    \n    color: black;  transition: width 2s linear 1s;\noutline:none !important;\nborder:none !important;\n    \n  }\n  \n.donatebuttonfinal {\n\nbackground-color: #f2be22; /* Green */\nborder: none;\ncolor: white;\nwidth:100%;\n\ntext-align: center;\ntext-decoration: none;\nfont-size: 20px;\ntransition-duration: 0.2s;\ncursor: pointer;\nz-index:2000;\nborder-radius:10px;\nz-index:200;\nbox-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;\noutline:none;\nborder:none;\n}\n\n\n.donatebuttonfinal:hover {\nbackground-color: #DEAB0F;\ncolor: white;\n}\n.donatebuttonfinal:active {\nbackground-color: #D5A30B;\ncolor: white;\n}\ninput#donation-input {\n  width: 100%;\n  padding: 10px;\n  padding-right: 120px;\n   border: 1px solid #777;\n  border-radius: 4px;\n  font-weight: bold;\n  box-sizing: border-box;\n  font-size: 33px;\n  border-radius: 10px;\n}\n\n\n.zeros {\n  position: relative;\n  margin: 0;\n  top: -72px;\n  left: 83%;\n     font-size: 33px;\n}\n\n.donation-text {\n  color: gray;\n}\n\n.submit-button {\n  background-color: #4CAF50;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 16px;\n}\n\n.submit-button:hover {\n  background-color: #45a049;\n}\n  .accordion-item {\n    cursor: pointer;\n  }\n  \n  .accordion-content {\n    display: none;\n  }\n  \n  .accordion-content.open {\n    display: block;\n  }\n  \n  .company-logo {\n    width: 30px;\n    height: 30px;\n    margin-right: 10px;\n  }\n\n  .input-form .form-group {\n    display: flex;\n    align-items: center;\n  }\n\n  .input-form .form-group input {\n    margin-right: 10px;\n  }\n",
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n\n@media (max-width: 700px) {\n  html {\n    zoom: 70%;\n  }\n}\n",
          }}
        />

        <img
          src="https://www.shape.com/thmb/JcrbGc202pJKNYGnOhlvfakghCg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/The-Beginners-Guide-to-Bodybuilding-Meal-Prep-And-Nutrition-GettyImages-1165063882-2000-8af6829097be497bb01570172859fa61.jpg"
          width="130px"
          alt="Food"
          style={{
            verticalAlign: "middle",
            marginRight: 10,
            float: "left",
          }}
        />
        <br />
        <p style={{ color: "black", fontSize: 15, lineHeight: 0.5 }}>
          You're supporting <b>Merry Meal</b>
        </p>
        <p style={{ color: "gray", fontSize: 15 }}>
          This will benefit the <b>Meals on Wheels</b> program.
        </p>
        <br />
        <br />
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="donation-input">Enter donation amount:</label>

          <input
            type="text"
            value={customAmount}
            onChange={handleInputChange}
            id="donation-input"
            required=""
            autoComplete="off"
            inputMode="numeric"
            maxLength={5}
            style={{ paddingRight: "200px", alignText: "right" }}
          />

          <p style={{ color: "gray" }}>
            The funds raised will be directly utilized to source fresh
            ingredients, maintain food safety standards, and ensure timely
            delivery of hot nourishing meals to qualified adults.
          </p>
          <hr style={{ margin: "20px 0px" }} />
          <br />
          <b>Payment details</b>
          <br />
          <div style={{ marginTop: "3%" }}>
            <div
              style={{
                float: "left",
                marginRight: "5%",
                width: "45%",
              }}
            >
              <label style={{ display: "block" }}>
                Full Name
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                  className="detail"
                  required=""
                  maxLength={30}
                  name="name"
                  style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
                />
              </label>
            </div>

            <div style={{ float: "left", width: "50%" }}>
              <label style={{ display: "block", float: "right" }}>
                Email
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                  maxLength={40}
                  style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
                />
              </label>
            </div>

            <div style={{ clear: "both" }}></div>
          </div>

          <br />

          <img
            src="https://i.imgur.com/f3AgrGg.png"
            style={{ margin: "0px 20px", width: "500px" }}
          />

          <p style={{ color: "#aaa" }}>
            This fundraiser accepts PayPal as their primary payment method.
          </p>

          <div className="container mt-2"></div>
          <br />
          <hr style={{ margin: "20px 0px" }} />
          <b>Your Donation</b>
          <p>
            Donation Value:
            <span
              id="donation-text-value"
              style={{ paddingLeft: 300, alignText: "right" }}
            >
              $0.00
            </span>
          </p>

          <div
            className="paypalbutton"
            style={{ margin: "20px 0px", width: "100%", position: "relative" }}
          >
            <PayPalButtons
              fundingSource=""
              style={{ layout: "vertical", label: "" }}
              createOrder={createOrder}
              onApprove={handleApprove}
              disabled={isFormsEmpty || !isEmailValid} // Disable button if forms are empty or email is invalid
            />
          </div>
        </form>
      </div>
      <br />
      <br />
    </body>
  );
};

export default function App() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWAAxHgM4EITu3QpqeukAHaKCBCEUXSsUCWGmhUWNPiO6UeSm3lPQ_vLjt7X1Pb6bNl7tAkJCWJHUa5Z",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency="USD" />
      </PayPalScriptProvider>
    </div>
  );
}
