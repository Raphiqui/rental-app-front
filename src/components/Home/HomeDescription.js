import React, { Component } from "react";
import {Grid, Header, Segment, Container, Step, } from 'semantic-ui-react';
import {NavLink} from "react-router-dom";

export default class HomeDescription extends Component{

    render() {

        return(
            <div>
                <Segment style={{padding: '4em 0em'}} vertical>
                    <Container textAlign='center'>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            How does it work?
                        </Header>
                        <Step.Group ordered size='big'>
                            <Step active as={ NavLink } to="/rentals">
                                <Step.Content>
                                    <Step.Title>Searching</Step.Title>
                                    <Step.Description>Click here to move to our selection page</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled>
                                <Step.Content>
                                    <Step.Title>Filtering</Step.Title>
                                    <Step.Description>Use our filter to find your perfect place</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled>
                                <Step.Content>
                                    <Step.Title>Confirm your choice</Step.Title>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                        <Step.Group ordered size='big'>
                            <Step disabled as={ NavLink } to="/rentals">
                                <Step.Content>
                                    <Step.Title>Searching</Step.Title>
                                    <Step.Description>Click here to move to our selection page</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active>
                                <Step.Content>
                                    <Step.Title>Filtering</Step.Title>
                                    <Step.Description>Use our filter to find your perfect place</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled>
                                <Step.Content>
                                    <Step.Title>Confirm your choice</Step.Title>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                        <Step.Group ordered size='big'>
                            <Step disabled as={ NavLink } to="/rentals">
                                <Step.Content>
                                    <Step.Title>Searching</Step.Title>
                                    <Step.Description>Click here to move to our selection page</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled>
                                <Step.Content>
                                    <Step.Title>Filtering</Step.Title>
                                    <Step.Description>Use our filter to find your perfect place</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active>
                                <Step.Content>
                                    <Step.Title>Confirm your choice</Step.Title>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </Container>
                </Segment>
                <Segment style={{padding: '0em'}} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    "What a Company"
                                </Header>
                                <p style={{fontSize: '1.33em'}}>That is what they all say about us</p>
                            </Grid.Column>
                            <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    "I shouldn't have gone with their competitor."
                                </Header>
                                <p style={{fontSize: '1.33em'}}>
                                    Chief Fun Officer Acme Toys
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}