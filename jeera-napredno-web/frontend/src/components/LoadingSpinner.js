import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog, faSpinner} from '@fortawesome/free-solid-svg-icons';

export default LoadingSpinner;

function LoadingSpinner(props){
    const [show, setShow] = useState(false);
    const loading = props.loading || true;


    useEffect(()=>{
        let didCancel = false;
        props.delay ? setTimeout(
            ()=>{!didCancel && setShow(true);}, props.delay) : setShow(true);
        return(
            function(){
                didCancel = true;
            }
        )
    },[props.delay]);

    return (<>{loading && show && <div style={{position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><FontAwesomeIcon spin size={props.size || "2x"} icon={props.cog ? faCog : faSpinner}/></div>}</>)
}








