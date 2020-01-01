import React, { Component } from "react";
import {Segment, Form, Select, Button} from 'semantic-ui-react';
import {Slider, DatePicker} from "antd";
import _ from 'lodash';

export default class RentalsFilter extends Component{

    constructor() {
        super();
        this.state ={
            filters: {
                location: '',
                radio: 'all',
            }
        };
    }


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