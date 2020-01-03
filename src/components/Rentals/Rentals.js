import React, {Component, createRef,} from "react";
import {Grid, Segment, Sticky, Ref, } from 'semantic-ui-react';
import { Empty } from 'antd';
import _ from 'lodash';
import rentalApi from "../../api/rentalApi";
import RentalsFilter from "./RentalsFilter";
import RentalsSearch from "./RentalsSearch";
import RentalsDisplay from "./RentalsDisplay";
import Nav from "../Nav";
import moment from 'moment';

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
                pool: false,
                hot_tub: false,
            }
        };
    }

    // Useful for sticky
    contextRef = createRef();

    handleSearchChange = (e, { value }) => {
        value = _.toLower(value);

        let founds = this.state.rentals.map(rental => {
            if(_.toLower(rental.name).match(value)){
                return rental
            }
        });

        this.setState({
            results: _.compact(founds),
        });
    };

    onChangeDate = (date, dateString) => {
        const currDate = moment(dateString[0]);
        const lastDate = moment(dateString[1]);
        let allDays = [currDate.format('YYYY-MM-DD')];
        while(currDate.add(1, 'days').diff(lastDate) < 0) {
            allDays = _.concat(allDays, currDate.clone().format('YYYY-MM-DD'));
        }
        allDays = _.concat(allDays, lastDate.format('YYYY-MM-DD'));
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                dateSelected: allDays
            }
        }))
    };

    clearFilters = () => {
        this.setState(prevState => ({
            filters: {
                location: '',
                pool: false,
                hot_tub: false,
            },
            results: prevState.rentals
        }));
    };

    handleDropdown = (e, { value }) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                location: value
            }
        }))
    };

    handleCheckbox = (e) => {
        const { name, checked } = e.target;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [name]: checked
            }
        }))
    };

    handleSubmit = () => {

        const resultsLocation = this.state.rentals.filter(rental =>
            rental.location === this.state.filters.location
            && rental.facilities.isPoolAvailable === this.state.filters.pool &&
            rental.facilities.isHotTubAvailable === this.state.filters.hot_tub);

        if(this.state.filters.dateSelected !== null) {

            let datesFiltering = resultsLocation.map(rental => {
                if(!_.isEmpty(rental.rentingDates)){
                    let alrTakenDates = rental.rentingDates.map(dates => {
                        return !(!_.includes(this.state.filters.dateSelected, dates.from) && !_.includes(this.state.filters.dateSelected, dates.to));
                    });
                    if(!_.includes(alrTakenDates, true)){
                        return rental;
                    }
                }else{
                    return rental;
                }
            });

            this.setState({
                results: _.compact(datesFiltering),
            });
        }else{
            this.setState({
                results: resultsLocation,
            });
        }
    };

    async componentDidMount() {
        let rentalapi = new rentalApi();

        let response;

        try{
            response = await rentalapi.fetchRentals();
            if(!("error" in response)){

                // with occurrences
                let locationsBuffer = response.data.map(rental => ({key: rental.location, text: rental.location, value: rental.location}));

                this.setState({
                    results: response.data,
                    rentals: response.data,
                    locations: [...new Map(locationsBuffer.map(item => [item.key, item])).values()], // clear occurrences
                })
            }

        }catch (e) {
            console.error(e);
        }
    };

    check = (event) => {
        console.info(event.target.checked)
    };

    render() {

        const { locations, results, filters } = this.state;

        return (
            <div>
                <Nav/>

                <Segment style={{padding: '0em'}} basic vertical>
                    <Grid columns='equal' stackable>
                        <Ref innerRef={this.contextRef}>
                            <Grid.Row textAlign='center'>
                                <Grid.Column style={{paddingBottom: '5em', paddingTop: '1em'}}>
                                    <Sticky context={this.contextRef} offset={100}>
                                        <RentalsFilter
                                            filters={filters}
                                            locations = {locations}
                                            dropdownValue={filters.location}
                                            handleSubmit = {this.handleSubmit}
                                            clearFilters={this.clearFilters}
                                            handleDropdown = {this.handleDropdown}
                                            handleCheckbox = {this.handleCheckbox}
                                            onChangeDate={this.onChangeDate}
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
            </div>
        )
    }

}