import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from './buttons/GitHubButton';
import FacebookButton from './buttons/FacebookButton';
import TwitterButton from './buttons/TwitterButton';
import LinkedInButton from './buttons/LinkedInButton';
import InstagramButton from './buttons/InstagramButton';

const useStyles = makeStyles((theme) => ({
  socialmedia: {
    display: "flex"
  },
}));

export default function SocialmediaButtons() {
  const classes = useStyles();

  return (

    <div className={classes.socialmedia}>
      <GitHubButton />
      <FacebookButton />
      <TwitterButton />
      <LinkedInButton />
      <InstagramButton />
    </div>
  );
}
