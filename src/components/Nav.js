import React, {PureComponent} from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Container, Icon, Menu, Responsive, Segment, Sidebar, Visibility, } from 'semantic-ui-react';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

class DesktopContainer extends PureComponent {
    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount(){
        if(sessionStorage.getItem('currentUser') != null){
            this.setState({loggedIn: true});
        }
        else{
            this.setState({loggedIn: false});
        }
    }

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        console.info(sessionStorage.getItem("currentUser"));

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 80, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item as={ NavLink } exact to="/">
                                    Home
                                </Menu.Item>
                                <Menu.Item as={ NavLink } to="/rentals">Rentals</Menu.Item>

                                {sessionStorage.getItem('currentUser') !== null
                                    ? <Menu.Item position="right">
                                        <Button as={ NavLink } to="/logout" inverted={!fixed}>
                                            Log out
                                        </Button>
                                    </Menu.Item>
                                    : <Menu.Item position="right">
                                        <Button as={ NavLink } to="/login" inverted={!fixed}>
                                            Log in
                                        </Button>
                                        <Button as={ NavLink } to="/signin" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                            Sign Up
                                        </Button>
                                    </Menu.Item>
                                }
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

class MobileContainer extends PureComponent {
    constructor() {
        super();
        this.state = {
        }
    }

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    render() {
        const { children } = this.props;
        const { sidebarOpened, fixed } = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                    <Menu.Item as={ NavLink } to="/rentals">Rentals</Menu.Item>
                    <Menu.Item as={NavLink} to="/login">Log in</Menu.Item>
                    <Menu.Item as={ NavLink } to="/signin">Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as={ NavLink } to="/login" inverted={!fixed}>
                                        Log in
                                    </Button>
                                    <Button as={ NavLink } to="/signin" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (

    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

export default ResponsiveContainer