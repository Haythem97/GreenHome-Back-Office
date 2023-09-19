import React from 'react';
import {deleteObject} from "../../features/objects/objectSlice";
import { useDispatch } from 'react-redux'


function ObjetImage(type) {
    switch (type) {
        case 'lampe':
            return "https://www.web-luminaire.com/images/product_image_xl/plafonnier-4-lampes-design-trio-baron-noir-metal-609800432-27688.png";
        case 'capteur':
            return "https://shop.pixtend.de/images/product_images/original_images/dht11_700p.png";
        // Ajoutez d'autres cas pour les types de but supplémentaires
        default:
            return null; // Retournez null si le type de but n'a pas d'icône correspondante
    }
}

function ObjectItem({ object }) {
    const dispatch = useDispatch();
    return (
        <div className='object'>
            <img width={"80px"} height={"80px"} src={ObjetImage(object.type)}/>
            <div>TYPE : {object.type}</div>
            <div>PORT : {object.port}</div>
            <button onClick={() => dispatch(deleteObject(object))} className='close'>
                X
            </button>
            <div>{new Date(object.createdAt).toLocaleString('en-US')}</div>
        </div>
    );
}

export default ObjectItem;