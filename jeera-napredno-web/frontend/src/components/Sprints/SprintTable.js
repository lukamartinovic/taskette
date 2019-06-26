import React, {useContext} from 'react';
import {Table} from "react-bootstrap";
import moment from 'moment';
import {ProjectContext} from '../../context'

function SprintTable(props){
    const context = useContext(ProjectContext).projectContext;
    const sprints = context.activeProject.sprints;


    return(
        <>
        {sprints.length !== 0 && <Table responsive="lg" size="sm"  striped hover borderless>
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Starting</th>
                <th className="text-left">Due</th>
                <th className="text-left">Tasks</th>
            </tr>
            </thead>
            <tbody className="text-left">
            {sprints.map(
                (sprint) => {
                    const {name, startDate, endDate, tasks, _id} = sprint;
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