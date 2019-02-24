import React, { Component } from 'react';
import axios from 'axios';
import Utils from '../utils/Utils';

export default class ContactList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: null
        }
    }

    componentDidMount() {
        axios.get(Utils.apiUrl('/contacts'))
            .then(res => this.setState({ contacts: res.data }))
    }

    render() {
        if (!this.state.contacts) {
            return (
                <div className="alert alert-warning">
                    loading...
                </div>
            )
        }

        return (
            <table className="table text-left table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.contacts && this.state.contacts.length > 0 && this.state.contacts.map((contact, idx) => {
                        return (
                            <tr key={idx}>
                                <th scope="row">{idx}</th>
                                <td>{Utils.timestampToDate(contact.timestamp)}</td>
                                <td>{contact.email}</td>
                                <td>{contact.name}</td>
                                <td>{contact.message}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
};
