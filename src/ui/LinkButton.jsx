import { Link, useNavigate } from "react-router-dom"

function LinkButton({to, children}) {
  const navigate = useNavigate()
  if(to === '-1') return  <button className="text-sm text-blue-500 hover:text-blue-700 hover:underline" onClick={() => navigate(-1)}>{children} </button> 
  return ( 
      <Link className="text-sm text-blue-500 hover:text-blue-700 hover:underline" to={to}>{children}</Link>
  )
}

export default LinkButton
