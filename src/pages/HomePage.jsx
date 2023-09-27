import React, { Component, createRef } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { v4 } from "uuid";
import "./home.scss";

import TodoForm from "../components/form/TodoForm";
import TodoHeader from "../components/header/TodoHeader";
import { ToastContainer, toast } from "react-toastify";
import ContactCard from "../components/card/ContactCard";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.nameRef = createRef();
    this.state = {
      activeTab: "all",
      todos: JSON.parse(localStorage.getItem("todos")) || [
        {
          firstName: "Nodirbek",
          lastName: "Nu'monov",
          phoneNumber: 917742477,
          id: "0",
        },
        {
          firstName: "Jahonbek",
          lastName: "Nu'monov",
          phoneNumber: 911234566,
          id: "3",
        },
        {
          firstName: "Madina",
          lastName: "Nu'monova",
          phoneNumber: 911234566,
          id: "2",
        },
      ],
      todo: {
        name: "",
        lastName: "",
        phoneNumber: "",
      },
      selected: null,
      search: "",
      sort: "all",
      validated: false,
    };
  }
  render() {
    const { activeTab, todos, todo, selected, search, sort, validated } =
      this.state;
    const handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };
    const changeTab = (key) => {
      this.setState({ activeTab: key });
    };
    const handleTodo = (e) => {
      // console.log(e.target.id);
      // console.log(e.target.value);
      this.setState({ todo: { ...todo, [e.target.id]: e.target.value } });
    };
    const submit = (e) => {
      e.preventDefault();
      if (e.target.checkValidity()) {
        let newTodos;
        let newTodo = { ...todo, id: v4() };
        if (selected === null) {
          newTodos = [...todos, newTodo];
          toast.success("Added successfully", { autoClose: 1000 });
        } else {
          newTodos = todos.map((todo) => {
            if (todo.id === selected) {
              return newTodo;
            }
            return todo;
          });
          toast.info("Edited successfully");
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.nameRef.current.focus();
        this.setState({
          todos: newTodos,
          todo: {
            name: "",
            lastName: "",
            phoneNumber: "",
          },
          selected: null,
          validated: false,
        });
      } else {
        this.setState({ validated: true });
      }
    };
    const doneTodo = (id) => {
      let newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.done = true;
        }
        return todo;
      });
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const deleteTodo = (id) => {
      let newTodos = todos.filter((todo) => todo.id !== id);
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const editTodo = (id) => {
      const todo = todos.find((todo) => todo.id === id);
      this.setState({ todo, selected: id });
    };
    const handleSort = (e) => {
      this.setState({ sort: e.target.value });
      console.log(sort);
      switch (this.state.sort) {
        case "all":
          this.setState({ todos: todos });
          // this.setState({ sort: e.target.value });
          break;
        case "a-z": {
          this.setState({ sort: e.target.value });

          let newTodos = todos.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          );
          this.setState({ todos: newTodos });
          break;
        }
        case "z-a": {
          this.setState({ sort: e.target.value });
          let newTodos = todos.sort((a, b) =>
            b.firstName.localeCompare(a.firstName)
          );
          this.setState({ todos: newTodos });
          break;
        }
        default:
          this.setState({ todos: todos });
      }

      // let newTodos = todos.sort((a, b) =>
      //   a.firstName.localeCompare(b.firstName)
      // );
      // this.setState({ todos: newTodos });
      // console.log(sort);
    };
    let allTodos = todos.filter(
      (todo) =>
        todo.firstName.toLowerCase().includes(search) ||
        todo.lastName.toLowerCase().includes(search) ||
        todo.phoneNumber.toLowerCase().includes(search)
    );
    if (sort !== "all") {
      allTodos = allTodos.filter((todo) => todo.sort === sort);
    }
    const doneTodos = allTodos.filter((todo) => todo.done);
    // const undoneTodos = allTodos.filter((todo) => !todo.done);
    return (
      <div id="wrapper">
        <ToastContainer />
        <TodoForm
          validated={validated}
          nameRef={this.nameRef}
          selected={selected}
          todo={todo}
          handleTodo={handleTodo}
          submit={submit}
        />
        <TodoHeader
          sort={sort}
          handleSort={handleSort}
          searchRef={this.searchRef}
          handleSearch={handleSearch}
        />
        <Tabs
          activeKey={activeTab}
          onSelect={changeTab}
          className="mb-3"
          variant="pills"
          fill
        >
          <Tab eventKey="all" title={`All (${allTodos.length})`}>
            {allTodos.map((todo, i) => (
              <ContactCard
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                doneTodo={doneTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="done" title={`Favourites (${doneTodos.length})`}>
            {doneTodos.map((todo, i) => (
              <ContactCard
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          {/* <Tab eventKey="undone" title={`Undone (${undoneTodos.length})`}>
            {undoneTodos.map((todo, i) => (
              <ContactCard
                editTodo={editTodo}
                doneTodo={doneTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab> */}
        </Tabs>
      </div>
    );
  }
}

export default HomePage;
