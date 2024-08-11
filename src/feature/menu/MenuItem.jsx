import { formatCurrency } from "../../utils/helpers";
import Button from '../../ui/Button'
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuatity } from "../cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuatity(id))
  const isAdded = currentQuantity > 0

  const handleAddItem = e => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice
    }

    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut ? 'opacity-70 gra yscale' : ''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm ">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {isAdded && <DeleteButton pizzaId={id}/>}
          {!soldOut && !isAdded && <Button type="small" onClick={handleAddItem}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
