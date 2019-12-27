import React, { Component } from "react";
import userApi from '../../api/userApi.js';

export default class Connected extends Component{

    constructor(match) {
        super(match);
        this.state = {
            test: match,
            user: null,
        }
    }

    componentDidMount = async () => {
        let userapi = new userApi();

        let response;
        try{
            response = await userapi.fetchUser(this.state.test.match.params.id);
            this.setState({user: response.data})
        }catch (e) {
            console.error(e)
        }
    };

    render() {
        return(
            <div>{this.state.user !== null ? <h1>Welcome {this.state.user.surname}</h1> : null}</div>
        );
    }

}