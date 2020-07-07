import React from "react";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect, withRouter } from "react-router-dom";
import Axios from 'axios';

const styles = {
    ListGroup: {
        width: "600px",
        marginTop: 70,
        marginLeft: 500
    },
    itms: {
        float: "left"
    },
    icon: {
        // float:"right"
        marginRight:0

    },
    view: {
        height: "auto"
    },
    items:{
        float:"left"
    }

}

class ViewExerices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            work: []
        };

        this.UserId = this.props.match.params.id;
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        Axios.get(`http://localhost:5000/user/getUserById/${this.UserId}`)
            .then(result => {
                this.setState({ ...result.data })
            })
            .catch(err => {
                console.log(err)
            })
        Axios.get(`http://localhost:5000/assign/getexerciseByUserId/${this.UserId}`)
            .then(result => {
                this.setState({ work: result.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    onDelete(id){
        Axios.delete(`http://localhost:5000/assign/deleteWork/${id}`)
        .then(result => this.componentDidMount())
        .catch(err => {
          console.log(err);
          alert("Cannot Delete work")
        })
    }

    render() {
        return (
            <div className="conatiner-fluid">
            <div style={styles.view}>
                <h1>{this.state.name}</h1>
                <div style={styles.itms}>
                    <h4>Assigned Works</h4>
                    <ListGroup style={styles.ListGroup}>
                        {
                            this.state.work.map(row => (
                                <ListGroup.Item ><div style={styles.items}>{row.item} </div>&emsp;<div style={{marginRight:"0px"}}><DeleteIcon  onClick={()=>this.onDelete(row._id)} /></div></ListGroup.Item>
                            ))}
                    </ListGroup>
                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(ViewExerices)