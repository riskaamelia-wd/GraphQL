import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './products/productsSlice.jsx'

export default configureStore({
    reducer: {
        products: productsReducer
    }
})