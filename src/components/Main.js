import React, { Component } from 'react'
import AddPostForm from './AddPostForm'
import Post from './Post'
import FilterPosts from './FilterPosts'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../actions/posts'

class Main extends Component {
  state = {
    isFormOpen: false,
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  togglePostForm = () => {
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));
  }

  render() {
    return (
      <Container className="mt-4">
        <Row>
          <Col sm={{size: 8, offset: 1}}>
            <FilterPosts />
          </Col>
          <Col sm="2">
            <Button
              color="secondary"
              onClick={this.togglePostForm}
            >
              Add Post
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={{size: 11, offset: 1}}>
            { this.state.isFormOpen && <AddPostForm /> }
          </Col>
        </Row>
        <Row>
          <Col className="pr-0" sm={{size: 9, offset: 1}}>
            {/* Below is the Post component for each post. It is up to you how you would like to iterate over them. */}
            <Post />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPosts }, dispatch);

export default connect(null, mapDispatchToProps)(Main);
