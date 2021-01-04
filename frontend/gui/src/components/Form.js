import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
  },
});


class CustomForm extends React.Component {
  state = {
    selectedFile:null,
  }

  handleFormSubmit = (event, articleID, requestMethod='post', token) => {
    // event.preventDefault();
    if (this.props.requestMethod) {
      requestMethod = this.props.requestMethod
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log(config)
    const url_to_render = 'http://127.0.0.1:8000/api/articles';
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const description = event.target.elements.description.value;
    const img = this.state.selectedFile;
    switch ( requestMethod ) {
      case 'post':
        console.log(title, description, img, content)
        return axios.post(url_to_render, {
          title: title,
          description: description,
          image: img,
          content: content
        }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))

      case 'put':
        return axios.put(url_to_render + "/" + articleID, {
          title: title,
          description: description,
          image: img,
          content: content
        }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))

      // no default
    }
  }
  
  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
  }; 
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.root}
          onSubmit={(event) => this.handleFormSubmit(
          event,
          this.props.articleID,
          this.props.requestMethod,
          this.props.token)}>
          <TextField
            className="field"
            id="title"
            name="title"
            label="Title"
            color="secondary"
            autoComplete="off"
            placeholder="Enter at title for your article"
            defaultValue={this.props.title ? this.props.title : ""}
            variant='filled'
            required
          />          
          <TextField
            className="field"
            id="description"
            name="description"
            label="Description"
            color="secondary"
            autoComplete="off"
            placeholder="Add a short description regarding the article"
            defaultValue={this.props.description ? this.props.description : ""}
            variant='filled'
          />
          <div style={{display:"flex"}}>
            <input
              accept="image/*"
              onChange={this.onFileChange}
              className={classes.input}
              style={{ display: 'none' }}
              id="img"
              name="img"
              label="img"
              defaultValue=""
              type="file"
            />
            <label htmlFor="img">
              <Button variant="contained" component="span" className={classes.button}>
                Upload
              </Button>
            </label>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>{this.state.selectedFile ? this.state.selectedFile.name : ""}</Typography>
          </div>
          <TextField
            id="content"
            name="content"
            label="Content"
            className="field"
            autoComplete="off"
            defaultValue={this.props.content ? this.props.content : ""}
            multiline
            variant='filled'
            rows={20}
            rowsMax={20}
            required
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
