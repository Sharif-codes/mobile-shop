import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../pages/Settings/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})