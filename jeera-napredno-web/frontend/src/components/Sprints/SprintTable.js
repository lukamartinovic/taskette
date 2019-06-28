import React from 'react';
import {Table} from "react-bootstrap";
import moment from 'moment';

function SprintTable(props){
    return(
        <>
        {props.sprints.length !== 0 && <Table responsive="lg" size="sm"  striped hover borderless>
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Starting</th>
                <th className="text-left">Due</th>
                <th className="text-left">Tasks</th>
            </tr>
            </thead>
            <tbody className="text-left">
            {props.sprints.map(
                (sprint) => {
                    const {name, startDate, endDate, tasks = 0, _id} = sprint;
                    return (
                        <tr key={_id}>
                            <td style={{width:"25%"}} >{name}</td>
                            <td style={{width:"25%"}} >{moment(startDate).format("DD.MM.YYYY")}</td>
                            <td style={{width:"25%"}} >{moment(endDate).format("DD.MM.YYYY")}</td>
                            <td style={{width:"25%"}} >{tasks.length}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>}
        </>
    )
}

export default SprintTable;