import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizza, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPizza = useSelector(getTotalPizza)
  const totalPrice = useSelector(getTotalPrice)


  if(!totalPizza) return null 
  return (
    <div className="bg-stone-800 uppercase px-4 py-4 flex items-center justify-between text-stone-200 text-sm sm:px-6 md:text-base ">
      <p className="text-stone-300 font-semiblod space-x-4 sm:space-x-6">
        <span>{totalPizza} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
  