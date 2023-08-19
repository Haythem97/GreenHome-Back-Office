import React from 'react';
import { useParams } from 'react-router-dom';
import {deleteObject} from "../features/objects/objectSlice";
import { useDispatch } from 'react-redux'

function ObjectItem({ object }) {
    const dispatch = useDispatch() // Récupère l'ID depuis les paramètres d'URL
    return (
        <div>

            <div className='goal'>
                <div>{new Date(object.createdAt).toLocaleString('en-US')}</div>
                <h2>{object.text}</h2>
                <button onClick={() => dispatch(deleteObject(object._id))} className='close'>
                    X
                </button>
            </div>
        </div>
    );
}

export default ObjectItem;