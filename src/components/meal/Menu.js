import React, { Component, createRef } from 'react';
import axios from 'axios';
import '../../assets/css/menu.css';
import { Link } from "react-router-dom";
import { notification } from 'antd';
import frozenlogo from "../../assets/images/frozen.png";
import hotlogo from "../../assets/images/hot.png";

class Menu extends Component {
    

    constructor(props) {
        super(props);
        this.tabRefs = {
            Featured: createRef(),
            Plant: createRef(),
            Meat: createRef()
        };

        this.state = {
            menu: [],
            menuplant: [],
            menucold: [],
            menucoldmeat: [],
            menumeat: [],
            within10km: localStorage.getItem("within10km") === "true"
        };
    }
componentDidMount() {
        // Set the "Featured" tab as active initially
        document.getElementById('Featured').style.display = 'block';
        document.querySelector('.tablinks').classList.add('active');
        // document.getElementByClassName('tabcontent').style.display = 'none';
    }
    openCity(evt, cityName) {
        const tabcontentDefaultDiv = document.querySelector('.tabcontentDefaultDiv');
        tabcontentDefaultDiv.style.display = 'none';

        // Declare all variables
        let i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(cityName).style.display = 'block';
        evt.currentTarget.className += ' active';


    }





   componentDidMount() {
        this.fetchMenuData('/api/meal/showMenu');
    }

    componentDidMount() {
        this.fetchMiniMenuData('/api/meal/showMenu/plant');
        this.fetchMiniMenuDataMeat('/api/meal/showMenu/meat');
        this.fetchMiniMenuDataCold('/api/meal/showMenu/plant/frozen');
        this.fetchMiniMenuDataColdMeat('/api/meal/showMenu/meat/frozen');
    };




    plantMenu = () => {
        this.fetchMenuData('/api/meal/showMenu/plant');
    };

    meatMenu = () => {
        this.fetchMenuData('/api/meal/showMenu/meat');
    };

    hotPlantMenu = () => {
        this.fetchMenuData('/api/meal/showMenu/plant/hot');
    };

    coldPlantMenu = () => {
        this.fetchMenuData('/api/meal/showMenu/plant/frozen');
    };

    hotMeatMenu = () => {
        this.fetchMenuData('/api/meal/showMenu/meat/hot');
    };

    coldMeatMenu = () => {
        this.fetchMenuData('/api/meal/showMenu/meat/frozen');
    };

