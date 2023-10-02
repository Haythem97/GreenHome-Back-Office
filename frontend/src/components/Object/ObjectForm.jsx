import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createObject } from '../../features/objects/objectSlice'
import { useParams } from 'react-router-dom';
import React from 'react';
import Popup from '../Popup/Popup'
import {useEffect} from "react";
import 'reactjs-popup/dist/index.css';

function ObjectForm({numberOfLampes}) {
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [port, setPort] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { chambreId } = useParams(); // Obtenez l'ID depuis les paramètres d'URL
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createObject({objectData: { chambreId: chambreId, name: text, port: port, type: type } }));
        setText('');
    }

    useEffect(() => {
        setText(type === 'lampe' ? `${type} ${numberOfLampes + 1}` : type);
    }, [type, numberOfLampes]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className='form2'>
                <div className='form-group'>
                    <button className='btn btn-block' type='button' onClick={openModal}>Ajouter un nouveau objet</button>
                </div>

            <Popup numberOfLampes={numberOfLampes + 1} isOpen={isModalOpen} onClose={closeModal}>
                <h2>Nouveau Objet</h2>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input
                                name='text'
                                id='text'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                hidden={true}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='type'>Type</label>
                            <select
                                name='type'
                                id='type'
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                }}
                            >
                                <option value=''></option>
                                <option value='lampe'>Lampe</option>
                                <option value='capteur'>Capteur</option>
                                <option value='sensor'>Sensor</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='type'>Port</label>
                            <input
                                name='port'
                                id='port'
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                            />
                        </div>
                        <div className='form-group-btn'>
                            <button className='btn btn-popup-ajouter' type='submit'>
                                Ajouter
                            </button>
                            <button className='btn btn-popup-annuler' onClick={closeModal} >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </Popup>
        </section>
    )
}

export default ObjectForm;
