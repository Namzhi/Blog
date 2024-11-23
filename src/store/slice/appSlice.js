import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  errorPop: null,
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
      state.errorPop = action.payload

      setTimeout(() => {
        console.log(123)
        state.errorPop = 'sdfsdf'
      }, 2000)
    },
    errorOff(state, action) {
      state.errorPop = 'sdfsdf'
    },
  },
})

export const { loaderOn, loaderOff, errorOff, errorOn } = appSlice.actions

export default appSlice.reducer
