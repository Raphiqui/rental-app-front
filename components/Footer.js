import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import { Container, Header, Segment, List, Grid,  } from 'semantic-ui-react';

export default class Footer extends Component {

    render() {

        return (
            <Segment inverted vertical style={{padding: '2em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About'/>
                                <List link inverted>
                                    <List.Item as={ NavLink } to="/about" >Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Footer Header
                                </Header>
                                <p>
                                    All the team is very happy to work in this company
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}