import React, { Component } from "react";
import {Button, Card, Image, Icon,  } from 'semantic-ui-react';
import _ from 'lodash';
import {NavLink} from "react-router-dom";

export default class RentalsDisplay extends Component{

    render() {

        const { results } = this.props;

        return (
            <Card.Group style={{padding: '1em'}} itemsPerRow={2} >
                {_.map(results, result => {
                    return (    <Card key={result._id}>
                            <Card.Content>
                                <Image
                                    src={result.image.url}
                                    style={{ paddingBottom: '10px'}}
                                />
                                <Card.Header style={{fontSize: "25px"}}>{result.name}</Card.Header>
                                <Card.Meta style={{color: "blue", fontSize: "20px"}}>{result.location}</Card.Meta>
                                <Card.Description style={{fontSize: "16px"}}>{result.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <p style={{color: "blue", fontSize: "15px"}}>{}Price (from morning to morning) : {result.pricePerDay}<Icon name="euro" size="large"/></p>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button
                                        color='blue'
                                        as={ NavLink }
                                        to={`/rentals/${result._id}`}
                                    >
                                        More details
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        )
    }
}