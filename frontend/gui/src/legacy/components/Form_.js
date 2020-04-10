import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



import axios from 'axios';

class CustomForm extends React.Component {

  handleFormSubmit = (event, requestMethod, articleID) => {
    event.preventDefault();
    const url_to_render = 'http://127.0.0.1:8000/api/';
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;

    switch ( requestMethod ) {
      case 'post':
        return axios.post(url_to_render, {
          title: title,
          content: content
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

      case 'put':
        return axios.put(url_to_render+articleID+"/", {
          title: title,
          content: content
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

      // no default
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(
          event,
          this.props.requestMethod,
          this.props.articleID)}>
          <Form.Item label="Title">
            <Input name="title" placeholder="Title goes here" />
          </Form.Item>
          <Form.Item label="Content">
            <Input name="content" placeholder="Content goes here" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
}

export default CustomForm;
