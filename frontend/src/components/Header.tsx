import { useAuth } from "@clerk/clerk-react"
import Container from "./Container"
import LogoContainer from "./LogoContainer";
import NavRoutes from "./NavRoutes";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";


const Header = () => {

  const { userId } = useAuth();

  return (
    <header className={cn("w-full border-b duration-150 translate-all ease-in-out")}>
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* logo */}
          <LogoContainer />

          {/* nav section */}
          <nav className="hidden md:flex flex-1 justify-center gap-3">
            <NavRoutes />
            {userId && (
              <NavLink
                to={'/generate'}
                className={({ isActive }) => cn("text-base text-neutral-600", isActive && "text-neutral-900 font-semibold")}
              >
                Take an interview
              </NavLink>
            )}
          </nav>

          {/* profile section */}
        </div>
      </Container>
    </header>
  )
}

export default Header