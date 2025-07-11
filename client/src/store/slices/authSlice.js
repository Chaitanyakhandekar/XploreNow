import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { user, token, role } = action.payload
      state.isAuthenticated = true
      state.user = user
      state.token = token
      state.role = role
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.role = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
