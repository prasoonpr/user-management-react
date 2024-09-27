import React, { useEffect } from 'react'
import './DeleteModal.css'

function DeleteModal({isOpen,onClose,confirmDelete}) {
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        // Cleanup function to reset the overflow style
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpen]);
    if (!isOpen) return null;
    
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{color:"red"}}>Are you sure!</h3>
        <p>This action cannot be undone </p>
        <div className='buttonCarry'>

        <button className="modal-close-button" onClick={onClose}>Cancel</button>
        <button className="modal-close-button" style={{background:"red"}} onClick={confirmDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
