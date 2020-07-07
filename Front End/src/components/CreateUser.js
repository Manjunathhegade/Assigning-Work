import React from "react";
import { TextField, Button } from "@material-ui/core";
import Axios from 'axios';
import { Redirect, withRouter } from "react-router-dom";

const styles = {
  TextField: {
    marginTop: 20,
    width: 450
  },
  form: {
    marginTop: 100
  }
};
class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      email: ""
    };
    this.UserId = this.props.match.params.id;
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    const statename = e.target.name;
    this.setState({ [statename]: e.target.value });
  }

  componentDidMount() {
    Axios.get(`http://localhost:5000/user/getUserById/${this.UserId}`)
      .then(result => {
        this.setState({ ...result.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onSubmit(e) {
    e.preventDefault();
    const Data = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,

    }
    if (this.UserId) {
      Axios.post(`http://localhost:5000/user/editUser/${this.UserId}`, Data)
        .then(result => {
          console.log(result.data);
          alert("user Updated successfully")
          this.setState({
            isClicked: true
          })
        })
        .catch(err => {
          console.log(err);
          alert("user can't be updated")
        })
    } else {
      Axios.post('http://localhost:5000/user/userRegister', Data)
        .then(result => {
          alert(this.state.name + " " + "Saved");
          this.setState({
            name: "",
            age: "",
            email: ""
          })
        })
        .catch(err => {
          alert("User Exist")
        })
    }
  }
  render() {
    return (
      <div>
        <h1>{this.UserId ? "Edit" : "Create"} User</h1>
        <form
          className="user-create"
          style={styles.form}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            className="users"
            name="name"
            style={styles.TextField}
            value={this.state.name}
            onChange={this.handleChange}
            label="User Name"
            variant="outlined"
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Age"
            className="age"
            style={styles.TextField}
            value={this.state.age}
            name="age"
            onChange={this.handleChange}
            variant="outlined"
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email Address"
            className="email"
            style={styles.TextField}
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
            variant="outlined"
            required
          />
          <br />
          <br />
          <Button variant="contained" onClick={this.onSubmit} color="primary">
            {this.UserId ? "UPDATE" : "SUBMIT"}
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateUser)