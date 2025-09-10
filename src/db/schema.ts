import { pgTable, serial, varchar, text, integer, timestamp, pgEnum , primaryKey, boolean} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  userId:text("user_id").references(()=>users.id)
})

export const quizzesRelations = relations(quizzes, ({many})=>({
    questions: many(questions),
    quizSubmissions : many(quizSubmissions)

}))

export const questions = pgTable("questions",{
    id: serial("id").primaryKey(),
    question: text("question_text"),
    quizId: integer("quiz_id"),
    correctAnswer : integer("correct_answer")
}
)

export const questionsRelations = relations(questions,({one,many})=>({
    quiz: one(quizzes, {
        fields: [questions.quizId],
        references:[quizzes.id]
    }),
    options: many(questionOptions)

}))


export const questionOptions = pgTable("options", {
    id: serial("id").primaryKey(),
    optionText: text("option_text"),
    questionId: integer("question_id"),
}
)

export const questionOptionRelations = relations( questionOptions, ({one})=>({
    question: one(questions, {
        fields: [questionOptions.questionId],
        references: [questions.id]
    })

}))

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});


export const users = pgTable("user",{
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified",{mode: "date"}),
    image: text("image"),
    stripeCustomerId: text("stripe_customer_id"),
    subscribed: boolean("subscribed"),

})

export const userRelations = relations(users, ({many}) => ({
    quizzes:many(quizzes) 
}))

export const quizSubmissions = pgTable("Quiz_submissions", {
  id: serial("id").primaryKey(),
  quizId : integer("quiz_id"),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const quizSubmissionRelations = relations(quizSubmissions, ({one}) => ({
  quiz: one(quizzes,{
    fields: [quizSubmissions.quizId],
    references: [quizzes.id]
  })
}))