    fetchMenuData = (url) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        axios
            .get(url, { headers })
            .then((response) => {
                this.setState({
                    menu: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchMiniMenuData = (url) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        axios
            .get(url, { headers } )
            .then((response) => {
                this.setState({
                    menuplant: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchMiniMenuDataMeat = (url) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        axios
            .get(url, { headers })
            .then((response) => {
                this.setState({
                    menumeat: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchMiniMenuDataCold = (url) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        axios
            .get(url, { headers })
            .then((response) => {
                this.setState({
                    menucold: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchMiniMenuDataColdMeat = (url) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        axios
            .get(url, { headers })
            .then((response) => {
                this.setState({
                    menucoldmeat: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };




    render() {

        const data = this.state.menu;
        const menuData = data.map((meal, index) => (
            <div className="card menu-card shadow" key={index}>
                <img src={`http://localhost:8080/api/meal/images/${meal.meal_id}/${meal.meal_photo}`} className="card-img-top menu"  height="200px" style={{objectFill: "contain"}} alt="..." />
                <div className="card-body menu-cardbody">
                    <h5 className="card-title mealname">{meal.meal_name}</h5>
                    <p className="card-text mealdesc">{meal.meal_desc}</p>
                    <Link to={`/member/mealdetails/${meal.meal_id}`}><button className="orderbtnmenu">View</button></Link>
                </div>
            </div>
        ));


        const plantdata = this.state.menuplant;
        const menuDataPlant = plantdata.map((meal, index) => (
            <div className="card menu-card2 shadow" key={index}>
                <img src={`/api/meal/images/${meal.meal_id}/${meal.meal_photo}`} style={{height: "200px",  objectFit: "cover", objectPosition: "center"}} className="card-img-top" alt="..." />
                <div className="card-body menu-cardbody">
                    <h5 className="card-title mealname">{meal.meal_name}</h5>

                    <Link to={`/member/mealdetails/${meal.meal_id}`}><button className="orderbtnmenu">View</button></Link>
                </div>
            </div>
        ));

        const colddata = this.state.menucold;
        const coldDataPlant = colddata.map((meal, index) => (
            <div className="card menu-card2 shadow" key={index}>
                <img src={`/api/meal/images/${meal.meal_id}/${meal.meal_photo}`} style={{height: "200px",  objectFit: "cover", objectPosition: "center"}} className="card-img-top" alt="..." />
                <div className="card-body menu-cardbody">
                    <h5 className="card-title mealname">{meal.meal_name}</h5>

                    <Link to={`/member/mealdetails/${meal.meal_id}`}><button className="orderbtnmenu">View</button></Link>
                </div>
            </div>
        ));

        const colddatameat = this.state.menucoldmeat;
        const coldDataMeat = colddatameat.map((meal, index) => (
            <div className="card menu-card2 shadow" key={index}>
                <img src={`/api/meal/images/${meal.meal_id}/${meal.meal_photo}`} style={{height: "200px",  objectFit: "cover", objectPosition: "center"}} className="card-img-top" alt="..." />
                <div className="card-body menu-cardbody">
                    <h5 className="card-title mealname">{meal.meal_name}</h5>

                    <Link to={`/member/mealdetails/${meal.meal_id}`}><button className="orderbtnmenu">View</button></Link>
                </div>
            </div>
        ));

        const meatdata = this.state.menumeat;
        const menuDataMeat = meatdata.map((meal, index) => (
            <div className="card menu-card2 shadow" key={index}>
                <img src={`http://localhost:8080/api/meal/images/${meal.meal_id}/${meal.meal_photo}`} className="card-img-top" alt="..." />
                <div className="card-body menu-cardbody">
                    <h5 className="card-title mealname">{meal.meal_name}</h5>

                    <Link to={`/member/mealdetails/${meal.meal_id}`}><button className="orderbtnmenu">View</button></Link>
                </div>
            </div>
        ));

        const { within10km, notificationShown } = this.state;

        if (!within10km && !notificationShown) {
          notification.success({
            message: 'Only Frozen Meals Offered',
            description: 'Only frozen meals are offered outside of 10 kilometers.',
          });
          this.setState({ notificationShown: true });
        } else if (within10km && notificationShown) {
          this.setState({ notificationShown: false });
        }
        return (
          <div>
            {this.state.within10km ? (
                
             <div className='menudivmain'>
             <div className="tab">
                 <button className="tablinks featuredbtn" onClick={(evt) => this.openCity(evt, 'Featured')} ref={(node) => (this.featuredbtn = node)}>Featured </button>
                 {/* <button className="tablinks plantbtn" onClick={(evt) => this.openCity(evt, 'Plant')} ref={(node) => (this.plantbtn = node)}>Plant-based</button> */}
                 <button className="tablinks plantbtn" onClick={(evt) => { this.openCity(evt, 'Plant'); this.plantMenu(); }} ref={(node) => (this.plantbtn = node)}>Plant-based</button>
                 <button className="tablinks meatbtn" onClick={(evt) => { this.openCity(evt, 'Meat'); this.meatMenu(); }} ref={(node) => (this.meatbtn = node)}>Meat-based</button>
             </div>
         
             <div className='tabcontentDefaultDiv container'>
                 <div className="tabcontentDefault">
                     <div className="container">
                         <div className="filterdiv">
                             <h3 className="featuredhead">FEATURED</h3>
                         </div>
         
                         <div className=" featuredrow1">
                             <div className="featured1 featured">
                                 <h1 className="featureTitle">Vegetable Stir-fry</h1>
                             </div>
                             <div className="featured2 featured">
                                 <h1 className="featureTitle">Gazpacho</h1>
                             </div>
                         </div>
                         <div className=" featuredrow2">
                             <div className="featured3 featuredbottom ">
                                 <h1 className="featuredsmall">Cold Soba Noodles</h1>
                             </div>
                             <div className="featured4 featuredbottom  ">
                                 <h1 className="featuredsmall">Lemon Garlic Baked Fish</h1>
                             </div>
                             <div className="featured5 featuredbottom ">
                                 <h1 className="featuredsmall">Frozen Chicken Enchiladas</h1>
                             </div>
                         </div>
                     </div>
                 </div>
         
                 <div className="tabcontentDefault">
                     <div className="container plantcont">
                         <div className="filterdiv">
                             <h3 className="featuredhead">Plant-Based Meals</h3>
                         </div>
                         <div className="plantmenu2">
         
                             {menuDataPlant}
                         </div>
                     </div>
         
                 </div>
         
                 <div className="tabcontentDefault">
                     <div className="container plantcont">
                         <div className="filterdiv">
                             <h3 className="featuredhead">Meat-Based Meals</h3>
         
                         </div>
                         <div className="plantmenu2">
         
                             {menuDataMeat}
                         </div>
                     </div>
                 </div>
             </div>
         
             <div id="Plant" className="tabcontent" ref={this.tabRefs['Plant']}>
                 <div className="container plantcont">
                     <div className="filterdiv">
                         <h3 className="featuredhead">Plant-Based Meals</h3>
                         <div className="dropdown">
                             <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 Type
                             </button>
                             <ul className="dropdown-menu">
                                 <li className="typeli"><button className="dropdown-item" onClick={this.hotPlantMenu} value="hot"><img src={hotlogo}  className="foodtype" alt="..." />    Hot Meals</button></li>
                                 <li className="typeli"><button className="dropdown-item" onClick={this.coldPlantMenu} value="frozen"><img src={frozenlogo} className="foodtype" alt="..." />    Frozen Meals</button></li>
                             </ul>
                         </div>
                     </div>
                     <div className="plantmenu">
         
                         {menuData}
                     </div>
                 </div>
         
             </div>
         
             <div id="Meat" className="tabcontent" ref={this.tabRefs['Meat']}>
                 <div className="container plantcont">
                     <div className="filterdiv">
                         <h3 className="featuredhead">Meat-Based Meals</h3>
                         <div className="dropdown">
                             <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 Type
                             </button>
                             <ul className="dropdown-menu">
                                 <li className="typeli"><button className="dropdown-item" onClick={this.hotMeatMenu} value="hot"><img  src={hotlogo}  className="foodtype" alt="..." />    Hot Meals</button></li>
                                 <li className="typeli"><button className="dropdown-item" onClick={this.coldMeatMenu} value="frozen"><img src={frozenlogo} className="foodtype" alt="..." />    Frozen Meals</button></li>
                             </ul>
                         </div>
                     </div>
                     <div className="plantmenu">
         
                         {menuData}
                     </div>
                 </div>
             </div>
         </div>
) : (
    <div className='menudivmain'>
    <div className="tab">
        <button className="tablinks featuredbtn" onClick={(evt) => this.openCity(evt, 'Featured')} ref={(node) => (this.featuredbtn = node)}>Featured </button>
        {/* <button className="tablinks plantbtn" onClick={(evt) => this.openCity(evt, 'Plant')} ref={(node) => (this.plantbtn = node)}>Plant-based</button> */}
        <button className="tablinks plantbtn" onClick={(evt) => { this.openCity(evt, 'Plant'); this.plantMenu(); }} ref={(node) => (this.plantbtn = node)}>Plant-based</button>
        <button className="tablinks meatbtn" onClick={(evt) => { this.openCity(evt, 'Meat'); this.meatMenu(); }} ref={(node) => (this.meatbtn = node)}>Meat-based</button>
    </div>

    <div className='tabcontentDefaultDiv container'>
        <div className="tabcontentDefault">
            <div className="container">
                <div className="filterdiv">
                    <h3 className="featuredhead">FEATURED</h3>
                </div>

                <div className=" featuredrow1">
                    <div className="featured1 featured">
                        <h1 className="featureTitle">Vegetable Stir-fry</h1>
                    </div>
                    <div className="featured2 featured">
                        <h1 className="featureTitle">Gazpacho</h1>
                    </div>
                </div>
                <div className=" featuredrow2">
                    <div className="featured3 featuredbottom ">
                        <h1 className="featuredsmall">Cold Soba Noodles</h1>
                    </div>
                    <div className="featured4 featuredbottom  ">
                        <h1 className="featuredsmall">Lemon Garlic Baked Fish</h1>
                    </div>
                    <div className="featured5 featuredbottom ">
                        <h1 className="featuredsmall">Frozen Chicken Enchiladas</h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="tabcontentDefault">
            <div className="container plantcont">
                <div className="filterdiv">
                    <h3 className="featuredhead">Plant-Based Meals</h3>
                </div>
                <div className="plantmenu2">

                    {coldDataPlant}
                </div>
            </div>

        </div>

        <div className="tabcontentDefault">
            <div className="container plantcont">
                <div className="filterdiv">
                    <h3 className="featuredhead">Meat-Based Meals</h3>

                </div>
                <div className="plantmenu2">

                {coldDataMeat}
                </div>
            </div>
        </div>
    </div>


    <div id="Plant" className="tabcontent" ref={this.tabRefs['Plant']}>
        <div className="container plantcont">
            <div className="filterdiv">
                <h3 className="featuredhead">Plant-Based Meals</h3>
            </div>
            <div className="plantmenu">

            {coldDataPlant}
            </div>
        </div>

    </div>

    <div id="Meat" className="tabcontent" ref={this.tabRefs['Meat']}>
        <div className="container plantcont">
            <div className="filterdiv">
                <h3 className="featuredhead">Meat-Based Meals</h3>
            </div>
            <div className="plantmenu">

            {coldDataMeat}
            </div>
        </div>
    </div>
</div>
)}
        </div>
        );
    }
}

export default Menu;