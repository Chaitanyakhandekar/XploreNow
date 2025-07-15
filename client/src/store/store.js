import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import tripReducer from "./slices/tripSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
    // booking: bookingReducer,
  },
})
