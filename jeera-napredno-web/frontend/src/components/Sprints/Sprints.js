import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/api'
import {AuthContext} from '../../context/'
import {Sprint} from "../index";
import {CardDeck} from 'react-bootstrap'

function Sprints(props){
    const token = useContext(AuthContext).authentication.token;

    const [sprints, setSprints] = useState([]);

    useEffect(()=>{
       api.getSprints(token, (res)=>{console.log(res); setSprints(res.data)}, (err)=>{console.log(err)})
    }, []);

    return(<><CardDeck>
        {sprints.map(sprint => {
            return <Sprint addingTasksDisabled={sprint.currentPoints === sprint.points} key={sprint._id} token={token} key={sprint._id} sprint={sprint}/>
        })}
    </CardDeck>
            </>
    )
}

export default Sprints;