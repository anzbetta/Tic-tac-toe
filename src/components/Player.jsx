import {useState} from 'react';

export default function Player({ initialName, symbol }) {
    const [name, setName] = useState(initialName);
    const[isEditing, setIsEditing] = useState(false);
    function handleEditClick(){
        setIsEditing(isEditing => !isEditing);
    }

    function handleName(event){
        setName(event.target.value);
        localStorage.setItem('name', event.target.value);
    }
    return(
        <li>
            <span className="player">
                {isEditing ? <input value={localStorage.getItem('name')} onChange={handleName}></input> : (<span className="player-name">{localStorage.getItem('name')}</span>)}

                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick = {handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
