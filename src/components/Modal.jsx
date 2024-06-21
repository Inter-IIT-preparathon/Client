import React, { useEffect } from "react";

const Modal = ({ closeModal, desc }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return() => {
            document.body.style.overflow = "scroll";
        }
    })

    return (
        <>
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
                <h2>Description</h2>
                <p>{desc}</p>
                <button style={{height:'5vh', width:'7vw',borderRadius:'15px', backgroundColor:'#005fc2', cursor:"pointer"}} onClick={closeModal}>Close</button>
            </div>
            
        </>
    )
}

export default Modal