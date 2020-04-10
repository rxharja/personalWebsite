import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
import { Link } from 'react-router-dom';

const ListItems = (props) => {
  return (
    <div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        {
          window.innerWidth > 700 ? <Typography>Redon Xharja</Typography> : ""
        }
        <img
          src="https://unsplash.it/300/300"
          style={{borderRadius:"100%", width:"90%", margin:"0em 0 1em 0"}}
          alt="Avatar"
           />
      </div>
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

      <Link to="/login" style={{color: 'inherit',textDecoration:'none'}}>
      <ListItem button>
        <ListItemIcon>
          <CenterFocusStrongIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      </Link>
    }

      <Link to="/" style={{color: 'inherit', textDecoration:'none'}}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      </Link>

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

      <Link to="/articles" style={{color: 'inherit', textDecoration:'none'}}>
        <ListItem button>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </Link>
    </div>
  );
}

export default ListItems;
