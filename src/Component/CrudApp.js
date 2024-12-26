import React, { Component } from 'react';
import './CrudApp.css';
import Table from 'react-bootstrap/Table';
import { Formik } from 'formik';

export default class CrudApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userName: '',
            userFatherName: '',
            userMotherName: '',
            userEmail: '',
            userDOB: '',
            editId: null,
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        fetch('https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users')
            .then((response) => response.json())
            .then((data) => this.setState({ users: data }));
    };

    handleAddUser = (values) => {
        const { userName, userFatherName, userMotherName, userEmail, userDOB } = values;

        if (userName && userFatherName && userMotherName && userEmail && userDOB) {
            const newUser = { userName, userFatherName, userMotherName, userEmail, userDOB };
            fetch('https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })
                .then((response) => response.json())
                .then(() => {
                    this.fetchUsers();
                });
        } else {
            alert('Please Enter All Values in Fields');
        }
    };

    handleUpdateUser = (values) => {
        const { userName, userFatherName, userMotherName, userEmail, userDOB, editId } = values;

        if (userName && userFatherName && userMotherName && userEmail && userDOB) {
            const updatedUser = { userName, userFatherName, userMotherName, userEmail, userDOB };
            fetch(`https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            })
                .then((response) => response.json())
                .then(() => {
                    this.fetchUsers();
                });
        }
    };

    delete = (id) => {
        fetch(`https://676a3a7a863eaa5ac0ddb69d.mockapi.io/users/${id}`, {
            method: 'DELETE',
        }).then(() => {
            this.fetchUsers();
        });
    };

    render() {
        const { users, editId } = this.state;

        return (
            <div className="container">
                <div className="form-container">
                    <h2 className="form-heading">Registration Form</h2>


                    <Formik
                        initialValues={{
                            userName: this.state.userName,
                            userFatherName: this.state.userFatherName,
                            userMotherName: this.state.userMotherName,
                            userEmail: this.state.userEmail,
                            userDOB: this.state.userDOB,
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.userName) {
                                errors.userName = 'User Name is required';
                            }
                            if (!values.userFatherName) {
                                errors.userFatherName = 'Father Name is required';
                            }
                            if (!values.userMotherName) {
                                errors.userMotherName = 'Mother Name is required';
                            }
                            if (!values.userEmail) {
                                errors.userEmail = 'Email is required';
                            } else if (!/\S+@\S+\.\S+/.test(values.userEmail)) {
                                errors.userEmail = 'Invalid email format';
                            }
                            if (!values.userDOB) {
                                errors.userDOB = 'Date of Birth is required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (editId) {
                                this.handleUpdateUser(values);
                            } else {
                                this.handleAddUser(values);
                            }
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Your Name"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-field-input"
                                />
                                {errors.userName && touched.userName && <div>{errors.userName}</div>}
                                <br />

                                <input
                                    type="text"
                                    name="userFatherName"
                                    placeholder="Father Name"
                                    value={values.userFatherName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-field-input"
                                />
                                {errors.userFatherName && touched.userFatherName && <div>{errors.userFatherName}</div>}
                                <br />

                                <input
                                    type="text"
                                    name="userMotherName"
                                    placeholder="Mother Name"
                                    value={values.userMotherName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-field-input"
                                />
                                {errors.userMotherName && touched.userMotherName && <div>{errors.userMotherName}</div>}
                                <br />

                                <input
                                    type="email"
                                    name="userEmail"
                                    placeholder="Your Email"
                                    value={values.userEmail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-field-input"
                                />
                                {errors.userEmail && touched.userEmail && <div>{errors.userEmail}</div>}
                                <br />

                                <input
                                    type="date"
                                    name="userDOB"
                                    value={values.userDOB}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-field-input"
                                />
                                {errors.userDOB && touched.userDOB && <div>{errors.userDOB}</div>}
                                <br />

                                <button
                                    type="submit"
                                    className={`form-field-input btn ${editId ? 'bg-primary' : 'bg-success'}`}
                                    disabled={isSubmitting}
                                >
                                    {editId ? 'Update User' : 'Add User'}
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>

                <Table className="table-dark mx-auto mt-5" bordered hover>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
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
                                    <button onClick={() => this.edit(user)} className="btn bg-primary mx-1">
                                        Edit
                                    </button>
                                    <button onClick={() => this.delete(user.id)} className="btn bg-danger mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
