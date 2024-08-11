import { useDispatch } from "react-redux"
import { deleteItem } from "../feature/cart/cartSlice"

import Button from "./Button"

function DeleteButton({ pizzaId }) {
    const dispatch = useDispatch()

    return (
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>remove</Button>
    )
}

export default DeleteButton
