import React, {Component} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { addPost } from '../actions/posts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AddPostForm extends Component {
  state = {
    title: '',
    content: '',
    author: '',
    img_url: '',
  }

  handleSubmit = e => {
    const UNSPLASH_API_URL = 'https://source.unsplash.com/random/800x400';
    e.preventDefault();
    let { img_url } = this.state;
    if (!img_url) img_url = UNSPLASH_API_URL;
    this.props.addPost({ ...this.state, img_url });
    this.props.close();
  }

  render() {
    const isFormFilled = this.state.title && this.state.content && this.state.author;
    const redAsterisk = <span style={{color: 'red'}}>*</span>;

    const titleField = (
      <FormGroup>
        <Label for="title-field">Title { redAsterisk }</Label>
        <Input
          type="text"
          name="title"
          id="title-field"
          value={ this.state.title }
          onChange={ e => this.setState({ title: e.target.value }) }
          required
        />
      </FormGroup>
    );

    const bodyField = (
      <FormGroup>
        <Label for="body-field">Body { redAsterisk }</Label>
        <Input
          type="text"
          name="body"
          id="body-field"
          value={ this.state.content }
          onChange={ e => this.setState({ content: e.target.value }) }
          required
        />
      </FormGroup>
    );

    const authorField = (
      <FormGroup>
        <Label for="author-field">Author { redAsterisk }</Label>
        <Input
          type="text"
          name="author"
          id="author-field"
          value={ this.state.author }
          onChange={ e => this.setState({ author: e.target.value }) }
          required
        />
      </FormGroup>
    );

    const imageField = (
      <FormGroup>
        <Label for="image-field">Image URL</Label>
        <Input
          type="url"
          name="image"
          id="image-field"
          value={ this.state.img_url }
          onChange={ e => this.setState({ img_url: e.target.value }) }
        />
      </FormGroup>
    );

    const createPostButton = (
      <Button disabled={!isFormFilled} type="submit">Create Post</Button>
    );

    return (
      <Row>
        <Col sm="10">
          <Form onSubmit={this.handleSubmit}>
            { titleField }
            { bodyField }
            { authorField }
            { imageField }
            { createPostButton }
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addPost }, dispatch);

export default connect(null, mapDispatchToProps)(AddPostForm);
