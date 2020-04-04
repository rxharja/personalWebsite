import React from 'react';
import axios from 'axios';

import { Button, Card } from 'antd';

import CustomForm from '../components/Form';

class ArticleDetail extends React.Component {
  state = {
    article: {}
  }

  componentDidMount() {
    const baseURL = 'http://127.0.0.1:8000/api/';
    const articleID = this.props.match.params.articleID;
    const urlToRender = baseURL + articleID;
    axios.get(urlToRender)
      .then(res => {
          this.setState({
            article: res.data
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
        <Card title={this.state.article.title}>
          <p>{this.state.article.description}</p>
          <p>{this.state.article.content}</p>
        </Card>
        <CustomForm
          requestMethod="put"
          articleID={this.props.match.params.articleID}
          btnText="Update" />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit" >Delete</Button>
        </form>
      </div>
    );
  }
}

export default ArticleDetail
