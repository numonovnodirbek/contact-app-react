import React, { Component } from "react";
import callIcon from "../../assets/icons8-call.svg"

// import { Alert, Button } from "react-bootstrap";

// export class TodoCard extends Component {
//   render() {
//     const colors = {
//       high: "danger",
//       middle: "warning",
//       low: "secondary",
//     };
//     const { name, date, importance, done, id, doneTodo, deleteTodo, editTodo } =
//       this.props;
//     return (
//       <Alert
//         variant={colors[importance]}
//         className="d-flex justify-content-between align-items-center"
//       >
//         <div>
//           <time>{date}</time> <span>{name}</span>
//         </div>
//         <div>
//           <Button
//             onClick={() => editTodo(id)}
//             className="me-3"
//             variant="primary"
//           >
//             Edit
//           </Button>
//           {done ? (
//             <Button onClick={() => deleteTodo(id)} variant="danger">
//               Delete
//             </Button>
//           ) : (
//             <Button onClick={() => doneTodo(id)} variant="success">
//               Done
//             </Button>
//           )}
//         </div>
//       </Alert>
//     );
//   }
// }

// export default TodoCard;

import "./contactCard.scss";

const Anchor = ({ phone, children }) => {
  return <a href={`tel:${phone}`}>{children}</a>;
};

export class ContactCard extends Component {
  render() {
    const { firstName, lastName, phoneNumber, deleteTodo, editTodo, id } =
      this.props;
    return (
      <div className="contactCard">
        <div className="contactInfo">
          <i className="bi bi-person-circle user-icon"></i>
          <div className="contactName">
            <h3>{firstName + " " + lastName}</h3>
            <h5>{phoneNumber}</h5>
          </div>
        </div>
        <div className="cardBtns">
          <i className="bi bi-pencil-square" onClick={() => editTodo(id)}></i>
          <i className="bi bi-trash-fill" onClick={() => deleteTodo(id)}></i>
          <Anchor tel={phoneNumber}>
            <img src={callIcon} alt="icon" className="call-icon"/>
          </Anchor>
        </div>
      </div>
    );
  }
}

export default ContactCard;
