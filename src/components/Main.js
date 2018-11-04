import React, { Component } from 'react'
import AddPostForm from './AddPostForm'
import Post from './Post'
import FilterPosts from './FilterPosts'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../actions/posts'
import { fetchComments } from '../actions/comments'

class Main extends Component {
  state = {
    isFormOpen: false,
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchComments();
  }

  togglePostForm = () => {
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));
  }

  render() {
    const { comments, posts } = this.props;

    const descendingVotes = (a,b) => {
      if (a.votes > b.votes) return -1;
      if (a.votes < b.votes) return 1;
      return 0;
    };

    const sortedPosts = posts.sort(descendingVotes);

    const postsList = sortedPosts.map(post => {
      const postComments = comments.filter(c => c.post_id === post.id);
      return <Post post={post} comments={postComments} key={post.id} />
    });

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
            { this.state.isFormOpen && <AddPostForm close={ this.togglePostForm } /> }
          </Col>
        </Row>
        <Row>
          <Col className="pr-0" sm={{size: 9, offset: 1}}>
            { postsList }
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPosts, fetchComments }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
