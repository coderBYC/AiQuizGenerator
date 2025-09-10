import { createSubscription, deleteSubscription } from "@/app/action/userSubscription";
import Stripe from 'stripe'
import {stripe} from '@/lib/stripe'

export async function POST(req: Request){
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature') as string
    if (!sig){
        return new Response("Missing Stripe signature", { status: 400 });
    }
    const webhookSecret = process.env.NODE_ENV === "production"
    ? process.env.STRIPE_WEBHOOK_SECRET 
    : process.env.STRIPE_WEBHOOK_LOCAL_SERCRET

    if (!webhookSecret){
        return new Response("STRIPE_WEBHOOK_SECRET not set", { status: 500 })
    }

    const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)

    const data = event.data.object as Stripe.Subscription
    switch(event.type){
        case 'customer.subscription.created':
            await createSubscription({stripeCustomerId: data.customer as string})
            break

        case 'customer.subscription.deleted':
            await deleteSubscription({stripeCustomerId: data.customer as string})
            break

        default:
            break
    }

    return new Response(
        JSON.stringify({received:true}), {status:200}
    )





}