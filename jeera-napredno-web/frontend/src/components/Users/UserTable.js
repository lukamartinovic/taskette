import React from 'react';
import {Table} from "react-bootstrap";

function UserTable(props){
    return(
        <>
            <Table size="sm" striped hover borderless>
            <thead>
            <tr>
                <th>#</th>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {props.users.map(
                (user) => {
                    return(
                        <tr key={user.index}>
                            <td>{user.index}</td>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role.substr(0, 1) + user.role.substr(1).toLowerCase()}</td>
                        </tr>
                    )})}
            </tbody>
        </Table>
        </>



    )
}

export default UserTable;