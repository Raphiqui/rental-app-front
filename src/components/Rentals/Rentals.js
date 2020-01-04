import React, {Component, createRef,} from "react";
import {Grid, Ref, Segment, Sticky,} from 'semantic-ui-react';
import {Empty} from 'antd';
import _ from 'lodash';
import rentalApi from "../../api/rentalApi";
import RentalsFilter from "./RentalsFilter";
import RentalsSearch from "./RentalsSearch";
import RentalsDisplay from "./RentalsDisplay";
import Nav from "../Nav";
import moment from 'moment';

const checkFilter = (name, rentals, filters) => {

    const filterElements = {
        'location' : () => {
            return rentals.filter(rental => rental.location === filters.location);
        },
        'pool' : () => {
            return rentals.filter(rental => rental.facilities.isPoolAvailable === filters.pool);
        },
        'hot_tub' : () => {
            return rentals.filter(rental => rental.facilities.isHotTubAvailable === filters.hot_tub);
        },
        'price' : () => {
            return rentals.filter(rental => _.toNumber(filters.price[0]) <= rental.pricePerDay && rental.pricePerDay <= _.toNumber(filters.price[1]));
        },
        'dateSelected': () => {
            return rentals.map(rental => {
                if(!_.isEmpty(rental.rentingDates)){
                    let alrTakenDates = rental.rentingDates.map(dates => {
                        return !(!_.includes(filters.dateSelected, dates.from) && !_.includes(filters.dateSelected, dates.to));
                    });
                    if(!_.includes(alrTakenDates, true)){
                        return rental;
                    }
                }else{
                    return rental;
                }
            });
        },
    };

    return filterElements[name]();
};

export default class Rentals extends Component{

    //TODO: tweak the filters to fetch the check method
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
            }else{return null}
        });

        this.setState({
            results: _.compact(founds),
        });
    };

    onChangeSlider = (value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                price: value
            }
        }))
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

    // TODO: Tweak checkboxes for facilities to radio and handle the price slider into filters
    handleSubmit = () => {
        const filterKeys = Object.keys(this.state.filters);

        let results = this.state.rentals;

        _.map(filterKeys, filterKey => {
            results = checkFilter(filterKey, results, this.state.filters);
        });

        this.setState({
            results: results,
        });
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

        const { locations, results, filters, rentals } = this.state;

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
                                            rentals={rentals}
                                            locations = {locations}
                                            dropdownValue={filters.location}
                                            handleSubmit = {this.handleSubmit}
                                            clearFilters={this.clearFilters}
                                            handleDropdown = {this.handleDropdown}
                                            handleCheckbox = {this.handleCheckbox}
                                            onChangeDate={this.onChangeDate}
                                            onChangeSlider={this.onChangeSlider}
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