import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../../features/goals/goalSlice'
import Popup from "../Popup/Popup";

function GoalForm() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ goalData: { name: name, type: type } }))
    setName('')
    setType('')
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
      <section className='form2'>
        <div className='form-group'>
          <button className='btn btn-block' type='button' onClick={openModal}>Ajouter une nouvelle chambre</button>
        </div>

        <Popup isOpen={isModalOpen} onClose={closeModal}>
          <h2>Nouvelle Chambre</h2>
          <div>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='type'>Name</label>
                <input
                    name='text'
                    id='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='type'>Type</label>
                <select
                    name='name'
                    id='type'
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                >
                  <option value=''></option>
                  <option value='chambre'>Chambre</option>
                  <option value='cuisine'>Cuisine</option>
                  <option value='WC'>Salle de bain</option>
                  <option value='salon'>Salon</option>
                </select>
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

export default GoalForm
