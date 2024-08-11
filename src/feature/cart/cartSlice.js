import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart = [...state.cart, action.payload]
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItem(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++,
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItem(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            if(item.quantity === 1) state.cart.pop(ele => ele.pizzaId === action.payload)
            item.quantity--,
            item.totalPrice = item.quantity * item.unitPrice
        },
        clearCart(state) {
            state.cart = []
        }
    }
})

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } = cartSlice.actions

export default cartSlice.reducer

export const getTotalPizza = store => store.cart.cart.reduce((sum, item) => sum + item.quantity,0)

export const getTotalPrice = store => store.cart.cart.reduce((sum, item) => sum + item.totalPrice,0)

export const getCurrentQuatity = id => store => store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0