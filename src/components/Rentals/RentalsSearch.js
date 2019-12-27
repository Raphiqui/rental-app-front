import React, { Component } from "react";
import { Search,} from 'semantic-ui-react';
import _ from "lodash";

export default class RentalsSearch extends Component{

    render() {

        return (
            <Search
                size="big"
                placeholder="Search by name"
                onSearchChange={_.debounce(this.props.handleSearchChange, 500, {
                    leading: true,
                })}
                open={false}
            />
        )
    }
}