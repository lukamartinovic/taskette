import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/api'
import {AuthContext} from '../../context/'
import {AddTask, Sprint} from "../index";
import {CardDeck} from 'react-bootstrap'

function Sprints(props){
    const token = useContext(AuthContext).authentication.token;

    const [sprints, setSprints] = useState([]);

    useEffect(()=>{
       api.getSprints(token, (res)=>{console.log(res); setSprints(res.data)}, (err)=>{console.log(err)})
    }, []);

    return(<><CardDeck>
        {sprints.map(sprint => {
            return <Sprint key={sprint._id} sprint={sprint}/>
        })}
    </CardDeck>
            <AddTask sprint={sprints[0]} token={token}/>
            </>
    )
}

export default Sprints;