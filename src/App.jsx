import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import Home from './ui/Home'
import Error from './ui/Error'
import Menu, { loader as MenuLoadedr } from './feature/menu/Menu'
import Cart from './feature/cart/Cart'
import CreateOrder, {action as createOrderAction} from './feature/order/CreateOrder'
import Order, {loader as OrderLoader} from './feature/order/Order'
import AppLayout from "./ui/AppLayout"
import { action as updateOrderAction} from './feature/order/UpdateOrder'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error/>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu />,errorElement: <Error/>, loader: MenuLoadedr },
      { path: '/cart', element: <Cart /> },
      { path: '/order', element: <Navigate to='new' /> },
      { path: '/order/new', element: <CreateOrder />, action: createOrderAction },
      { path: '/order/:orderId', element: <Order />, errorElement: <Error/>, loader: OrderLoader, action: updateOrderAction}
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
