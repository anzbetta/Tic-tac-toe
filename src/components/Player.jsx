//import {useState} from 'react';
//
//export default function Player({ initialName, symbol }) {
//    const [name, setName] = useState(localStorage.getItem(symbol) || initialName);
//    function handleName(event){
//        setName(event.target.value);
//        localStorage.setItem(symbol, event.target.value);
//    }
//    
//    const[isEditing, setIsEditing] = useState(false);
//    function handleEditClick(){
//        setIsEditing(isEditing => !isEditing);
//    }
//
//
//    return(
//        <li>
//            <span className="player">
//                {isEditing ? <input value={name} onChange={handleName}></input> : (<span className="player-name">{name}</span>)}
//
//                <span className="player-symbol">{symbol}</span>
//            </span>
//            <button onClick = {handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
//        </li>
//    );
//} 



import { useState, useEffect, useRef } from 'react';

export default function Player({ name, symbol, isActive, onNameChange }) {

    const [isEditing, setIsEditing] = useState(false);
    const playerRef = useRef(null);

    function handleEditClick(e) {
        e.stopPropagation();
        setIsEditing(prev => !prev);
    }

    function handleName(event) {
        onNameChange(symbol, event.target.value);
    }

    useEffect(() => {

        function handleClickOutside(event) {
            if (
                isEditing &&
                playerRef.current &&
                !playerRef.current.contains(event.target)
            ) {
                setIsEditing(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [isEditing]);

    return (
        <li
            ref={playerRef}
            className={isActive ? "active" : undefined}
        >
            <span className="player">

                {isEditing ? (
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={handleName}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span
                        onClick={handleEditClick}
                        className="player-name"
                    >
                        {name}
                    </span>
                )}

                <span className="player-symbol">
                    {symbol}
                </span>

            </span>

            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>

        </li>
    );
}