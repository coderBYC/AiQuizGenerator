import { db } from "@/db";
import {auth} from "@/auth";
import { stripe } from "@/lib/stripe";
import {eq} from "drizzle-orm";
import { users } from "@/db/schema";

export async function POST (req: Request) {
    const {priceId} = await req.json()
    const userSession = await auth();
    const userId = userSession?.user?.id;
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!priceId) {
      return Response.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
        where:eq(users.id, userId)
    })

    let customer;

    if (user?.stripeCustomerId){
        customer = {
            id: user.stripeCustomerId
        }
    } else {
        const customerData : {
            metadata: {
                dbId:string
            } }= {
                metadata: {
                 dbId: userId
                },
        }

        const response = await stripe.customers.create(customerData)
        customer = {id : response.id}
        await db.update(users).set({
            stripeCustomerId: customer.id
        }).where(eq(users.id, userId))
    }

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    try{
        const session = await stripe.checkout.sessions.create({
            customer:customer.id,
            mode:'subscription',
            payment_method_types: ["card"],
            line_items:[
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url:`${baseurl}/billing/payment/success`,
            cancel_url:`${baseurl}/billing/payment/cancel`,
        })

        if (session){
            return new Response(JSON.stringify(
            {sessionId : session.id}), {status:200}
        )}

        else{
            return new Response(JSON.stringify(
                {error: 'Failed to create checkout session'}
            ), {
                status: 500
            })

        }

    }catch (error){
        console.log('Error creating checkout session', error)
        return new Response(JSON.stringify(
            {error}
        ), {
            status:500
        })



    }






    





}
