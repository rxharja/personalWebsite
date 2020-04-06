import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'antd/dist/antd.css'
import * as actions from './store/actions/auth';

import CustomLayout from './containers/Layout'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  render() {
    return (
      <ThemeProvider theme={this.darkTheme}>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
