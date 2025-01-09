import React, { Component } from 'react';
import './CrudApp.css';
import Table from 'react-bootstrap/Table';

export default class CrudApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userName: "",
            userFatherName: "",
            userMotherName: "",
            userEmail: "",
            userDOB: "",
            editId: null,
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        fetch("https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users")
            .then((response) => response.json())
            .then((data) => this.setState({ users: data }));
    };

    inputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleAddUser = () => {
        const { userName, userFatherName, userMotherName, userEmail, userDOB, editId } = this.state;

        if (userName && userFatherName && userMotherName && userEmail && userDOB && editId == null) {
            const newUser = { userName, userFatherName, userMotherName, userEmail, userDOB };

            fetch("https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            })
            .then((response) => response.json())
            .then(() => {
                this.fetchUsers();
                this.setState({
                    userName: "",
                    userFatherName: "",
                    userMotherName: "",
                    userEmail: "",
                    userDOB: "",
                    editId: null,
                });
            })
       
        } else {
            alert("Please Enter All Values in Fields");
        }
    }

    edit = (user) => {
        this.setState({
            userName: user.userName,
            userFatherName: user.userFatherName,
            userMotherName: user.userMotherName,
            userEmail: user.userEmail,
            userDOB: user.userDOB,
            editId: user.id
        });
    }

    handleUpdateUser = () => {
        const { userName, userFatherName, userMotherName, userEmail, userDOB, editId } = this.state;

        if (userName && userFatherName && userMotherName && userEmail && userDOB) {
            const updatedUser = { userName, userFatherName, userMotherName, userEmail, userDOB };

            fetch(`https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            })
            .then((response) => response.json())
            .then(() => {
                this.fetchUsers();
                this.setState({
                    userName: "",
                    userFatherName: "",
                    userMotherName: "",
                    userEmail: "",
                    userDOB: "",
                    editId: null,
                });
            })
        }
    }

    delete = (id) => {
        fetch(`https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            this.fetchUsers();
        })
    }

    render() {
        const { users, userName, userFatherName, userMotherName, userEmail, userDOB } = this.state;

        return (
            <div className="container">
                <div className="form-container">
                    <h2 className="form-heading">Registration Form</h2>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Your Name"
                        value={userName}
                        onChange={this.inputChange}
                        className="form-field-input"
                    /><br />
                    <input
                        type="text"
                        name="userFatherName"
                        placeholder="Father Name"
                        value={userFatherName}
                        onChange={this.inputChange}
                        className="form-field-input"
                    /> <br />
                    <input
                        type="text"
                        name="userMotherName"
                        placeholder="Mother Name"
                        value={userMotherName}
                        onChange={this.inputChange}
                        className="form-field-input"
                    /> <br />
                    <input
                        type="email"
                        name="userEmail"
                        placeholder="Your Email"
                        value={userEmail}
                        onChange={this.inputChange}
                        className="form-field-input"
                    /> <br />
                    <input
                        type="date"
                        name="userDOB"
                        value={userDOB}
                        onChange={this.inputChange}
                        className="form-field-input"
                    /> <br />
                    {this.state.editId ? (
                        <button type="submit" onClick={this.handleUpdateUser} className="form-field-input btn bg-primary">
                            Update User
                        </button>
                    ) : (
                        <button type="submit" onClick={this.handleAddUser} className="form-field-input btn bg-success">
                            Add User
                        </button>
                    )}
                </div>

                <Table className="table-dark mx-auto mt-5" bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Your Name</th>
                            <th>Father Name</th>
                            <th>Mother Name</th>
                            <th>Your Email</th>
                            <th>D.O.B.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.userFatherName}</td>
                                <td>{user.userMotherName}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userDOB}</td>
                                <td>
                                    <button onClick={() => this.edit(user)} className="btn bg-primary mx-1">Edit</button>
                                    <button onClick={() => this.delete(user.id)} className="btn bg-danger mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
