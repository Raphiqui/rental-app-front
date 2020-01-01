import React, { Component } from "react";
import {Dropdown, Checkbox, Button, Segment, List,  } from 'semantic-ui-react';
import {Slider, DatePicker} from "antd";

export default class RentalsFilter extends Component{

    render() {
        const { RangePicker } = DatePicker;
        const {locations, suirChecked} = this.props;

        return (
            <Segment raised style={{marginLeft: "30px"}}>
                <List>
                    <h3>Find your perfect place using the filter</h3>
                    <List.Item>
                        <label style={{ fontWeight: "bold" }} >Where do you want to go ?</label>
                        <Dropdown
                            placeholder='Select a place'
                            fluid
                            selection
                            onChange={this.props.getInput}
                            options={locations}
                        />
                    </List.Item>
                    <List.Item>
                        <Checkbox
                            label='Is available'
                            onChange={this.props.checked}
                        />
                    </List.Item>
                    <List.Item>
                        <label style={{ fontWeight: "bold" }} >Rental's price</label>
                        <Slider
                            range
                            step={1}
                            max={1000}
                            defaultValue={[20, 50]}
                            onChange={this.onChange}
                        />
                    </List.Item>
                    <List.Item>
                        <label style={{ fontWeight: "bold" }}>When ?</label>
                        <br/>
                        <RangePicker
                            size="large"
                        />
                    </List.Item>
                    <List.Item>
                        <label style={{ fontWeight: "bold" }}>More options</label>
                        <br/>
                        <Checkbox
                            checked={suirChecked}
                            onChange={this.check}
                            label='pool' />
                        <br/>
                        <Checkbox label='hot tub' />
                        <br/>
                        <Checkbox label='sauna' />
                    </List.Item>
                    <Button onClick={this.props.onTest} style={{ marginTop: '3px'}}>Search</Button>
                </List>
            </Segment>
        )
    }
}