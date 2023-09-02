import { useDispatch } from 'react-redux'
import { deleteGoal } from '../../features/goals/goalSlice'
import {Link} from "react-router-dom";
import Cuisine from "../../public/Cuisine.png"
import Bedroom from "../../public/Bedroom.png"
import salon from "../../public/salon.png"
import WC from "../../public/WC.png"
import React, {useState} from "react";
import Popup from "../Popup/Popup";

function ImageChambre(type) {
    switch (type) {
        case 'cuisine':
            return Cuisine;
        case 'chambre':
            return Bedroom;
        case 'salon':
            return salon;
        case 'WC':
            return WC;
        // Ajoutez d'autres cas pour les types de but supplémentaires
        default:
            return null; // Retournez null si le type de but n'a pas d'icône correspondante
    }
}
function GoalItem({ goal }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='goal' style={{backgroundImage: `url("${ImageChambre(goal.type)}")`,}}>
            <Link to={`/goals/${goal._id}`}>
                <div className="name">
                <h2>
                    {goal.name.toUpperCase()}
                </h2>
            </div>
            </Link>
            <button  onClick={openModal} className='close'>
                X
            </button>
            <Popup isOpen={isModalOpen} onClose={closeModal}>
                <h2>ETES VOUS SUR DE VOULOIR SUPPRIMER</h2>
                <div>
                    <form>
                        <div className='form-group-btn'>
                            <button className='btn btn-popup-ajouter'onClick={() => dispatch(deleteGoal(goal._id))}>
                                Confirmer
                            </button>
                            <button className='btn btn-popup-annuler' onClick={closeModal} >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    );
}

export default GoalItem;

