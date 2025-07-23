import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MainRoutes } from "@/lib/helper"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/clerk-react"
import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"


const ToggleContainer = () => {
    
    const { userId } = useAuth();

    return (
        <Sheet>
            <SheetTrigger className="block md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <nav>
                    <ul className="flex flex-col items-start gap-8">
                        {MainRoutes.map((route) => (
                            <NavLink
                                className={({ isActive }: any) =>
                                    cn(
                                        "text-base text-neutral-600",
                                        isActive && "text-neutral-900 font-semibold"
                                    )
                                }
                                key={route.href}
                                to={route.href}
                            >
                                {route.label}
                            </NavLink>
                        ))}

                        {userId && (
                            <NavLink
                                className={({ isActive }: any) =>
                                    cn(
                                        "text-base text-neutral-600",
                                        isActive && "text-neutral-900 font-semibold"
                                    )
                                }
                                to={"/generate"}
                            >
                                Take an Interview
                            </NavLink>
                        )}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default ToggleContainer