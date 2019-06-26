import {Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import api from '../../api/api'
import AuthContext from '../../context/AuthContext'
import {debounce} from 'lodash';

function UserSearch(props){

    const context = useContext(AuthContext).authentication;

    const handleChange = debounce((value)=>{
            userSearch(value)
        }, 350);

    function userSearch(value){
        console.log("SEARCHING")
        const searchString = value;
        if(searchString === ""){
            props.setSearching(false);
        } else{
            props.setSearching(true);
            api.searchUsers(context.token, searchString, props.pageSize || 5,
                (res)=>{
                props.setUsers(res.data);
                props.setLoading(false);
                }, (req) =>{})
        }
    }

    return (
        <Form inline>
            <InputGroup style={{width: "100%"}}>
                <InputGroup.Prepend>
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    type="text"
                    placeholder="Email"
                    onChange={e => {handleChange(e.target.value)}}
                />
                {props.addUserButton && <InputGroup.Append>
                    <InputGroup.Text style={{cursor: "pointer"}} onClick={() => {
                        props.history.push("/users/createUser")
                    }}><FontAwesomeIcon icon={faUserPlus}/></InputGroup.Text>
                </InputGroup.Append>}
            </InputGroup>
        </Form>)

}

export default UserSearch;