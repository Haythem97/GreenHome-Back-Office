import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import {Link} from "react-router-dom";

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
        <Link to={`/goals/${goal._id}`}>{goal.text}</Link>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem
