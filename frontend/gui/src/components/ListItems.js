import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BookIcon from '@material-ui/icons/Book';
import { NavLink } from 'react-router-dom';

const ListItems = (props) => {
  return (
    <div>
      <ListSubheader inset>Redon Xharja</ListSubheader>
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <img
          src="https://unsplash.it/300/300"
          style={{borderRadius:"100%", width:"90%"}}
          alt="Avatar"
           />
      </div>
      <br />
    <Divider />
    {
      props.isAuthenticated ?

      <ListItem button onClick={props.logout}>
        <ListItemIcon>
          <CenterFocusWeakIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      :

      <NavLink to="/login/" style={{color: 'inherit',textDecoration:'none'}}>
        <ListItem button>
          <ListItemIcon>
            <CenterFocusStrongIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </NavLink>
    }

      <NavLink to="/" style={{color: 'inherit', textDecoration:'none'}}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>

      <ListItem button>
        <ListItemIcon>
          <RecentActorsIcon />
        </ListItemIcon>
        <ListItemText primary="Resume" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>

      <NavLink to="/articles/" style={{color: 'inherit', textDecoration:'none'}}>
        <ListItem button>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </NavLink>
    </div>
  );
}

export default ListItems;
