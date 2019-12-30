import React, {Component, createRef,} from "react";
import {Grid, Segment, Sticky, Ref, } from 'semantic-ui-react';
import { Empty } from 'antd';
import _ from 'lodash';
import rentalApi from "../../api/rentalApi";
import RentalsFilter from "./RentalsFilter";
import RentalsSearch from "./RentalsSearch";
import RentalsDisplay from "./RentalsDisplay";

export default class Rentals extends Component{

    constructor() {
        super();
        this.state  = {
            rentals: [],
            results: [],
            value: '',
            locations: [],
            filters: {
                location: '',
            }
        };
    }

    contextRef = createRef();

    handleSearchChange = (e, { value }) => {
        let founds = [];

        _.map(this.state.rentals, rental => {
            value = _.toLower(value);
            const rentalName = _.toLower(rental.name);
            const found = rentalName.match(value);
            if(!_.isNull(found)){founds.push(rental)}
        });

        this.setState({
            results: founds,
        });
    };

    getInput = (event) => {
        this.setState({
            filters: { location: event.target.textContent}
        })
    };

    onChange = (value) => {
        console.log('onChange: ', value);
    };

    onTest = () => {
        let founds = [];

        _.map(this.state.rentals, rental => {
            const found = rental.location.match(this.state.filters.location);
            if(!_.isNull(found)){founds.push(rental)}
        });

        this.setState({
            results: founds,
        });
    };

    async componentDidMount() {
        let rentalapi = new rentalApi();

        let response;
        let locationsBuffer = [];

        try{
            response = await rentalapi.fetchRentals();
            if(!("error" in response)){



                _.map(response.data, rental => {
                        locationsBuffer = _.concat(locationsBuffer, {
                            key: rental.location,
                            text: rental.location,
                            value: rental.location
                        })
                });

                this.setState({
                    results: response.data,
                    rentals: response.data,
                    locations: [...new Map(locationsBuffer.map(item => [item.key, item])).values()],
                })
            }

        }catch (e) {
            console.error(e);
        }
    };

    check = (event) => {
        console.log(event.target.checked)
    };

    render() {

        const { locations, suirChecked, results } = this.state;

        return (
            <Segment style={{padding: '0em'}} basic vertical>
                <Grid columns='equal' stackable>
                    <Ref innerRef={this.contextRef}>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{paddingBottom: '5em', paddingTop: '1em'}}>
                                <Sticky context={this.contextRef} offset={100}>
                                    <RentalsFilter
                                        locations = {locations}
                                        suirChecked = {suirChecked}
                                        onTest = {this.onTest}
                                        getInput = {this.getInput}
                                    />
                                </Sticky>
                            </Grid.Column>
                            <Grid.Column width={12} style={{padding: '1em'}} >
                                <RentalsSearch
                                    handleSearchChange = {this.handleSearchChange}
                                />
                                {_.isEmpty(results) ? <Empty style={{paddingTop: "20em"}} description="No data found"/> : null}
                                <RentalsDisplay
                                    results = {results}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Ref>
                </Grid>
            </Segment>
        )
    }

}