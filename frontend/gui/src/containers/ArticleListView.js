import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import WideArticle from '../components/WideArticle';
import ThinArticle from '../components/ThinArticle';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CustomForm from '../components/Form';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  popover: {
    pointerEvents: 'none',
},
});

const url_to_render = 'http://127.0.0.1:8000/api/';

class ArticleList extends React.Component {
  state = {
    articles: [],
    anchorEl: null,
  }

  componentDidMount() {
    console.log(this.state);
    axios.get(url_to_render)
      .then(res => {
          this.setState({
            articles: res.data
          });
    })
  }

  render(){
    const { classes } = this.props;

    const handlePopoverOpen = (event) => {
      console.log("open",this.state,event.currentTarget);
      this.setState({anchorEl: event.currentTarget});
    };

    const handlePopoverClose = () => {
      console.log("close",this.state);
      this.setState({anchorEl:null});
    };

    const open = Boolean(this.state.anchorEl);

    const articles = []
    this.state.articles.forEach(article => {articles.push(article)});
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{height:"400px"}}>
            <div
              style={{backgroundImage:"url('https://unsplash.it/2000/400')",
                      backgroundPosition:"cover",
                      backgroundRepeat:"no-repeat",
                      height:"100%",
                      width:"100%",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center"}}
            >
              <Typography>Featured Blog Posts</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WideArticle {...articles.shift()}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WideArticle {...articles.shift()} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <ThinArticle {...articles.shift()}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ThinArticle {...articles.shift()}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ThinArticle {...articles.shift()}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ThinArticle {...articles.shift()}/>
          </Grid>
          <Grid item xs={12} style={{height:"400px"}}>
            <Typography>Additional Posts</Typography>
            <Divider />
            {this.state.articles.forEach(article => (
              <div>
                <img src="https://unsplash.it/150/150" alt=""/>
                <p>{article.title}</p>
                <p>{article.content}</p>
                <p>date created: </p>
                <p>by:</p>
              </div>
            ))}
          </Grid>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          style={{position:"absolute",bottom:"20px",right:"20px"}}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}>
          <AddIcon />
        </Fab>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Add a new blog post!</Typography>
        </Popover>
        <CustomForm
          requestMethod="post"
          articleID={null}
          btnText="Create" />
      </div>
    );
  }
}


ArticleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleList);
