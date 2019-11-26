import React, { Component } from "react";
import axios from "axios";
import Students from "./studentRows.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      name: "",
      grade: "",
      math: "",
      history: "",
      science: "",
      english: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.eachStudent = this.eachStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.superSort = this.superSort.bind(this);
  }
  componentDidMount() {
    let currentComponent = this;
    axios
      .get("/studentData")
      .then(response => response.data)
      .then(function sort(studentData) {
        let arr = studentData.data.slice();
        let avg = 0;
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].grades.length; j++) {
            if (arr[i].grades[j].slice(-1).toUpperCase() == "A") {
              sum = sum + 4;
            } else if (arr[i].grades[j].slice(-1).toUpperCase() == "B") {
              sum = sum + 3;
            } else if (arr[i].grades[j].slice(-1).toUpperCase() == "C") {
              sum = sum + 2;
            } else if (arr[i].grades[j].slice(-1).toUpperCase() == "D") {
              sum = sum + 1;
            } else {
              sum = sum + 0;
            }
            avg = sum / 4;
            arr[i].gpa = avg.toFixed(2);
          }
          avg = 0;
          sum = 0;
          let high = Math.max(...arr.map(user => user.gpa));
          let low = Math.min(...arr.map(user => user.gpa));
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].gpa >= high) {
              arr[i].win = 1;
            } else if (arr[i].gpa <= low) {
              arr[i].win = 3;
            } else {
              arr[i].win = 2;
            }
          }
          currentComponent.setState({
            students: arr.sort((a, b) => a.name.localeCompare(b.name))
          });
        }
      });
  }
  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    let arr = this.state.students.slice();
    let sum = 0;
    let gpa = 0;
    let gpaGrade = [
      `${this.state.math.toUpperCase()}`,
      `${this.state.history.toUpperCase()}`,
      `${this.state.science.toUpperCase()}`,
      `${this.state.english.toUpperCase()}`
    ];
    let grades = [
      `Math - ${this.state.math.toUpperCase()}`,
      `History - ${this.state.history.toUpperCase()}`,
      `Science - ${this.state.science.toUpperCase()}`,
      `English - ${this.state.english.toUpperCase()}`
    ];
    for (let i = 0; i < gpaGrade.length; i++) {
      if (gpaGrade[i] == "A") {
        sum = sum + 4;
      } else if (gpaGrade[i] == "B") {
        sum = sum + 3;
      } else if (gpaGrade[i] == "C") {
        sum = sum + 2;
      } else if (gpaGrade[i] == "D") {
        sum = sum + 1;
      } else {
        sum = sum + 0;
      }
      gpa = (sum / 4).toFixed(2);
    }
    arr.push({
      _id: arr.length + 1,
      name: this.state.name,
      grades: grades,
      img: "https://i.pravatar.cc/300",
      gender: "n/a",
      birthday: "n/a",
      athlete: null,
      grade: this.state.grade,
      gpa: gpa
    });
    let high = Math.max(...arr.map(user => user.gpa));
    let low = Math.min(...arr.map(user => user.gpa));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].gpa >= high) {
        arr[i].win = 1;
      } else if (arr[i].gpa <= low) {
        arr[i].win = 3;
      } else {
        arr[i].win = 2;
      }
    }
    this.setState({
      students: arr.sort((a, b) => a.name.localeCompare(b.name)),
      name: "",
      grade: "",
      math: "",
      history: "",
      science: "",
      english: ""
    });
  }
  removeStudent(i) {
    let arr2 = this.state.students.slice();
    arr2.splice(i, 1);
    this.setState({ students: arr2 });
  }
  eachStudent(details, i) {
    return (
      <Students
        key={details.id + details.name}
        index={i}
        details={details}
        deleteStudent={this.removeStudent}
      />
    );
  }
  superSort(x) {
    let arr = this.state.students.slice();
    if (x === "grade") {
      arr = arr.sort((a, b) =>
        a.grade < b.grade
          ? 1
          : a.grade === b.grade
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
      this.setState({
        students: arr
      });
    } else if (x === "gpa") {
      arr = arr.sort((a, b) =>
        a.gpa < b.gpa ? 1 : a.gpa === b.gpa ? (a.name > b.name ? 1 : -1) : -1
      );
      this.setState({
        students: arr
      });
    } else if (x === "name") {
      arr = arr.sort((a, b) => a.name.localeCompare(b.name))
      this.setState({
        students: arr
      });
    } else if (x === "math") {
      arr = arr.sort((a, b) =>
        a.grades[0].slice(-1) > b.grades[0].slice(-1)
          ? 1
          : a.grades[0].slice(-1) === b.grades[0].slice(-1)
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
      this.setState({
        students: arr
      });
    } else if (x === "history") {
      arr = arr.sort((a, b) =>
        a.grades[1].slice(-1) > b.grades[1].slice(-1)
          ? 1
          : a.grades[1].slice(-1) === b.grades[1].slice(-1)
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
      this.setState({
        students: arr
      });
    } else if (x === "science") {
      arr = arr.sort((a, b) =>
        a.grades[2].slice(-1) > b.grades[2].slice(-1)
          ? 1
          : a.grades[2].slice(-1) === b.grades[2].slice(-1)
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
      this.setState({
        students: arr
      });
    } else if (x === "english") {
      arr = arr.sort((a, b) =>
        a.grades[3].slice(-1) > b.grades[3].slice(-1)
          ? 1
          : a.grades[3].slice(-1) === b.grades[3].slice(-1)
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
      this.setState({
        students: arr
      });
    } else {
      return null;
    }
  }
  classSort() {}
  render() {
    //Bootstrap used to quickly create interface to manipulate data.
    return (
      <div className="container">
        <h1 className="text-white">Student Grades</h1>
        <hr className="bg-white" />
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header text-muted font-weight-bold">
                Add New Student
              </div>
              <div className="card-body">
                <p className="text font-weight-bold">
                  Name:
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleOnChange}
                  />
                </p>
                <p className="text font-weight-bold">
                  Student Grade:
                  <input
                    name="grade"
                    type="number"
                    min="1"
                    max="12"
                    step="1"
                    className="form-control"
                    value={this.state.grade}
                    onChange={this.handleOnChange}
                    placeholder="Grade Level"
                  />
                </p>
                <p className="text font-weight-bold">
                  Enter grades for the following classes:
                  <input
                    name="math"
                    className="form-control"
                    type="text"
                    onChange={this.handleOnChange}
                    value={this.state.math}
                    placeholder="Math"
                    maxLength="1"
                  />
                  <input
                    name="history"
                    className="form-control"
                    type="text"
                    onChange={this.handleOnChange}
                    value={this.state.history}
                    placeholder="History"
                    maxLength="1"
                  />
                  <input
                    name="science"
                    className="form-control"
                    type="text"
                    onChange={this.handleOnChange}
                    value={this.state.science}
                    placeholder="Science"
                    maxLength="1"
                  />
                  <input
                    name="english"
                    className="form-control"
                    type="text"
                    onChange={this.handleOnChange}
                    value={this.state.english}
                    placeholder="English"
                    maxLength="1"
                  />
                </p>
              </div>
              <div className="card-footer text-center">
                <button
                  type="button"
                  name="submit"
                  onClick={this.handleSubmit}
                  className="btn btn-primary btn-block"
                >
                  Submit!
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card text-center">
              <div className="card-header text-muted font-weight-bold">
                Student Grades
              </div>
              <div className="card-body">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("name");
                          }}
                          data-toggle="button" aria-pressed="false"
                        >
                          Name
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("grade");
                          }}
                          data-toggle="button" aria-pressed="false"
                        >
                          Grade Level
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("math");
                          }}
                        >
                          Math
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("history");
                          }}
                          data-toggle="button" aria-pressed="false"
                        >
                          History
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("science");
                          }}
                          data-toggle="button" aria-pressed="false"
                        >
                          Science
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("english");
                          }}
                          data-toggle="button" aria-pressed="false"
                        >
                          English
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-info btn-block"
                          onClick={() => {
                            this.superSort("gpa");
                          }}
                          data-toggle="button" aria-pressed="false"
                        >
                          GPA
                        </button>
                      </th>
                    </tr>
                  </thead>
                  {this.state.students.map(this.eachStudent)}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
