import React, { Component } from "react";
import {Image, } from 'semantic-ui-react';
import _ from 'lodash';
// const Jimp = require("jimp");

export default class HomeImagesDisplay extends Component{

    render() {

        const { images } = this.props;

        return (
            <Image.Group size='big' style={{ marginTop: '60px'}}>
                {_.map(images, image => {
                    return (
                        <Image
                            key={image}
                            src={image}
                        />
                    )
                })}
            </Image.Group>
        )
    }
}