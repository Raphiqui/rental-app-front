import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav.js';
import About from './components/About.js';
import Home from './components/Home/Home.js';
import Login from "./components/Login/Login.js";
import Rentals from "./components/Rentals/Rentals.js";
import RentalDetail from './components/Rentals/Rental/Rental';
import Connected from "./components/Login/Connected";
import 'antd/dist/antd.css';
import SignIn from "./components/SignIn";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/rentals" exact component={Rentals}/>
                    <Route path="/rentals/:id" component={RentalDetail}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/users/:id" component={Connected}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
