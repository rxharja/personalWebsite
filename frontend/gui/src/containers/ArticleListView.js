import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import WideArticle from '../components/WideArticle';
import ThinArticle from '../components/ThinArticle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddBlogButton from '../components/buttons/AddBlogButton';
import { connect } from 'react-redux';

const url_to_render = 'http://127.0.0.1:8000/api/articles/';

class ArticleList extends React.Component {
  state = {
    articles: [],
    anchorEl: null,
    open: false
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

  renderArticles = articles => {
    return (
      <div>
      {
        articles.map((article, index) => {
          return <div key={index}>
            <img src="https://unsplash.it/150/150" alt="" />
            <p>{article.title}</p>
            <p>{article.content}</p>
            <p>date created: {article.created}</p>
            <p>by: Redon Xharja</p>
            <hr />
          </div>
        })
      }
      </div>
    )
  }

  render(props){
    const articles = []
    this.state.articles.forEach(article => {articles.push(article)});
    console.log("props in articlelistview.js", this.props)

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
            {articles.length > 0 ?
              this.renderArticles(articles)
              :
              <Typography>Nothing to Display! Check back later for more content!</Typography>
            }
          </Grid>
        </Grid>
        {this.props.isAuthenticated ? <AddBlogButton token={this.props.token} articleID={this.state.articles.length + 1}/> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token
  }
}

export default connect(mapStateToProps, null)(ArticleList)