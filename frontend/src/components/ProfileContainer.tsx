import { useAuth, UserButton } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ProfileContainer = () => {
  
    const { isSignedIn } = useAuth();

    if ( !isSignedIn) {
        return (
            <div className="flex items-center">
                <Loader className="min-h-4 min-w-4 animate-spin text-emerald-500"/>
            </div>
        )
    }

  return (
    <div className="flex items-center gap-6">
        { isSignedIn ? 
            <UserButton /> 
            : 
            <Link to="/login">
                <Button size={"sm"}>Get Started</Button>
            </Link> }
    </div>
  )
}

export default ProfileContainer