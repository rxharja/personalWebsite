import React from 'react';
import axios from 'axios';

import Articles from '../components/Article';
import CustomForm from '../components/Form';


const url_to_render = 'http://127.0.0.1:8000/api/';

class ArticleList extends React.Component {
  state = {
    articles: []
  }

  componentDidMount() {
    console.log("in articellist", this.props)
    axios.get(url_to_render)
      .then(res => {
          this.setState({
            articles: res.data
          });
    })
  }

  render() {
    return (
      <div>
        <Articles data={this.state.articles} />
        {
          !this.props.isAuthenticated ?
          <div>
          <br />
          <h2>Create an article</h2>
          <CustomForm
            requestMethod="post"
            articleID={null}
            btnText="Create" />
          </div>
          :
          <br />
        }
      </div>
    );
  }
}

export default ArticleList
