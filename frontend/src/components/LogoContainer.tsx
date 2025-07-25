import { Link } from "react-router-dom"
import Logo from '../assets/img/logo/logo.png'

const LogoContainer = () => {
  return (
    <Link to="/">
      <img
        src={Logo}
        className="h-10 w-34 object-contain"
        alt="logo"
      />
    </Link>
  )
}

export default LogoContainer