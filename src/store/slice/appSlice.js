import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  error: null,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loaderOn(state, action) {
      state.loading = true
    },
    loaderOff(state, action) {
      state.loading = false
    },
    errorOn(state, action) {
      state.error = true
    },
    errorOff(state, action) {
      state.error = false
    },
  },
})

export const { loaderOn, loaderOff, errorOff, errorOn } = appSlice.actions

export default appSlice.reducer
