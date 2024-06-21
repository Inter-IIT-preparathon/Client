import React from "react";

const Alert = ({msg}) => {
    return <>
        <div style={{position:'fixed', width:'100%'}} class="alert alert-primary" role="alert">
    {msg}
    </div>
    </>
}

export default Alert