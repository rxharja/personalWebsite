import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
  },
});


class CustomForm extends React.Component {

  handleFormSubmit = (event, requestMethod, articleID) => {
    // event.preventDefault();
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
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div className={classes.root}>
        <form className={classes.root}
          onSubmit={(event) => this.handleFormSubmit(
          event,
          this.props.requestMethod,
          this.props.articleID)}>
          <TextField
            className="field"
            id="title"
            name="title"
            label="Title"
            color="secondary"
            autoComplete="off"
            defaultValue={this.props.title ? this.props.title : ""}
            required
            fullWidth
          />
          <TextField
            id="content"
            name="content"
            label="Content"
            className="field"
            autoComplete="off"
            defaultValue={this.props.content ? this.props.content : ""}
            multiline
            required
            fullWidth
          />
        <Button style={{float:"left"}} variant="outlined" color="primary" type="submit">{this.props.btnText}</Button>
        </form>
      </div>
    );
  };
}

CustomForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(CustomForm);
