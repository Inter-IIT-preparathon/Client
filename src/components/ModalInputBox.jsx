import React, { useState } from 'react';

function ModalInputBox({closeModal, setDescriptionValue}) {

  const [textAreaValue, setTextAreaValue] = useState('');

  const handleTextAreaChange = (event) => {
    const value = event.target.value;
    setTextAreaValue(value);
    setDescriptionValue(value);
  }

  const submitForm = () => {
    // Handle form submission logic here
    // For this example, we're just updating state and closing the modal
    closeModal();
  };

  return (
    <>
    <div className="modal-wrapper" onClick={closeModal}></div>
    <div className='modal-container'>
      <h3>Enter Description</h3>
      <textarea value={textAreaValue} onChange={handleTextAreaChange} style={{width:'40vw', height:'40vh',fontSize:'3vh', borderColor:'blue'}} type="text" name='description'/>
      <button className="createbutton" onClick={submitForm}>Close</button>
    </div>
    </>
  );
}

export default ModalInputBox;
