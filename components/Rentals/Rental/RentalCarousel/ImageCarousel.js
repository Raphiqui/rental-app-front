import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import _ from 'lodash';

import CustomDotGroup from "./CustomDotGroup";

export default class ImageCarousel extends Component{

    render() {

        const { pictsUrl } = this.props;

        return(
            <CarouselProvider
                naturalSlideWidth={10}
                naturalSlideHeight={6}
                totalSlides={_.size(pictsUrl)}
            >
                <Slider>
                    {_.map(pictsUrl, pictUrl => {
                        return(
                            <Slide key={pictUrl}>
                                <Image src={pictUrl} />
                            </Slide>
                        )
                    })}
                </Slider>

                <Divider />
                <CustomDotGroup slides={_.size(pictsUrl)} />
            </CarouselProvider>
        )
    }
}