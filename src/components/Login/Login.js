import React, { Component } from "react";
import userApi from '../../api/userApi.js';
import { Button, Form, Grid, Header, Segment, Message,  } from 'semantic-ui-react';
import { Redirect  } from "react-router-dom";

export default class Login extends Component{

    constructor() {
        super();
        this.state = {
            isDisabled: false,
            isConnected: null,
            userInfos: null,
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        let userapi = new userApi();

        const login = event.target.login.value;
        const password = event.target.password.value;
        let response;
        try{
            response = await userapi.login({login, password});
            if(!("error" in response)){
                this.setState({isConnected: true, userInfos: response.data})
            }else{
                this.setState({isNotConnected: true, })
            }
        }catch (e) {
            console.error(e);
        }
    };

    render() {

        const {isConnected, isNotConnected, userInfos } = this.state;

        if(isConnected){
            return <Redirect to={`/users/${userInfos._id}`} />
        }else{
            return (

                <Grid textAlign='center' style={{ height: '80vh'}} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 500 }}>
                        {isNotConnected
                            ? <Message
                                negative
                                header='Wrong password or login'
                            />
                            : null}
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='login' name='login'/>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='password'
                                    name='password'
                                    type='password'
                                />

                                <Button color='teal' fluid size='large'>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            )
        }
    }

}