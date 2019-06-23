import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';

export default LoadingSpinner;

function LoadingSpinner(props){
    const [show, setShow] = useState(false);
    const loading = props.loading || false;
    useEffect(()=>{
        let didCancel = false;
        setTimeout(
            ()=>{!didCancel && setShow(true);}, props.delay);
        return(
            function(){
                didCancel = true;
            }
        )
    },[]);

    return (<>{loading && show && <div style={{position: "relative", top: "50%", transform: "translateY(-50%)"}}><Spinner animation="border"/></div>}</>)
}








