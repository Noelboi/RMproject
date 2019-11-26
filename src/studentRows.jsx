import React, { Component } from "react";

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spread: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.close = this.close.bind(this);
    this.spread = this.spread.bind(this);
    this.remove = this.remove.bind(this);
    this.color = this.color.bind(this);
  }
  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  spread() {
    this.setState({ spread: true });
  }
  close() {
    this.setState({ spread: false });
  }
  remove() {
    this.props.deleteStudent(this.props.index);
  }
  color(win) {
    if (win == 1) {
      return "table-success"
    } else if (win === 3) {
      return "table-danger"
    } else {
      return ""
    };
  }
  spreadMode() {
    return (
      <tr>
        <td>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.close}
          >
            {this.props.details.name}
          </button>
        </td>
        <td>{this.props.details.grade}</td>
        <td>{this.props.details.grades[0].slice(-1).toUpperCase()}</td>
        <td>{this.props.details.grades[1].slice(-1).toUpperCase()}</td>
        <td>{this.props.details.grades[2].slice(-1).toUpperCase()}</td>
        <td>{this.props.details.grades[3].slice(-1).toUpperCase()}</td>
        <td>
          <button
            type="button"
            onClick={this.remove}
            className="btn btn-danger btn-block"
          >
            Delete?
          </button>
        </td>
      </tr>
    );
  }
  normalMode() {
    return (
      <tr className={this.color(this.props.details.win)}>
        <td>
        <button type="button" className="btn btn-light btn-block" onClick={this.spread}>{this.props.details.name}</button>
        </td>
        <td>{this.props.details.grade}</td>
        <td>{this.props.details.grades[0].slice(-1)}</td>
        <td>{this.props.details.grades[1].slice(-1)}</td>
        <td>{this.props.details.grades[2].slice(-1)}</td>
        <td>{this.props.details.grades[3].slice(-1)}</td>
        <td>{this.props.details.gpa}</td>
      </tr>
    );
  }
  render() {
    return (
        <tbody>{this.state.spread ? this.spreadMode() : this.normalMode()}</tbody>
    );
  }
}