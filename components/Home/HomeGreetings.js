import React, { Component } from "react";
import {Header, Container,} from 'semantic-ui-react';

export default class HomeGreetings extends Component{

    render() {

        return (
            <Container textAlign='center'>
                <Header as='h3' style={{fontSize: '2em'}}>
                    Welcome
                </Header>
                <p style={{fontSize: '1.33em'}}>We're here to help you find the best place for
                    your holidays, journey, stays, events...</p>
            </Container>
        )
    }
}