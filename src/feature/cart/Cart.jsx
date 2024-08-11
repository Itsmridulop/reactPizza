import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';


import LinkButton from '../../ui/LinkButton'
import EmptyCart from './EmptyCart'
import Button from '../../ui/Button'
import CartItem from './CartItem';

function Cart() {
  const cart = useSelector(store => store.cart.cart)
  const userName = useSelector(store => store.user.user)
  const dispatch = useDispatch()


  if(!cart.length) return <EmptyCart/>

  return (
    <div className='py-4 px-3'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>
      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map(item => <CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button type="primary" to="/order/new">Order Pizza</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
