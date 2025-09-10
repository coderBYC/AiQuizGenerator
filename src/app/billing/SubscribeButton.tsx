"use client"
import { useState } from "react";
import {getStripe} from "@/lib/stripe-client"
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    userId: string,
    priceId:string
}
const SubscribeButton = ({userId, priceId}:Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const handleSubscribe = async (priceId: string) =>{
        setLoading(true);
        if (!userId){
            router.push('/login')
        }
        try{
            const { sessionId } = await fetch('/api/stripe/checkout-session', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({priceId})
        }
        ).then((res) =>res.json())
        
        const stripe = await getStripe();
        stripe?.redirectToCheckout({sessionId})
        }
        catch(error){
            console.error("Error during subscription:", error);
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} onClick={()=>handleSubscribe(priceId)}>{loading ? 
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
            </>:
            "Upgrade Plan"
            }</Button>
    )
}

export default SubscribeButton