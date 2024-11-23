import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  errorPop: null,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loaderOn(state) {
      state.loading = true
    },
    loaderOff(state) {
      state.loading = false
    },
    errorOn(state, action) {
      state.errorPop = action.payload
    },
    errorOff(state) {
      state.errorPop = null
    },
  },
})

export const { loaderOn, loaderOff, errorOff, errorOn } = appSlice.actions

export default appSlice.reducer
