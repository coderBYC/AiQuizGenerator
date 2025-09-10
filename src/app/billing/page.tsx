import ManageSubscription from "./ManageSubscription"
import { auth } from "@/auth"
import { signIn } from "next-auth/react"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"

const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId || !session || !session.user){
        signIn()
        return null
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
    })

    const plan = user?.subscribed ?'premium' :'free'

    return (
        <div className="p-4 border rounded-md ">
            <h1 className="text-4xl mb-3">Subscription Details</h1>
            <p className="mb-2">You are currently on a {plan} plan</p>
            <ManageSubscription />
        </div>
    )
}

export default page