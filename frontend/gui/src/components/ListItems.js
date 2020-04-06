import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link } from 'react-router-dom';

const ListItems = (props) => {
  return (
    <div>

    {
      props.isAuthenticated ?

      <ListItem button onClick={props.logout}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      :

      <Link to="/login" style={{color: '#fff'}}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      </Link>
    }

      <Link to="/" style={{color: '#fff'}}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      </Link>

      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Resume" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>

      <Link to="/articles" style={{color: '#fff'}}>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </Link>
    </div>
  );
}

export default ListItems;
