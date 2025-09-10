import { auth } from "@/auth";
import { db } from "@/db";
import { sql, eq, between, avg} from "drizzle-orm";
import { quizSubmissions, quizzes, users } from "@/db/schema";



const getUserDailyTrend = async () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayidx = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate()- startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date()
  endOfWeek.setDate(endOfWeek.getDate() + (6-endOfWeek.getDay()))
  endOfWeek.setHours(23, 59, 59, 999); 
  


  const data = await db.select({
    date: sql<number>`cast(extract(dow from ${quizSubmissions.createdAt}) as integer)`,
    submissions:sql<number>`cast(count(${quizSubmissions.id}) as integer)`,
    avgScore:sql<number>`cast(avg(${quizSubmissions.score}) as float)`
  })
  .from(quizSubmissions)
  .innerJoin(quizzes, eq(quizSubmissions.quizId, quizzes.id))
  .innerJoin(users, eq(quizzes.userId, users.id))
  .where(between(quizSubmissions.createdAt, startOfWeek, endOfWeek))
  .groupBy(sql`extract(dow from ${quizSubmissions.createdAt})`)
  
  const trend = days.map((day, idx)=>{
    if (idx > todayidx) {
        return {date: day, submissions:0, avgScore: 0 }
    }

    
   
    const found = data.find(d => d.date === idx)
    console.log(found)
    return {
        date: day,
        submissions: found?.submissions ?? 0,
        avgScore: found?.avgScore ? Math.round(Number(found.avgScore)) : 0
    }
})
 

  return trend
   




}

export default getUserDailyTrend