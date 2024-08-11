import { Link } from "react-router-dom"

function Button({disabled, to, children, type, onClick}) {
  const base = "bg-yellow-400 text-sm font-semibold uppercase text-stone-800 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 text-xs py-2 sm:px-5 sm:py-2.5',
    round: base + ' px-2.5 text-sm py-1 sm:px-3.5 sm:py-2',
    secondary: "border-2 text-sm border-stone-200 px-4 py-2.5 md:px-6 md:py-3.5 font-semibold uppercase text-stone-400 tracking-wide rounded-full hover:text-stone-800 hover:bg-stone-300 transition-colors duration-300 focus:ring focus:bg-stone-300 focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
  }
  if(to) return <Link className={styles[type]}  to={to}>{children}</Link>
  return (
    <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
