import React, {Component, } from "react";
import {Grid, Segment, Container, Header, Loader,  } from 'semantic-ui-react';
import { Empty } from 'antd';
import _ from 'lodash';
import rentalApi from "../../../api/rentalApi.js";
import ImageCarousel from "./RentalCarousel/ImageCarousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import RentalFacilities from "./RentalFacilities";

export default class Rental extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            timeByFoot: "30 to 35 minutes by foot",
            timeByCar: "10 to 15 minutes by car",
            timeByBicycle: "15 minutes by bicycle",
        };
    }

    async componentDidMount() {
        let rentalapi = new rentalApi();

        let response;

        try{
            response = await rentalapi.fetchRental(this.props.match.params.id);
            if(!("error" in response)){
                const image = await rentalapi.fetchRentalImg(this.props.match.params.id);
                const pictures = await rentalapi.fetchRentalImgs(this.props.match.params.id);
                try{
                    if( !("error" in image) && !("error" in pictures) ){
                        response.data.pictsUrl = pictures.data;
                        response.data.imgUrl = image.data;
                        this.setState({rental: response.data})
                    }
                }catch (e) {
                    console.error(e);
                }
            }
        }catch (e) {
            console.error(e);
        }
    };

    render() {
        const { rental, timeByFoot, timeByCar, timeByBicycle } = this.state;

        let style, message;
        if(!_.isNil(rental)){
            if(rental.isAvailable){
                style = {fontSize: '1.5em', color: "green", fontWeight: "bold"}; message = "(Available)"
            }else{
                style = {fontSize: '1.5em', color: "red", fontWeight: "bold"}; message = "(Not available)"
            }

            return (
                <Segment basic vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{paddingBottom: '2em', paddingTop: '2em'}}>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    {rental.name}
                                </Header>
                                <p style={style}>
                                    {message}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Container style={{ margin: 20, }}>
                        <Segment attached="bottom">
                            <ImageCarousel pictsUrl={rental.pictsUrl}/>
                        </Segment>
                    </Container>
                    <Segment style={{padding: '0em'}} vertical>
                        <Grid celled='internally' stackable>
                            <Grid.Row textAlign='center'>
                                <Grid.Column style={{padding: '5em'}}>
                                    <Header as='h3' style={{fontSize: '2em'}}>
                                        Description
                                    </Header>
                                    <p style={{fontSize: '1.33em'}}>
                                        {rental.description}
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment style={{padding: '0em'}} vertical>
                        <Grid celled='internally' columns='equal' stackable>
                            <Grid.Row textAlign='center'>
                                <Grid.Column style={{paddingBottom: '2em', paddingTop: '2em'}}>
                                    <RentalFacilities
                                        timeByCar = {timeByCar}
                                        timeByFoot = {timeByFoot}
                                        timeByBicycle = {timeByBicycle}
                                    />
                                </Grid.Column>
                                <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                                    <Header as='h3' style={{fontSize: '2em'}}>
                                        In progress <Loader active inline />
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment>
            )

        }else{
            return (<Empty style={{paddingTop: "20em"}} description="No data found"/>)
        }
    }

}