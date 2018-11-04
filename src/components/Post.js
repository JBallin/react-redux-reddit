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
  Label,
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
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment({
      content: this.state.comment,
      post_id: this.props.post.id,
    });
    this.setState({ comment: '' });
  }

  render() {
    const { post, comments } = this.props;
    const { id, author, content, title, createdAt, img_url, votes } = post;
    const commentsList = comments.map(c => <li key={c.id}>{c.content}</li>);
    const commentsCounter = comments.length === 1 ? '1 Comment' : `${comments.length} Comments`;
    const upArrow = (
        <FaArrowUp onClick={() => this.props.upVote(post.id)}/>
    );
    const downArrow = (
        <FaArrowDown style={ post.votes ? {color: 'gray'} : {} } onClick={() => post.votes && this.props.downVote(post.id)}/>
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
              <Moment fromNow>{createdAt}</Moment> | <FaComment /> { commentsCounter }
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
                <Button>Submit</Button>
              </Form>
              <ul className="mt-2">
                { commentsList }
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
