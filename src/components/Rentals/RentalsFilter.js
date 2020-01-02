import React, { Component } from "react";
import {Segment, Form, Select, Button} from 'semantic-ui-react';
import {Slider, DatePicker} from "antd";
import _ from 'lodash';
import moment from 'moment';

export default class RentalsFilter extends Component{

    constructor() {
        super();
        this.state ={
            filters: {
                location: '',
                radio: 'all',
            },
            disableDate: null
        };
    }

    onChange = (date, dateString) => {
        console.log(date);
        this.setState({disableDate: date})
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
        const { RangePicker } = DatePicker;
        const {locations, suirChecked, value} = this.props;

        return (
            <Segment raised style={{marginLeft: "30px"}}>
                <Form onSubmit={this.props.handleSubmit} >
                    <h3>Find your perfect place using the filter</h3>
                    <Form.Field
                        onChange={this.props.handleDropdown}
                        value={this.props.dropdownValue}
                        placeholder='Select where'
                        control={Select}
                        label="Location"
                        name="location"
                        options={locations}
                    />
                    <Form.Field>
                        <label>When</label>
                        <RangePicker
                            onChange={this.onChange}
                            disabledDate={this.disabledDate}
                            size="large"
                        />
                    </Form.Field>
                    <Form.Group grouped>
                        <label>Facilities</label>
                        <Form.Field label='Pool' name="pool" control='input' type='checkbox' onChange={this.props.handleCheckbox} />
                        <Form.Field label='Hot tub' name="hot_tub" control='input' type='checkbox' onChange={this.props.handleCheckbox} />
                    </Form.Group>
                    <Form.Group grouped>
                        <label>More options</label>
                        <Form.Radio
                            label='Rentals available'
                            name="available"
                            value='available'
                            checked={value === 'available'}
                            onChange={this.props.handleRadio}
                        />
                        <Form.Radio
                            label='Rentals not available'
                            name="notAvailable"
                            value='notAvailable'
                            checked={value === 'notAvailable'}
                            onChange={this.props.handleRadio}
                        />
                        <Form.Radio
                            label='All rental'
                            name="all"
                            value='all'
                            checked={value === 'all'}
                            onChange={this.props.handleRadio}
                        />
                    </Form.Group>
                    <Form.Button disabled={_.isEmpty(this.props.filters.location)} color="blue">Submit</Form.Button>
                    {/*<List>*/}
                        {/*<List.Item>*/}
                            {/*<label style={{ fontWeight: "bold" }} >Rental's price</label>*/}
                            {/*<Slider*/}
                                {/*range*/}
                                {/*step={1}*/}
                                {/*max={1000}*/}
                                {/*defaultValue={[20, 50]}*/}
                                {/*onChange={this.onChange}*/}
                            {/*/>*/}
                        {/*</List.Item>*/}
                        {/*<List.Item>*/}
                            {/*<label style={{ fontWeight: "bold" }}>When ?</label>*/}
                            {/*<br/>*/}
                            {/*<RangePicker*/}
                                {/*size="large"*/}
                            {/*/>*/}
                        {/*</List.Item>*/}
                        {/*<Button onClick={this.props.onTest} style={{ marginTop: '3px'}}>Search</Button>*/}
                    {/*</List>*/}
                </Form>

                {_.isEqual(JSON.stringify(this.state.filters), JSON.stringify(this.props.filters))
                    ? null
                    : <Button
                        circular
                        color="red"
                        onClick={this.props.clearFilters}
                        style={{marginTop: "10px"}}
                    >
                        Clear all the filters
                    </Button>
                }
            </Segment>
        )
    }
}