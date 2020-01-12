import React, { Component } from "react";
import { Container, Divider, Segment } from "semantic-ui-react";
import Nav from './Nav';
import Map from "./Map";

export default class About extends Component {

    render() {

        return (
            <div className="About">

                <Nav/>

                <Segment style={{padding: '8em 0em'}} vertical>
                    <Container text>
                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{margin: '3em 0em', textTransform: 'uppercase'}}
                        >
                            <p>Address</p>
                        </Divider>
                        <p style={{fontSize: '1.33em'}}>
                            21 Rue de la Boustifaille
                            <br/>
                            75000 Paris
                        </p>
                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{margin: '3em 0em', textTransform: 'uppercase'}}
                        >
                            <p>Phone number</p>
                        </Divider>
                        <p style={{fontSize: '1.33em'}}>
                            +33 01 02 03 04 05
                        </p>
                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{margin: '3em 0em', textTransform: 'uppercase'}}
                        >
                            <p>Location</p>
                        </Divider>

                        <Map/>

                    </Container>
                </Segment>
            </div>
        );
    }
}