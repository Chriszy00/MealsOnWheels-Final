import React, { Component } from 'react';
import '../../assets/css/about.css';
import volunteers1 from '../../assets/images/volunteer2.jpg';
import volunteers3 from '../../assets/images/volunteer3.jpeg';
import volunteers4 from '../../assets/images/volunteer4.png';

class About extends Component {

    render() {
        return (
            <>
                <div class="aboutbanner">
                    <div class="container">
                        <h1 class="aboutbannertext"><span style={{fontFamily: 'SatoshiBold', color: "#f0f0f0"}}> WHAT & WHY </span><br />we do it</h1>
                    </div>

                </div>

                <div class="container-fluid aboutbelowbanner">
                    <div class="container aboutbelowbannerdiv">
                        <p class="text-center aboutbelowbannertext">
                            MerryMeal is a charitable organization that prepares and delivers a hot noon meal to
                            qualified adults living at home who are unable to cook for themselves or maintain their
                            nutritional status due to age, disease, or disability. Recognizing the importance of a well-balanced
                            diet and the impact it has on overall health and well-being, the organization has developed
                            several initiatives to further support its beneficiaries.
                        </p>
                    </div>
                </div>



                <div class="about1div shadow">
                    <div class="about1">
                        <div>
                            <h5 class="about1text">MerryMeal has established a network of volunteers who assist in meal preparation
                                and delivery. These volunteers undergo comprehensive training to ensure that the meals are
                                prepared hygienically and follow strict quality standards.
                            </h5>
                        </div>
                        <div class="">
                            <img src={volunteers1}   width="100%" class="rounded-4 about1pic" style={{ minWidth: '450px'}} />
                        </div>
                    </div>
                </div>



                <div class="about2div shadow">
                    <div class="about2">
                        <div class="">
                            <img src={volunteers4} width="100%" class="rounded-4 about1pic" style={{ minWidth: '450px'}}  />
                        </div>
                        <div>
                            <h5 class="about2text">MerryMeal actively engages in fundraising efforts to sustain and expand our operations. We welcome and appreciate the support of volunteer donors who share our commitment to making a difference. By donating their time, resources, or funds, individuals like you play a crucial role in enabling us to reach more people in need and extend our services to new communities.
                            </h5>
                        </div>

                    </div>
                </div>

                <div class="about1div about3div shadow">
                    <div class="about1">
                        <div>
                            <h5 class="about1text">MerryMeal has established a network of volunteers who assist in meal preparation
                                and delivery. These volunteers undergo comprehensive training to ensure that the meals are
                                prepared hygienically and follow strict quality standards.
                            </h5>
                        </div>
                        <div class="">
                            <img src={volunteers3} width="100%" class="rounded-4 about1pic" style={{ minWidth: '450px'}}  />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default About;