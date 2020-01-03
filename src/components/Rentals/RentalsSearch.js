import React, { Component } from "react";
import { Search,} from 'semantic-ui-react';
import _ from "lodash";

export default class RentalsSearch extends Component{

    render() {

        const { handleSearchChange } =this.props;

        return (
            <Search
                size="big"
                placeholder="Search by name"
                onSearchChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })}
                open={false}
            />
        )
    }
}