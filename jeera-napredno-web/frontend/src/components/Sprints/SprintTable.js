import React from 'react';
import {Table} from "react-bootstrap";

function SprintTable(props){
    return(
        <>
        <Table responsive="lg" size="sm"  striped hover borderless>
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Starting</th>
                <th className="text-left">Due</th>
                <th className="text-left">Tasks</th>
            </tr>
            </thead>
            <tbody className="text-left">

            </tbody>
        </Table>
        </>
    )
}

export default SprintTable;