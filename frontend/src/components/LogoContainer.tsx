import { Link } from "react-router-dom"
import Logo from '../assets/svg/logo.svg'

const LogoContainer = () => {
  return (
    <Link to="/">
      <img src={Logo} className="min-w-10 min-h-10 object-contain " />
    </Link>
  )
}

export default LogoContainer