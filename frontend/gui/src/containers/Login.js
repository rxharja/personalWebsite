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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const useStyles = makeStyles((theme) => ({
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
}));

const NormalLoginForm = (props) => {

  let state = {
      user: {
          username: '',
          password: '',
      },
  };

  const createForm = () => {
    return (
      <div><form></form></div>
    )
  }


  const handleChange = (event) => {
    const { user } = state;
    user[event.target.name] = event.target.value;
    state.user = user;
  }

  const handleSubmit = (event) => {
    if (props.error) {
      event.preventDefault();
    } else {
      const { user } = state
      props.onAuth(user.username, user.password);
      props.history.push('/articles/');
    }
  }

  const classes = useStyles();

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
            ref={createForm}
            className={classes.form}
            onSubmit={handleSubmit}
          >

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
              onChange={handleChange}
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
      </Container>
    );
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
