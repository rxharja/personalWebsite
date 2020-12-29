import React from 'react';
import clsx from 'clsx';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from '../components/ListItems';
import Socialmediaicons from '../components/SocialMediaIcons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import getPage from '../hooks/get-page';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Redon Xharja
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: 0
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


// class CustomLayout extends React.Component {
const CustomLayout = (props) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [currentTheme, setCurrentTheme] = React.useState('dark');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let pageTheme = createMuiTheme({
    palette: {
      type: currentTheme,
      primary: {
        main: '#50b2c0',
      },
      secondary: {
        main: '#ff4000',
      }
    },
  });
  const handleThemeChange = () => {
    currentTheme === 'dark' ? setCurrentTheme('light') : setCurrentTheme('dark')
  }

  const pageSub = getPage(props.history).sub;

  return (
    <ThemeProvider theme={pageTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" style={{background: "secondary"}} className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {pageSub}
          </Typography>
          <Socialmediaicons />
        </Toolbar>
        </AppBar>
        <Drawer
          variant={ useMediaQuery('(max-width:600px)') ? "temporary" : "permanent" }
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            {
              useMediaQuery('(max-width:600px)') ?
              <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton> : ""
            }
            <Divider />
          </div>
          <Divider />
          <List>
            <ListItems {...props}/>
            <Divider />
            <ListSubheader inset>Settings</ListSubheader>
            <ListItem button onClick={handleThemeChange} >
              <ListItemIcon>
              <SettingsBrightnessIcon />
              </ListItemIcon>
              <ListItemText primary="Change Theme" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
            {
              props.history.location.pathname !== "/" ?
              <div>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" style={{padding:"1em"}} className={classes.container}>
                  {props.children}
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </div>
            :
            <Container maxWidth={false} className={classes.container} style={{padding:0, margin:0}}>
              {props.children}
            </Container>
            }
        </main>
      </div>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch, event) => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout))
