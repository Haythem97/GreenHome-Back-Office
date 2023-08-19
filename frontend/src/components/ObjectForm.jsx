import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createObject } from '../features/objects/objectSlice'
import {useParams} from "react-router-dom";

function ObjectForm() {
  const [text, setText] = useState('')
  const { goalId } = useParams(); // Obtenez l'ID depuis les paramètres d'URL

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createObject({ goalId: goalId, objectData: { _id: goalId, text: text } }));
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Objects</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Object
          </button>
        </div>
      </form>
    </section>
  )
}

export default ObjectForm
