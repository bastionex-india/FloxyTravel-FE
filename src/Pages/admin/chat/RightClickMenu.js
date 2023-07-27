import React from 'react';
import './RightClickMenu.css'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function RightClickMenu({ x, y, onClose,handleMessageDelete }) {

    return (
        <div className="right-click-menu" style={{ top: y, left: x }}>
            <ul>
                <li>
                    <IconButton aria-label="delete" onClick={handleMessageDelete} color="error" size='small'>
                        <DeleteIcon />
                    </IconButton>
                </li>
            </ul>
            {/* <button onClick={onClose}>Close</button> */}
        </div>
    );
}

export default RightClickMenu;
