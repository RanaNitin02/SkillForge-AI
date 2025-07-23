import { Outlet } from "react-router-dom"
import bg from '../assets/img/bg.png'


const AuthLayout = () => {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center overflow-hidden">
      <img src={bg} alt="Background" className="absolute w-full h-full object-cover opacity-20" />

        <Outlet />
        
    </div>
  )
}

export default AuthLayout
