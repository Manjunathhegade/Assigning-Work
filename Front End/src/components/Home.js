import React from "react";
import MaterialTable from "material-table";
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

const styles = {
  conatiner: {
    marginTop: 35
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      edit: { isClick:false, id: "" },
      assign :{isClick:false,id:""},
      view: {isClick:false,id:""}
    };
    this.onEdit = this.onEdit.bind(this);
    this.onAssign = this.onAssign.bind(this);
    this.onView = this.onView.bind(this);
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/user/getUser')
      .then(result => {
        this.setState({ user: result.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onEdit(id) {
    this.setState({ edit: { isClick: true, id: id } })
  }

  onDelete(id) {

    Axios.delete(`http://localhost:5000/user/deleteUser/${id}`)
      .then(result => this.componentDidMount())
      .catch(err => {
        console.log(err);
        alert("Cannot Delete user")
      })


  }
  onView(id){
    this.setState({ view: { isClick: true, id: id } })
  }
  onAssign(id){
    this.setState({ assign: { isClick: true, id: id } })
  }

  render() {
    if (this.state.edit.isClick) {
      return <Redirect to={`/CreateUser/${this.state.edit.id}`} />
    }
    if (this.state.assign.isClick) {
      return <Redirect to={`/assign/${this.state.assign.id}`} />
    }
    if (this.state.view.isClick) {
      return <Redirect to={`/viewAssignWork/${this.state.view.id}`} />
    }
    return (
      <div style={styles.conatiner}>
        <MaterialTable
          title="View Users"
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
              title: "EMAIL",
              field: "email",
              minWidth: 100,
              width: 150,
              format: value => value.toFixed(2)
            },
            {
              title: "AGE",
              field: "age",
              type: "numeric",
              width: 100,
              minWidth: 100,
              format: value => value.toFixed(2)
            },
            {
              title: "VIEW",
              field: "view",
              type: "numeric",
              width: 100,
              minWidth: 100,
              format: value => value.toFixed(2)
            },
            {
              title: "ASSIGN",
              field: "assign",
              type: "numeric",
              minWidth: 100,
              width: 100,
              format: value => value.toFixed(2)
            },
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
          data={this.state.user.map(row => ({
            name: row.name,
            email: row.email,
            age: row.age,
            view: <Button variant="contained" onClick={() => this.onView(row._id)}>Works</Button>,
            delete: (
              <Button variant="contained" color="secondary" onClick={() => this.onDelete(row._id)}>Delete</Button>
            ),
            edit: <Button variant="contained"  onClick={() => this.onEdit(row._id)}>Edit</Button>,
            assign: <Button variant="contained" onClick={() => this.onAssign(row._id)}>Assign</Button>
          }))}
          options={{
            search: true,
            headerStyle: {
              backgroundColor: "#3F51B6",
              color: "#FFF",
              position: "relative",
              fontSize: "14px",
              fontWeight: "bold"
            }
          }}
        />
      </div>
    );
  }
}
