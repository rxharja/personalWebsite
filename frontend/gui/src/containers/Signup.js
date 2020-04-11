import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class RegistrationForm extends React.Component {
  state = {
      user: {
          username: '',
          email: '',
          password: '',
          confirm: ''
      },
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      console.log('this is mounted');
        if (value !== this.state.user.password) {
            return false;
        }
        return true;
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading === false && prevProps.loading === true) {
      if (!this.props.error) {
        this.props.history.push('/articles/');
      }
    }
  }

  componentWillUnmount() {
      // remove rule when it is not needed
      ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  handleChange = (event) => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  handleSubmit = (event) => {
    const { user } = this.state
    this.props.onAuth(user.username,
                      user.email,
                      user.password,
                      user.confirm);
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    let open = false;
    this.props.loading ? open = true : open = false

    let errorMessage = null;

    if ( this.props.error ) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ValidatorForm
            ref="form"
            className={classes.form}
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >

            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={this.handleChange}
              id="username"
              label="Username"
              name="username"
              value = {user.username}
              autoComplete="username"
              validators={['required']}
              errorMessages={["Can't sign you in with no username"]}
              autoFocus
            />

            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={this.handleChange}
              id="email"
              label="Email"
              name="email"
              value = {user.email}
              autoComplete="email"
              validators={['required','isEmail']}
              errorMessages={['Oops, the email field was left blank!',"Doesn't look like a proper email?"]}
              autoFocus
            />

            <TextValidator
              autoComplete="current-password"
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              value = {user.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              id="confirm"
              label="Confirm Password"
              value = {user.confirm}
              onChange={this.handleChange}
              name="confirm"
              type="password"
              validators={['isPasswordMatch','required']}
              errorMessages={["Uh oh, looks like the passwords don't match!",'Make sure to not miss this one!']}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              htmlType="submit"
              className={classes.submit}
            >
              Sign up
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login/" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>

          </ValidatorForm>
      </div>
      {errorMessage}
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegistrationForm)));
