import React, { Component } from 'react'
import AddPostForm from './AddPostForm'
import Post from './Post'
import FilterPosts from './FilterPosts'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../actions/posts'
import { fetchComments } from '../actions/comments'
import Spinner from './Spinner'

class Main extends Component {
  state = {
    isFormOpen: false,
    loading: true,
    filterQuery: '',
  }

  async componentDidMount () {
    const delay = 700;
    const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
    await Promise.all([this.props.fetchPosts(), this.props.fetchComments(), delayedPromise]);
    this.setState({ loading: false });
  }

  togglePostForm = () => {
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));
  }

  filterTitles = (filterQuery) => {
    this.setState({ filterQuery });
  }

  render() {
    const { comments, posts } = this.props;

    if (this.state.loading) {
      return (
        <Container className="mt-4">
          <Spinner />
        </Container>
      );
    }

    if (posts instanceof Error || comments instanceof Error) {
      return (
        <Container className="mt-4">
          <h2>{ 'Error fetching API' }</h2>
        </Container>
      );
    }

    const descendingVotes = (a,b) => {
      if (a.votes > b.votes) return -1;
      if (a.votes < b.votes) return 1;
      return 0;
    };

    let sortedPosts = posts.sort(descendingVotes);

    const { filterQuery } = this.state;
    if (filterQuery) {
      sortedPosts = sortedPosts.filter(post => {
        const title = post.title.toLowerCase();
        const filter = filterQuery.toLowerCase();
        return title.includes(filter);
      });
    }

    const postsList = sortedPosts.map(post => {
      const postComments = comments.filter(c => c.post_id === post.id);
      return <Post post={post} comments={postComments} key={post.id} />
    });

    return (
      <Container className="mt-4">
        <Row>
          <Col sm={{size: 8, offset: 1}}>
            <FilterPosts
              filterTitles={this.filterTitles}
              filterQuery={this.state.filterQuery}
            />
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
