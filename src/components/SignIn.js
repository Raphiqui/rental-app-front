import React, { Component } from 'react'
import {Button, Form, Grid, Header, Segment, Popup, Message,  } from 'semantic-ui-react';
import _ from 'lodash';
import userApi from "../api/userApi.js";
import { DatePicker, message } from 'antd';
import { Redirect  } from "react-router-dom";
import Nav from './Nav';
const isValidBirthdate = require('is-valid-birthdate');

// const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
// const validIntegerRegex = RegExp(/^[0-9]*$/);
const validStringRegex = RegExp(/[^A-Za-z]/);
const validPhoneRegex = RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im);

const validateForm = (errors) => {
    let valid = true;

    Object.values(errors).forEach(
        (val) => {
            if(!_.isNull(val)){valid = false}
        }
    );
    return valid;
};

const getFormElement = (name, value, errors) => {

    const elements = {
        'name' : () => {
            errors.name =
                _.isEmpty(value)
                    ? null
                    : value.length < 5
                    ? 'Name must be 5 characters long!'
                    : validStringRegex.test(value)
                        ? 'No special character or blanks are allowed'
                        : null;
            return errors.name
        },
        'surname' : () => {
            errors.surname =
                _.isEmpty(value)
                    ? null
                    : validStringRegex.test(value)
                    ? 'No special character or blanks are allowed'
                    : null;
            return errors.surname
        },
        // 'age' : () => {
        //     errors.age =
        //         _.isEmpty(value)
        //             ? null
        //             : validIntegerRegex.test(parseInt(value))
        //                 ? null
        //                 : 'Age must be a number';
        //     return errors.age
        // },
        'phone_number' : () => {
            errors.phone_number =
                _.isEmpty(value)
                    ? null
                    : validPhoneRegex.test(value)
                    ? null
                    : 'Wrong phone number';
            return errors.phone_number
        },
    };

    if (!(name in elements)) {return null;}else{return elements[name]();}
};

export default class SignIn extends Component{

    constructor(props) {
        super(props);
        this.state = {
            errors: {
                name: null,
                surname: null,
                age: null,
                birth_date: null,
            },
        };
    }

    handleChange = (event) => {
        event.preventDefault(); // Why ??????
        const { name, value } = event.target;
        let errors = this.state.errors;

        const issue = getFormElement(name, value, errors);
        this.setState({errors: { [name]: issue }});
        this.setState({errors, [name]: value});
    };

    onPanelChange = () => {
        console.info('hey')
    };

    handleSubmit = async (event) => {
        let dataToSend = {};

        _.map(event.target.elements, input => {
            if(!_.isEmpty(input.name)){
                dataToSend[input.name] = input.value;
            }
        });

        if(validateForm(this.state.errors) && !_.isEmpty(dataToSend["birth_date"])) {
            console.info('Valid Form');
            console.info({dataToSend});

            let userapi = new userApi();

            let response;
            try{
                response = await userapi.createUser(dataToSend);
                console.log({response});
                if(!("error" in response)){
                    this.setState({userInfos: response.data, successfullyCreated: true, unsuccessfullyCreated: false})
                }else{
                    this.setState({userInfos: response.data, unsuccessfullyCreated: true, successfullyCreated: false})
                }
            }catch (e) {
                console.error(e);
                this.setState({userInfos: response.data, unsuccessfullyCreated: true, successfullyCreated: false})
            }

        }else{
            if(_.isNull(this.state.errors.birth_date)){
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        birth_date: 'A date must be selected as birth date.',
                    }
                }), () => {
                    this.displayAgeError();
                });
            }else{
                this.displayAgeError();
            }

            console.error('Invalid Form');
        }
    };

    displayAgeError = () => {
        message.error(this.state.errors.birth_date, 5);
    };

    onChange = (date, dateString) => {
        if(isValidBirthdate(dateString, { minAge: 18 })){
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    birth_date: null,
                }
            }));
        }else if (_.isEmpty(dateString)){
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    birth_date: 'A date must be selected as birth date.'
                }
            }))
        }else{
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    birth_date: 'Minimal age is 18 years old.'
                }
            }));
        }
    };

    render() {
        const {errors, successfullyCreated, unsuccessfullyCreated } = this.state;

        if(sessionStorage.getItem('currentUser') !== null) {
            return <Redirect to={`/`}/>
        }else{
            return (
                <div>

                    <Nav/>

                    <Grid textAlign='center' style={{ marginTop: '60px' }} verticalAlign='middle'>
                        <Segment raised style={{ width: 600 }} >

                            {successfullyCreated
                                ? <Message positive>
                                    <Message.Header>User successfully created</Message.Header>
                                </Message>
                                : null
                            }

                            {unsuccessfullyCreated
                                ? <Message negative>
                                    <Message.Header>This login is already taken, please try another one</Message.Header>
                                </Message>
                                : null
                            }

                            <Grid.Column>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Account creation
                                </Header>
                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Input
                                        required
                                        onChange={this.handleChange}
                                        error={errors.name}
                                        fluid
                                        label='Name'
                                        name='name'
                                        placeholder='Alexis'
                                    />
                                    <Form.Input
                                        required
                                        onChange={this.handleChange}
                                        error={errors.surname}
                                        fluid
                                        label='Surname'
                                        name='surname'
                                        placeholder='Dervault'
                                    />
                                    {/*<Form.Input*/}
                                    {/*required*/}
                                    {/*onChange={this.handleChange}*/}
                                    {/*error={errors.age}*/}
                                    {/*fluid*/}
                                    {/*label='Age'*/}
                                    {/*name='age'*/}
                                    {/*placeholder='32'*/}
                                    {/*/>*/}
                                    <h4><b>Birth date</b></h4>
                                    <DatePicker
                                        style={{marginBottom: '1em'}}
                                        onChange={this.onChange}
                                        onPanelChange={this.onPanelChange}
                                        error={errors.birth_date}
                                        label='Birth date'
                                        name='birth_date'
                                    />
                                    <Form.Input
                                        required
                                        onChange={this.handleChange}
                                        error={errors.address}
                                        fluid
                                        label='Address'
                                        name='address'
                                        placeholder='51 rue example'
                                    />
                                    <Popup
                                        content='
                                Valid formats : (123) 456-7890 | (123)456-7890 | 123-456-7890 | 123.456.7890 | 1234567890 | +31636363634'
                                        trigger={
                                            <Form.Input
                                                required
                                                onChange={this.handleChange}
                                                error={errors.phone_number}
                                                fluid
                                                label='Phone'
                                                name='phone_number'
                                                placeholder='+33601020304'
                                            />
                                        }
                                    />
                                    <Form.Input
                                        required
                                        onChange={this.handleChange}
                                        error={errors.login}
                                        fluid
                                        label='Login'
                                        name='login'
                                    />
                                    <Form.Input
                                        required
                                        onChange={this.handleChange}
                                        error={errors.password}
                                        fluid
                                        label='Password'
                                        name='password'
                                    />
                                    <Button type='submit' primary>Submit</Button>
                                </Form>
                            </Grid.Column>
                        </Segment>
                    </Grid>
                </div>
            );
        }
    }
}