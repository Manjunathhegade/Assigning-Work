import React from "react";
import MaterialTable from "material-table";
import { Redirect, withRouter } from "react-router-dom";
import Axios from 'axios';
import Button from '@material-ui/core/Button';


const styles = {
  conatiner: {
    marginTop: 35
  }
};

export default class ViewExerices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: [],
      edit: { isClick:false, id: "" }
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/exercise/getExercise')
        .then(result => {
            this.setState({ exercise: result.data })
        })
        .catch(err => {
            console.log(err)
        })
}

onEdit(id) {
  this.setState({ edit: { isClick: true, id: id } })
}


onDelete(id) {

  Axios.delete(`http://localhost:5000/exercise/deleteExercise/${id}`)
    .then(result => this.componentDidMount())
    .catch(err => {
      console.log(err);
      alert("Cannot Delete item")
    })


}

  render() {
    if (this.state.edit.isClick) {
      return <Redirect to={`/Exercises/${this.state.edit.id}`} />
    }
    return (
      <div style={styles.conatiner}>
        <MaterialTable
          title="View Exerices"
          style={{
            overflow: "scroll",
            height: "500px",
            width: "80%",
            marginLeft: "100px",
            hover: "#fff"
          }}
          columns={[
            { title: "NAME", field: "name", minWidth: 100, width: 100 },
        
            {
              title: "EDIT",
              field: "edit",
              type: "numeric",
              width: 100,
              minWidth: 100,
              format: value => value.toFixed(2)
            },
            {
              title: "DELETE",
              field: "delete",
              type: "numeric",
              minWidth: 100,
              width: 100,
              format: value => value.toFixed(2)
            }
          ]}
          data={this.state.exercise.map(row => ({
            name: row.name,
                      delete: (
              <Button  variant="contained" color="secondary" onClick={() => this.onDelete(row._id)}>Delete</Button>
            ),
            edit: <Button variant="contained"  onClick={() => this.onEdit(row._id)}>Edit</Button>
          }))}
          options={{
            search: true,
            headerStyle: {
              backgroundColor: "#3F51B6",
              color: "#FFF",
              position: "relative",
              fontSize: "14px",
              fontWeight:"bold"
            }
          }}
        />
      </div>
    );
  }
}
