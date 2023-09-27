import React, { Component, Fragment } from "react";
import { Button, Form } from "react-bootstrap";

export class TodoForm extends Component {
  render() {
    const { todo, handleTodo, submit, selected, nameRef, validated } =
      this.props;
    // const submit = (e) => {
    //   e.preventDefault();
    //   console.log(e.target);
    //   console.log(e.target.name);
    //   console.log(e.target.date.value);
    //   console.log(e.target.importance);
    // };
    return (
      <Fragment>
        <Form validated={validated} noValidate onSubmit={submit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              ref={nameRef}
              onChange={handleTodo}
              value={todo.firstName}
              required
              type="text"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please fill !
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              // ref={nameRef}
              onChange={handleTodo}
              value={todo.lastName}
              required
              type="text"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please fill !
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              onChange={handleTodo}
              value={todo.phoneNumber}
              required
              type="number"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="importance">
          <Form.Label>Importance</Form.Label>
          <Form.Select onChange={handleTodo} value={todo.importance}>
            <option value="high">High</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </Form.Select>
        </Form.Group> */}
          <Button type="submit" className="w-100">
            {selected === null ? "Add" : "Save"} contact
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default TodoForm;
