import React from "react";
import { TextField, Button } from '@material-ui/core';
import { Redirect, withRouter } from "react-router-dom";
import Axios from 'axios';


const styles = {
  TextField: {
    marginTop: 20,
    width: 450
  },
  form: {
    marginTop: 100,
  },
  Button: {
    marginTop: 20
  }

}
class Exrcises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      name: "",
    };
    this.UserId = this.props.match.params.id;
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    const statename = e.target.name;
    this.setState({ [statename]: e.target.value })
  }

  componentDidMount() {
    Axios.get(`http://localhost:5000/exercise/getExerciseById/${this.UserId}`)
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

    }
    Axios.post('http://localhost:5000/exercise/exerciseRegister', Data)
      .then(result => {
        alert(this.state.name + " " + "Saved");
       this.setState({
         name:""
       })

      })
      .catch(err => {
        alert("cannot add Exist")
      })
  }

  render() {
    return (
      <div>
        <form className="exrcises-create" style={styles.form} noValidate autoComplete="off">
          <TextField id="outlined-basic" className="users" name="name" style={styles.TextField} value={this.state.name} onChange={this.handleChange} label="Exerices Name" variant="outlined" required /><br />
          <Button variant="contained" style={styles.Button} onClick={this.onSubmit} color="primary">{this.ItemId ? "UPDATE":"SUBMIT"}</Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Exrcises)