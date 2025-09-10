import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createSubscription({stripeCustomerId}:{stripeCustomerId: string}) {
    if (!stripeCustomerId) {
        throw new Error("Stripe Customer ID is required");
    }

    await db.update(users).set({
        subscribed:true
    }).where(eq(users.stripeCustomerId, stripeCustomerId));
}

export async function deleteSubscription({stripeCustomerId}:{stripeCustomerId: string}){

    if (!stripeCustomerId) {
        throw new Error("Stripe Customer ID is required");
    }

    await db.update(users).set({
        subscribed:false
    }).where(eq(users.stripeCustomerId, stripeCustomerId))


}

export async function getUserSubscription({userId}:{userId: string}){
    if (!userId) {
        throw new Error("User ID is required");
    }
    
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
    })

    return user?.subscribed
}