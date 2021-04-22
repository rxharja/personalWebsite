import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';
import Button from '@material-ui/core/Button';
import CustomizedSnackbar from '../components/CustomizedSnackbar';
import AddBlogButton from '../components/buttons/AddBlogButton';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';


class ArticleDetail extends React.Component {

  state = {
    article: {},
    open: false
  }

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    const baseURL = 'http://127.0.0.1:8000/api/articles/';
    const articleID = this.props.match.params.articleID;
    const urlToRender = baseURL + articleID;
    axios.get(urlToRender)
      .then(res => {
          this.setState({
            article: res.data,
          });
    })
    console.log("the state", this.state)
  }

  handleDelete = (event, token, history) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log(config)
    const baseURL = 'http://127.0.0.1:8000/api/articles/';
    const articleID = this.props.match.params.articleID;
    const urlToRender = baseURL + articleID;
    axios.delete(urlToRender, config)
      .then(res => {
          this.setState({
            article: res.data
          });
      })
      .then(this.props.history.push("/"))
  }

  convertDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toString();
  }

  getImg = () => {
    return this.state.article.image;
    // let replacedImg = this.state.article.image
    // return replacedImg.replace("assets", "static")
  }

  showEditOpts = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    console.log(this.state);
    return (
      <div style={{padding:"0 15% 0 15%"}}>
        <div title={this.state.article.title}>
          <Typography variant="h2" component="h2">{this.state.article.title}</Typography>
          <Typography variant="subtitle1" component="i">{this.state.article.description}</Typography>
          <br />
          <Typography variant="subtitle2" component="i">Redon Xharja, published: {this.convertDate(this.state.article.created)}</Typography>
          <br />
          {/* <img src={this.getImg()} alt="" style={{width:"100%"}} /> */}
          <Typography>{this.getImg()}</Typography>
          <br />
          {/* this dangerouslySet call cannot go into production it is a recipe for disaster lol */}
          <div dangerouslySetInnerHTML={{ __html: this.state.article.content }} />
        </div>
        {this.props.isAuthenticated ?
        <div>
          <Button 
          variant="contained" 
          onClick={this.showEditOpts}>
            {this.state.open? "Hide Edit Options" : "Edit Article"}
          </Button>
          <AddBlogButton />
        </div>
        : 
        ""}
        {this.state.open ?
        <div>
        <CustomForm
          {...this.state.article}
          requestMethod="put"
          articleTitle={this.state.article.title}
          articleContent={this.state.article.content}
          articleID={this.props.match.params.articleID}
          token={this.props.token}
          btnText="Update" />
        <form onSubmit={(event) => this.handleDelete(event, this.props.token)}>
              <Button variant="outlined" color="secondary" type="submit">Delete</Button>
        </form>
        </div>
          : ""}

        <CustomizedSnackbar />
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

export default connect(mapStateToProps, null)(ArticleDetail)
