import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart, getTotalPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";

import store from '../../store'
import Button from '../../ui/Button'

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {userName, status: addressStatus, error: addressError, address, position} = useSelector(store => store.user)
  const dispatch = useDispatch()
  const cart = useSelector(store => store.cart.cart);
  const isLoading = addressStatus === 'loading'
  const cartPrice = useSelector(getTotalPrice)
  const priorityPrice = withPriority ? cartPrice * 0.2 : 0
  const totalPrice = cartPrice + priorityPrice
  const formError = useActionData()

  const handleFetchAddress = e => {
    e.preventDefault()
    dispatch(fetchAddress())
  }

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={userName} required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex flex-col grow">
            <div className="flex flex-row">
              <select className="px-2 rounded-full bg-stone-300 m-1" name="countryCode">
                <option value="+91">+91</option>
                <option value="+44">+44</option>
                <option value="+22">+22</option>
                <option value="+34">+34</option>
              </select>
              <input className="input w-full" type="tel" name="phone" required />
            </div>
            {formError?.phone && <p className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded-md">{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required disabled={isLoading} defaultValue={address}/>
            {!address && <span className="absolute right-1 top-1"><Button type='small' disabled={isLoading} onClick={handleFetchAddress}>Get Address</Button></span>}
            {addressError && <p className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded-md">{addressError}</p>}
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <input type="hidden" value={position?.latitude && position.longitude ? `${position.latitude} ${position.longtitude}`: ''} name="position" />
        <div className="mt-4">
          <Button type="primary" disabled={useNavigation().state === 'submitting' || isLoading}>{useNavigation().state === 'submitting' ? 'Placing Order....' : `Order now for just ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData())
  const order = {
    ...data,
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart)
  }
  const error = {}
  if (!isValidPhone(order.phone) || order.phone.length !== 10) error.phone = 'Please enter a valid phone number so that we can use it for contacting you'
  if (Object.keys(error).length > 0) return error
  const newOrder = await createOrder(order)
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
