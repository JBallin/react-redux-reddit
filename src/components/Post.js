import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import FaArrowUp from 'react-icons/lib/fa/arrow-up'
import FaArrowDown from 'react-icons/lib/fa/arrow-down'
import FaComment from 'react-icons/lib/fa/comment'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addComment } from '../actions/comments'
import { upVote, downVote } from '../actions/posts'

class Post extends React.Component {
  state = {
    comment: '',
    displayComments: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment({
      content: this.state.comment,
      post_id: this.props.post.id,
    });
    this.setState({ comment: '', displayComments: true });
  }

  toggleComments = e => {
    e.preventDefault();
    this.setState({ displayComments: !this.state.displayComments });
  }

  render() {
    const { post, comments } = this.props;
    const { author, content, title, createdAt, img_url, votes } = post;
    const commentsList = comments.map(c => <li key={c.id}>{c.content}</li>);
    let commentsCounter = !comments.length ? '0 Comments' : (
      <a href="" onClick={this.toggleComments}>
        { comments.length === 1 ? '1 Comment' : `${comments.length} Comments` }
      </a>
    );
    const upArrow = (
        <FaArrowUp onClick={() => this.props.upVote(post.id)}/>
    );
    const downArrow = (
        <FaArrowDown style={ !post.votes ? {color: 'gray'} : {} } onClick={() => post.votes && this.props.downVote(post.id)}/>
    );

    const newCommentForm = (
      <Form inline onSubmit={ this.handleSubmit }>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="comment"
            id="comment-field"
            placeholder="Enter a comment here"
            required
            value={ this.state.comment }
            onChange={ e => this.setState({ comment: e.target.value }) }
          />
        </FormGroup>
        <Button disabled={!this.state.comment}>Submit</Button>
      </Form>
    );

    const timeSincePost = (
      <Moment fromNow>{createdAt}</Moment>
    );

    return (
      <Row className="mt-3">
        <Col>
          <Card>
            <CardImg
              top
              width="100%"
              src={img_url}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>
                { title } | {upArrow} {votes} {downArrow}
              </CardTitle>
              <CardSubtitle>{ author }</CardSubtitle>
              <CardText>
                { content }
              </CardText>
              <hr />
              { timeSincePost } | <FaComment /> { commentsCounter }
              { newCommentForm }
              <ul className="mt-2">
                { this.state.displayComments && commentsList }
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addComment, upVote, downVote }, dispatch);

export default connect(null, mapDispatchToProps)(Post);
