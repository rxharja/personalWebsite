import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "250px",
    display: 'flex',
  },
  area: {
    minHeight: "250px",
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    height: "100%",

  },
  content: {
    flex: '1 0 auto',
    maxWidth: "150px",
    minHeight: "250px",
  },
  cover: {
    width: "100%",
    float: "right",
  },
}));

const WideArticle = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <div className={classes.details}>
        <a href={"articles/"+props.id}><CardActionArea>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.description}
            </Typography>
          </CardContent>
          </CardActionArea></a>
        </div>
        <CardMedia
          alt={props.description}
          className={classes.cover}
          image="https://unsplash.it/800/400"
          title={props.title}
        />
    </Card>
  );
}

export default WideArticle;
