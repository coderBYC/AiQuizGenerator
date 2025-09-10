"use client"
import { useState } from "react";
import {getStripe} from "@/lib/stripe-client"
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ManageSubscription = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const redirectToPortal = async () =>{
        setLoading(true);
        try{
            const { url } = await fetch('/api/stripe/create-portal', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            }
        }
        ).then((res) =>res.json())
       
        router.push(url.url);
    }
        catch(error){
            console.error("Error during subscription:", error);
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} onClick={redirectToPortal}>{loading ? 
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
            </>:
            "Change Your Subscription Plan"
            }</Button>
    )
}

export default ManageSubscription;