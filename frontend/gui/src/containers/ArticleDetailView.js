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
    open: null
  }

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    const baseURL = 'http://127.0.0.1:8000/api/';
    const articleID = this.props.match.params.articleID;
    const urlToRender = baseURL + articleID;
    axios.get(urlToRender)
      .then(res => {
          this.setState({
            article: res.data,
          });
    })
  }

  handleDelete = (event) => {
    const baseURL = 'http://127.0.0.1:8000/api/';
    const articleID = this.props.match.params.articleID;
    const urlToRender = baseURL + articleID;
    axios.delete(urlToRender)
      .then(res => {
          this.setState({
            article: res.data
          });
    })
    this.dom.history.push('/');
  }

  render() {
  console.log("in article details view", this.props);

    return (
      <div style={{padding:"0 15% 0 15%"}}>
        <div title={this.state.article.title}>
          <Typography variant="h2" component="h2">{this.state.article.title}</Typography>
          <Typography variant="i" component="i">{this.state.article.description}</Typography>
          <br />
          <Typography variant="i" component="i">Redon Xharja, published: {new Date().getDate()}</Typography>

          <br />
          <div dangerouslySetInnerHTML={{ __html: this.state.article.content }} />
        </div>
        {this.props.isAuthenticated ?
        <div>
        <CustomForm
          {...this.state.article}
          requestMethod="put"
          articleTitle={this.state.article.title}
          articleContent={this.state.article.content}
          articleID={this.props.match.params.articleID}
          btnText="Update" />
        <form onSubmit={this.handleDelete}>
          <Button variant="outlined" color="secondary" type="submit" >Delete</Button>
        </form>
        </div>
          : ""}

        <CustomizedSnackbar />
        <AddBlogButton />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps, null)(ArticleDetail)
