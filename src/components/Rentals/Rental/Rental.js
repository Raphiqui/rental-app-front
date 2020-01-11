import React, {Component, } from "react";
import {Grid, Segment, Container, Header, Loader,  } from 'semantic-ui-react';
import {DatePicker, Empty} from 'antd';
import _ from 'lodash';
import rentalApi from "../../../api/rentalApi.js";
import ImageCarousel from "./RentalCarousel/ImageCarousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import RentalFacilities from "./RentalFacilities";
import moment from 'moment';
import Nav from "../../Nav";

export default class Rental extends Component{

    constructor(props) {
        super(props);
        this.state  = {};
    }

    async componentDidMount() {
        let rentalapi = new rentalApi();

        let response;

        try{
            response = await rentalapi.fetchRental(this.props.match.params.id);
            if(!("error" in response)){

                let picturesUrl = response.data.pictures.map(picture => picture.url);

                this.setState({rental: response.data, pictsUrl: picturesUrl})
            }
        }catch (e) {
            console.error(e);
        }
    };

    disabledDate = (current) => {
        const dates = [
            {
                from: "2020-01-10",
                to: "2020-01-15"
            },
            {
                from: "2020-02-10",
                to: "2020-02-15"
            },
            {
                from: "2020-03-10",
                to: "2020-03-15"
            },
            {
                from: "2020-04-05",
                to: "2020-04-20"
            },
        ];

        let allDates = [];

        _.map(dates, date => {
            const currDate = moment(date.from);
            const lastDate = moment(date.to);
            allDates.push(currDate.format('YYYY-MM-DD'));
            while(currDate.add(1, 'days').diff(lastDate) < 0) {
                allDates.push(currDate.clone().format('YYYY-MM-DD'));
            }
            allDates.push(lastDate.format('YYYY-MM-DD'));
        });

        if (current < moment().endOf('day')){
            return true
        }else{
            let index = allDates.findIndex(date => date === moment(current).format('YYYY-MM-DD'));
            return index !== -1 && true
        }
    };

    render() {
        const { rental, pictsUrl } = this.state;
        const { RangePicker } = DatePicker;

        let style, message;
        if(!_.isNil(rental)){
            if(rental.isAvailable){
                style = {fontSize: '1.5em', color: "green", fontWeight: "bold"}; message = "(Available)"
            }else{
                style = {fontSize: '1.5em', color: "red", fontWeight: "bold"}; message = "(Not available)"
            }

            return (

                <div>
                    <Nav/>
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
                                <ImageCarousel pictsUrl={pictsUrl}/>
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
                                            rentalFacilities = {rental.facilities}
                                        />
                                    </Grid.Column>
                                    <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                                        <Header as='h3' style={{fontSize: '2em'}}>
                                            In progress <Loader active inline />
                                        </Header>
                                        <RangePicker
                                            style={{marginBottom: '10px'}}
                                            // onChange={onChangeDate}
                                            disabledDate={this.disabledDate}
                                            size="large"
                                            allowClear={false}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Segment>
                </div>
            )

        }else{
            return (<Empty style={{paddingTop: "20em"}} description="No data found"/>)
        }
    }

}