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
    isFetching: true,
    isLoadingImages: true,
    filterQuery: '',
    loadedImages: 0,
  }

  async componentDidMount () {
    const delay = 700;
    const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
    await Promise.all([this.props.fetchPosts(), this.props.fetchComments(), delayedPromise]);
    this.setState({ isFetching: false });
  }

  togglePostForm = () => {
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));
  }

  filterTitles = (filterQuery) => {
    this.setState({ filterQuery });
  }

  logLoadedImage = () => {
    this.setState(prevState => {
      const newState = { loadedImages: prevState.loadedImages + 1 };
      if (prevState.loadedImages === this.props.posts.length - 1) {
        newState.isLoadingImages = false;
      }
      return newState;
    });
  }

  render() {
    const { comments, posts } = this.props;
    const { filterQuery, isLoadingImages, isFetching } = this.state;

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

    if (filterQuery) {
      sortedPosts = sortedPosts.filter(post => {
        const title = post.title.toLowerCase();
        const filter = filterQuery.toLowerCase();
        return title.includes(filter);
      });
    }

    const postsList = sortedPosts.map(post => {
      const postComments = comments.filter(c => c.post_id === post.id);
      return (
        <Post
          post={post}
          comments={postComments}
          key={post.id}
          logLoadedImage={this.logLoadedImage}
        />
      )
    });

    const postsDisplay = (
      <div style={ isLoadingImages ? { display: 'none' } : {} }>
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
      </div>
    );

    return (
      <Container className="mt-4">
        <div style={ (!isFetching && !isLoadingImages) ? { display: 'none' } : {} }>
          <Spinner />
        </div>
        { !isFetching && postsDisplay }
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
