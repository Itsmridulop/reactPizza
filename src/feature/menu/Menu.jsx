import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

import MenuItem from './MenuItem'

function Menu() {
  const menuData = useLoaderData()

  return (
    <ul className="divide-y diviide-stone-200 px-2">
      {menuData.map(pizza => <MenuItem key={pizza.id} pizza={pizza}/>)}
    </ul>
  )
}

export const loader  = async () => {
  return await getMenu()
}

export default Menu;
