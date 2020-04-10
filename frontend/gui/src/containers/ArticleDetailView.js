import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';
import Button from '@material-ui/core/Button';
import CustomizedSnackbar from '../components/CustomizedSnackbar';

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
    return (
      <div>
        <div title={this.state.article.title}>
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.description}</p>
          <p>{this.state.article.content}</p>
        </div>
        <CustomForm
          requestMethod="put"
          articleTitle={this.state.article.title}
          articleContent={this.state.article.content}
          articleID={this.props.match.params.articleID}
          btnText="Update" />
        <form onSubmit={this.handleDelete}>
          <Button variant="outlined" color="secondary" type="submit" >Delete</Button>
        </form>
        <CustomizedSnackbar />
      </div>
    );
  }
}

export default ArticleDetail
