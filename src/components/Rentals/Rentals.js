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
            value: ''
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
        console.log(event.target.textContent)
    };

    onChange = (value) => {
        console.log('onChange: ', value);
    };

    async componentDidMount() {
        let rentalapi = new rentalApi();

        let response;

        try{
            response = await rentalapi.fetchRentals();
            if(!("error" in response)){
                this.setState({
                    results: response.data,
                    rentals: response.data
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

        const { suirChecked, results } = this.state;

        const friendOptions = [
            {
                key: 'Australia',
                text: 'Australia',
                value: 'Australia',
            },
            {
                key: 'Canada',
                text: 'Canada',
                value: 'Canada',
            },
            {
                key: 'Mongolia',
                text: 'Mongolia',
                value: 'Mongolia',
            },
        ];

        return (
            <Segment style={{padding: '0em'}} basic vertical>
                <Grid columns='equal' stackable>
                    <Ref innerRef={this.contextRef}>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{paddingBottom: '5em', paddingTop: '1em'}}>
                                <Sticky context={this.contextRef} offset={100}>
                                    <RentalsFilter
                                        friendOptions = {friendOptions}
                                        suirChecked = {suirChecked}
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