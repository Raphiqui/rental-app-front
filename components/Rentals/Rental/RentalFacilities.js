import React, { Component } from "react";
import {Icon, Table,} from 'semantic-ui-react';

export default class RentalFacilities extends Component{

    render() {

        const { timeByFoot, timeByCar, timeByBicycle } = this.props;

        return (
            <Table celled striped size='large'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>Facilities</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='bed' size='big'/> Bedrooms
                        </Table.Cell>
                        <Table.Cell textAlign='center'>4</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='car' size='big'/> Car available (charges free)
                        </Table.Cell>
                        <Table.Cell textAlign='center'><Icon color='green' name='checkmark' size='big' /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='tint' size='big'/> Pool available (charges free)
                        </Table.Cell>
                        <Table.Cell textAlign='center'><Icon color='green' name='checkmark' size='big' /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='fire' size='big'/> Hot tub available (charges free)
                        </Table.Cell>
                        <Table.Cell textAlign='center'><Icon color='red' name='close' size='big' /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='food' size='big'/> Cooker available (charges free)
                        </Table.Cell>
                        <Table.Cell textAlign='center'><Icon color='red' name='close' size='big' /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='road' size='big'/> Near town
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {timeByCar} <br />
                            {timeByFoot} <br />
                            {timeByBicycle}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }
}