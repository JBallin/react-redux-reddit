import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';

class FilterPosts extends Component {
  handleChange = e => {
    this.props.filterTitles(e.target.value);
  }

  render () {
    return (
      <Form inline onSubmit={e => e.preventDefault()}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="filter-field" className="mr-sm-2">Filter by Title:</Label>
          <Input
            type="text"
            name="filter"
            id="filter-field"
            value={this.props.filterQuery}
            onChange={this.handleChange}
          />
        </FormGroup>
      </Form>
    )
  }
}

export default FilterPosts
