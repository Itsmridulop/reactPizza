import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { decreaseItem, getCurrentQuatity, increaseItem } from '../feature/cart/cartSlice'

function UpdateButton({ pizzaId }) {
    const dispatch = useDispatch()
    const currenQuantity = useSelector(getCurrentQuatity(pizzaId))

    return (
        <div>
            <Button type="round" onClick={() => dispatch(decreaseItem(pizzaId)) }>-</Button>
                <span className='mx-4 text-sm font-bold '>{currenQuantity}</span>
            <Button type="round" onClick={() => dispatch(increaseItem(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateButton
