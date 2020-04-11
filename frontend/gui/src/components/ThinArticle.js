import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: "400px",
    position: "relative"
  },
  links: {
    color: "inherit",
    textDecoration: "none"
  },
  actionArea: {
    position: "absolute",
    top: "0px",
    height: "300px"
  }
});

const ThinArticle = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <a className={classes.links} href={"articles/"+props.id}><CardActionArea className={classes.actionArea}>
        <CardMedia
          component="img"
          alt={props.description}
          height="300"
          image="https://unsplash.it/400/400"
          title={props.title}
        />
        <CardContent >
          <Typography color="textPrimary" gutterBottom variant="h5" component="h4">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea></a>
    </Card>
  );
}

export default ThinArticle;
