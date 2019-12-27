import React, { Component } from 'react'
import {Segment,  } from 'semantic-ui-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from '../Footer.js';
import _ from 'lodash';
import rentalApi from "../../api/rentalApi";
import HomeGreetings from "./HomeGreetings";
import HomeDescription from "./HomeDescription";
import HomeImagesDisplay from "./HomeImagesDisplay";

export default class HomepageLayout extends Component{

    constructor() {
        super();
        this.state = {
            images: [],
        }
    }

    async componentDidMount () {
        let rentalapi = new rentalApi();

        let response, repAggregate;

        try{

            repAggregate = await rentalapi.fetchRentalsAggregate(6);

            if(!("error" in repAggregate)){
                _.map(repAggregate.data, async record => {
                    response = await rentalapi.fetchRentalImg(record._id);
                    if(!("error" in response)){
                        this.setState({
                            images: [ ...this.state.images, response.data],
                        });
                    }
                })
            }
        }catch (e) {
            console.error(e);
        }
    };

    render() {

        const { images } = this.state;

        return (
            <div>
                <Segment style={{padding: '6em 0em'}} vertical>

                    <HomeGreetings/>

                    <HomeImagesDisplay images={images} />

                </Segment>

                <HomeDescription/>

                <Footer/>

            </div>
        )}
}