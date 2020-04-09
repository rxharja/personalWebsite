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
});

const ThinArticle = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <a href={"articles/"+props.id}><CardActionArea style={{position:"absolute",top:"0px", height:"300px"}}>
        <CardMedia
          component="img"
          alt={props.description}
          height="300"
          image="https://unsplash.it/400/400"
          title={props.title}
        />
      <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
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
