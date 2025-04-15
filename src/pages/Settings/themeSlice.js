import { createSlice } from "@reduxjs/toolkit"

const savedTheme = localStorage.getItem("mobile-store-theme") || "coffee";
const initialState = {
  value: savedTheme,
  }

  export const themeSlice= createSlice({
    name: "theme",
    initialState,
    reducers: {
      setTheme: (state, action)=>{
        state.value= action.payload;
        localStorage.setItem("mobile-store-theme",action.payload)
      }
    }
  })

  export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

