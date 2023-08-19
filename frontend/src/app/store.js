import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import objectReducer from '../features/objects/objectSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    objects: objectReducer,
  },
})
