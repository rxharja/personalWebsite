import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class NormalLoginForm extends React.Component {


  state = {
      user: {
          username: '',
          password: '',
      },
  };

  componentDidUpdate(prevProps) {
    if (this.props.loading === false && prevProps.loading === true) {
      if (!this.props.error) {
        this.props.history.push('/articles/');
      }
    }
  }

  handleChange = (event) => {
    const { user } = this.state;
    this.setState({ user });
    user[event.target.name] = event.target.value;
  }

  handleSubmit = (event) => {
      const { user } = this.state
      this.props.onAuth(user.username, user.password)
  }

  render() {
    let open = false;
    this.props.loading ? open = true : open = false

    let errorMessage = null;

    if ( this.props.error ) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    const { classes } = this.props;
    const { user } = this.state;

    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <ValidatorForm
            ref="form"
            className={classes.form}
            onSubmit={this.handleSubmit}
            onError={errors => console.log("there was a problem",errors)}
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

            <TextField
              autoComplete="current-password"
              variant="outlined"
              margin="normal"
              required
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

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              htmlType="submit"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/signup/" variant="body2">
                  {"Don't have an account? Sign Up"}
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

NormalLoginForm.propTypes = {
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
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NormalLoginForm));
