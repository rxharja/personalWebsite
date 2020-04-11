import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    height: "52vh",
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
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
                <Link><NavLink to="/login/" variant="body2" style={{color:"inherit",textDecoration:"inherit"}}>
                  {"Already have an account? Log in"}
                </NavLink></Link>
              </Grid>
            </Grid>

          </ValidatorForm>
      </div>
      {errorMessage}
    </Grid>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>

    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegistrationForm));
