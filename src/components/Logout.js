import React, { Component } from "react";
import { Redirect  } from "react-router-dom";

export default class Logout extends Component{

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        try {
            sessionStorage.removeItem('currentUser');
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        return <Redirect to={`/`}/>
    }

}