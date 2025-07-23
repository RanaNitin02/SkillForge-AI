import { cn } from "@/lib/utils"
import {Loader as LucideLoder} from "lucide-react";

const Loader = ({ classname } : { classname?: string}) => {
  return (
    <div className={cn("w-screen h-screen flex items-center justify-center bg-transparent", classname)}>
        <LucideLoder className="w-6 h-6 min-w-6 min-h-6 animate-spin" />
    </div>
  )
}

export default Loader