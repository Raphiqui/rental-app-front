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
                // radio: 'all',
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

    onChangeDate = (date, dateString) => {
        const allDays = [];
        const currDate = moment(dateString[0]);
        const lastDate = moment(dateString[1]);
        allDays.push(currDate.format('YYYY-MM-DD'));
        while(currDate.add(1, 'days').diff(lastDate) < 0) {
            allDays.push(currDate.clone().format('YYYY-MM-DD'));
        }
        allDays.push(lastDate.format('YYYY-MM-DD'));
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
                // radio: 'all',
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

    // handleRadio = (e, { value }) => {
    //     this.setState(prevState => ({
    //         filters: {
    //             ...prevState.filters,
    //             radio: value
    //         }
    //     }))
    // };

    onChange = (value) => {
        console.log('onChange: ', value);
    };

    checked = (data) => {
        this.setState({
            filters: { isAvailable: data.checked}
        })
    };

    handleSubmit = () => {

        const resultsLocation = this.state.rentals.filter(rental => rental.location === this.state.filters.location);
        if(this.state.filters.dateSelected !== null) {

            const oks = [];

            _.map(resultsLocation, rental => {
                if(!_.isEmpty(rental.rentingDates)){
                    let alrTakenDates = [];
                    _.map(rental.rentingDates, dates => {

                        if(!_.includes(this.state.filters.dateSelected, dates.from) && !_.includes(this.state.filters.dateSelected, dates.to)){
                            alrTakenDates.push(false);
                        }else{
                            alrTakenDates.push(true);
                        }
                    });
                    if(!_.includes(alrTakenDates, true)){
                        oks.push(rental)
                    }
                }else{
                    oks.push(rental)
                }
            });

            this.setState({
                results: oks,
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

        const { locations, suirChecked, results, filters } = this.state;

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
                                            suirChecked = {suirChecked}
                                            dropdownValue={this.state.filters.location}
                                            handleSubmit = {this.handleSubmit}
                                            clearFilters={this.clearFilters}
                                            value={filters.radio}
                                            handleDropdown = {this.handleDropdown}
                                            handleCheckbox = {this.handleCheckbox}
                                            // handleRadio={this.handleRadio}
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