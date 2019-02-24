import React, { Component } from 'react';

export default class Centered extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-lg-8 m-auto">
                    <div className="text-center">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}