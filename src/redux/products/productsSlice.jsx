import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [
        {
            id: "e7ce2b97-d0c1-4a75-9c1d-e6dfc8441836",
            nama: "John",
            category: "Doe",
            freshness: "Doe",
            price: "Doe",
            imageFile: "Doe",
            description: "Doe",
            
            }
    ],
    reducers: {
        addProduct: (state, actions) => {
            const product = {
                id : uuid(),
                nama : actions.payload.product.nama,
                price : actions.payload.product.price,
                imageFile : actions.payload.product.imageFile,
                category : actions.payload.product.category,
                freshness : actions.payload.product.freshness,
                description : actions.payload.product.description
            }
            
            return[...state, product]
        
        },
        deleteProduct: (state, action) => {
            return state.filter(product => product.id !== action.payload)
        },
        editProduct:(state, actions) => {


            const existingProduct = state.find((product) => product.id === actions.payload.id)

            if (existingProduct){
                existingProduct.nama = actions.payload.product.nama
                existingProduct.price = actions.payload.product.price
                existingProduct.freshness = actions.payload.product.freshness
                existingProduct.category = actions.payload.product.category
                existingProduct.description = actions.payload.product.description
                existingProduct.imageFile = actions.payload.product.imageFile
            }
        }
    }
}) 

export const { addProduct, deleteProduct, editProduct } = productsSlice.actions

export default productsSlice.reducer