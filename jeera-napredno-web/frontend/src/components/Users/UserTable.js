import React, {useContext} from 'react';
import {Table} from "react-bootstrap";
import CheckedUsers from "../../context/CheckedUsers";

function UserTable(props){
    const context = useContext(CheckedUsers);
    function handleCheck(e){
       context.setCheckedUsers(e.target.name, e.target.checked)
    }

    return(

        <>{props.users.length !== 0 &&
            <Table responsive="lg" size="sm"  striped hover borderless>
                <thead>
                <tr>
                    <th className="text-left"></th>
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
                        let key = index || email;
                        return (
                            <tr key={key}>
                                {props.selectUsers ? <td className="text-center"><input checked={context.checkedUsers.users.includes(user._id)} name={user._id} onChange={handleCheck} type="checkbox"/></td> : <td style={{width:"3%"}} className="text-center" >{index && `${index}.`}</td>}
                                <td style={{width:"30%"}} >{email}</td>
                                <td style={{width:"28%"}} >{firstName}</td>
                                <td style={{width:"29%"}} >{lastName}</td>
                                <td style={{width:"10%"}} >{role.substr(0, 1) + role.substr(1).toLowerCase()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>}
        </>



    )
}

export default UserTable;