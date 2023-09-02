import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
    function Logout(isCollapsed) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
            <button className='btn-sidebar' width={isCollapsed ? "10px" : "3S0%"} onClick={onLogout}>
              <FaSignOutAlt /> &nbsp; Logout
            </button>
  )
}

export default Logout
