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

const Post = ({ post, comments }) => {
  const { id, author, content, title, createdAt, img_url, votes } = post;
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
            <CardTitle>{ title } | <FaArrowUp /> {votes} <FaArrowDown /></CardTitle>
            <CardSubtitle>{ author }</CardSubtitle>
            <CardText>
              { content }
            </CardText>
            <hr />
            <Moment fromNow>{createdAt}</Moment> | <FaComment /> 2 Comments
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="comment" id="comment-field" placeholder="Enter a comment here" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
            <ul className="mt-2">
              <li>Comment One</li>
              <li>Comment Two</li>
            </ul>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Post
