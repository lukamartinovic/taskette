import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default class Users extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        console.log(this.props.context)
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {this.setState({hits: data})})
    }

    render() {
        return(
            <div>
            <div>{JSON.stringify(this.state)}</div>
        </div>)};
}