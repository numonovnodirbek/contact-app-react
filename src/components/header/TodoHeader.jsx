import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

export class TodoHeader extends Component {
  constructor(props) {
    super(props);
    // this.searchRef = createRef();
    this.state = {};
  }
  render() {
    const { handleSearch, searchRef, handleSort, sortBy } = this.props;
    // const handleSearch = () => {
    //   console.log(this.searchRef.current.value);
    // };
    return (
      <InputGroup className="my-3">
        <Form.Control
          onChange={handleSearch}
          // ref={this.searchRef}n
          ref={searchRef}
          placeholder="Searching contact"
        />
        <InputGroup.Text>
          <Form.Select onChange={handleSort} value={sortBy}>
            <option value="all">All</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    );
  }
}

export default TodoHeader;
