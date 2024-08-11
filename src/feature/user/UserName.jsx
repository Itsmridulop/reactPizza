import { useSelector } from "react-redux"

function UserName() {
  const userName = useSelector(store =>  store.user.user)
  if(!userName) return null
  return (
    <div className="text-sm font-semibold hidden md:block">
      {userName} 
    </div>
  )
}

export default UserName
