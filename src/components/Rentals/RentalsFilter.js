import React, { Component } from "react";
import {Segment, Form, Select, Button, Icon} from 'semantic-ui-react';
import {Slider, DatePicker} from "antd";
import _ from 'lodash';
import moment from 'moment';

export default class RentalsFilter extends Component{

    constructor() {
        super();
        this.state ={
            filters: {
                location: '',
                pool: false,
                hot_tub: false,
            },
            disableDate: null
        };
    }

    disabledDate = (current) => {
        return current && current < moment().endOf('day');
    };

    render() {
        const { RangePicker } = DatePicker;
        const {locations, handleDropdown, dropdownValue, handleSubmit, onChangeDate, handleCheckbox, filters, rentals, onChangeSlider } = this.props;

        const rentalsPrice = rentals.map(rental => rental.pricePerDay);

        return (
            //TODO: clear display of rangepicker when click on clear filter button
            <Segment raised style={{marginLeft: "30px"}}>

                <h3>Find your perfect place using the filter</h3>

                <h4 style={{ fontWeight: "bold"}}>When</h4>
                <RangePicker
                    style={{marginBottom: '10px'}}
                    onChange={onChangeDate}
                    disabledDate={this.disabledDate}
                    size="large"
                    allowClear={false}
                />

                <h4 style={{ fontWeight: "bold"}}>Rental's price<Icon name="euro"/></h4>
                <Slider
                    range
                    step={1}
                    min={Math.min(...rentalsPrice)}
                    max={Math.max(...rentalsPrice)}
                    defaultValue={[20, 50]}
                    onAfterChange={onChangeSlider}
                />

                <Form onSubmit={handleSubmit} >
                    <Form.Field
                        onChange={handleDropdown}
                        value={dropdownValue}
                        placeholder='Select where'
                        control={Select}
                        label="Location"
                        name="location"
                        options={locations}
                    />
                    <Form.Group grouped>
                        <label>Facilities</label>
                        <Form.Field label='Pool' name="pool" checked={filters.pool} control='input' type='checkbox' onChange={handleCheckbox} />
                        <Form.Field label='Hot tub' name="hot_tub" checked={filters.hot_tub} control='input' type='checkbox' onChange={handleCheckbox} />
                    </Form.Group>
                    <Form.Button disabled={_.isEmpty(this.props.filters.location)} color="blue">Submit</Form.Button>
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