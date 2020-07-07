import React from "react";
import { TextField, Button,InputLabel,FormControl,Select,MenuItem } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import Axios from 'axios';

const styles = {
  TextField: {
    marginTop: 30,
    height:30,
    width: 450
  },
  form: {
    marginTop: 100
  }
};
class AssignUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      email: "",
      item:"",
      exercies:[]
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
      Axios.get(`http://localhost:5000/exercise/getExercise`)
      .then(result => {
        this.setState({ exercies:result.data })
      })
      .catch(err => {
        console.log(err)
      })

  }

  onSubmit(e){
    e.preventDefault();
       const Data = {
      user_id: this.UserId,
      item: this.state.item
    }
    Axios.post('http://localhost:5000/assign/assignExercise',Data)
      .then(result => {
        alert("Work Assign ");

      })
      .catch(err => {
        alert("Cannot Assign more then 3 work per user")
      })
  }

  render() {
    return (
      <div>
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
          <br /><br />
          <FormControl variant="outlined"  style={styles.TextField} required>
        <InputLabel id="demo-simple-select-outlined-label">select any one</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="select any one"
          name="item"
          value={this.state.item}
          onChange={this.handleChange}
        >
          {
          this.state.exercies.map(row => (
          <MenuItem value={row.name} onChange={this.handleChange} >{row.name}</MenuItem>
           ) )}
                 
        </Select>
      </FormControl>
        <br/>
        <br/> <br/>
          <Button variant="contained" onClick={this.onSubmit} color="primary">
            Assign
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(AssignUser)