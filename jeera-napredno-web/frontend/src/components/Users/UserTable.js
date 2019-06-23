import React from 'react';
import {Table} from "react-bootstrap";

function UserTable(props){
    return(
        <>
            <Table responsive="md" size="sm"  striped hover borderless>
                <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">First name</th>
                    <th className="text-left">Last name</th>
                    <th className="text-left">Role</th>
                </tr>
                </thead>
                <tbody className="text-left">
                {props.users.map(
                    (user) => {
                        const {lastName, role, index, email, firstName} = user;
                        return (
                            <tr key={index}>
                                <td style={{width:"2%"}} className="text-center" >{index}.</td>
                                <td style={{width:"30%"}} >{email}</td>
                                <td style={{width:"20%"}} >{firstName}</td>
                                <td style={{width:"25%"}} >{lastName}</td>
                                <td style={{width:"20%"}} >{role.substr(0, 1) + role.substr(1).toLowerCase()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>



    )
}

export default UserTable;