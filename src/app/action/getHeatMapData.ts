import {auth} from "@/auth"
import { db } from "@/db";
import { quizSubmissions, quizzes, users} from "@/db/schema";
import { sql, eq } from "drizzle-orm";

const getHeatMapData = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId){
        return;
    }
    const data = await db.select({
        createdAt: sql<Date>`date_trunc('day', ${quizSubmissions.createdAt})`,
        count: sql<number>`cast(count(${quizSubmissions.id}) as int)`,
    })
    .from(quizSubmissions)
    .innerJoin(quizzes, eq(quizSubmissions.quizId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .groupBy(sql`date_trunc('day', ${quizSubmissions.createdAt})`)
   
    return {data}
}

export default getHeatMapData;