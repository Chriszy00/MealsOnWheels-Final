import React from 'react';

const ThankYouPage = () => {


  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You Page</title>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n.ty {\n  position: relative;\n  text-align: left;\n  color: white  ;\n    background-image:\n    linear-gradient(to top, rgba(243, 194, 27, .5), rgba(13, 118, 93, 0.8), rgba(243, 194, 27, .5)),\n    url('https://i.imgur.com/NE1JKtJ.jpg');\n    width: 100%;\n    background-size: cover;\n    padding: 50px !important;\n    border-radius: 20px !important;\n    outline:none;\n\n}\n.bgbg{\n      background-color: #f0f0f0 !important;\n      padding: 100px !important;    \n      padding-bottom: 200px !important;     \n  height:100%;}\n\n    .container {\n      max-width: 1000px;\n      margin: 0 auto;\n      padding: 130px !important;\n      background-color: #f0f0f0 !important;\n      border: 1px solid #dee2e6;\n      border-radius: 5px;\n      \n      text-align: left;\n      margin-top: 50px;  height:100%;\n    }\n\n    h1 {\n      font-size: 55px;\n      font-weight: bold;\n      margin-bottom: 20px;\n    }\n\n    p {\n      font-size: 18px;\n      margin-bottom: 30px;\n    }\n\n    .btn-outline-primary {\n      color: #007bff;\n      background-color: transparent;\n      background-image: none;\n      border-color: #007bff;\n      border-width: 2px;\n      padding: 8px 20px;\n      font-size: 16px;\n      line-height: 1.5;\n      border-radius: 5px;\n      transition: all 0.3s ease-in-out;\n    }\n\n    .btn-outline-primary:hover {\n      color: #fff;\n      background-color: #007bff;\n      border-color: #007bff;\n    }\n  "
    }}
  />
  <div className="bgbg">
<style
  dangerouslySetInnerHTML={{
    __html:
      "\n\n@media (max-width: 700px) {\n  html {\n    zoom: 50%;\n  }\n}\n"
  }}
/>
    <div className="container p-5 mt-0 ty">
      <h1 style={{fontSize: "12vh"}}>THANK YOU!</h1>
      <p style={{color:"white"}}>
      Your donation is deeply appreciated and will have a significant impact on our cause.
      </p>
      <a href="/donor/Dashboard" className="btn btn-warning p-3 color-white   btn-lg">
        <b>Dashboard</b>
      </a>
    </div>
  </div>
</>



  );
};

export default ThankYouPage;
