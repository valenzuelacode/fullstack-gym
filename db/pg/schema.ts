import {integer,pgTable,varchar,timestamp,text,numeric,date,boolean,snakeCase,pgEnum} from 'drizzle-orm/pg-core';

export const rolesEnum = pgEnum('roles',['customer','admin','superAdmin'])
export const plansEnum = pgEnum('plans',["free",'basic','pro'])

export const timestamps = {
    createdAt:timestamp({withTimezone:true}).defaultNow().notNull(),
    updatedAt:timestamp({withTimezone:true}),
    deletedAt:timestamp({withTimezone:true}),
}

export const userTable = snakeCase.table('user',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar().notNull().unique(),
    firstName: varchar().notNull(),
    lastName: varchar().notNull(),
    password:varchar().notNull(),
    birthday:date(),
    address:text(),
    phoneNumber:varchar(),
    ...timestamps
})

export const userProfileTable = snakeCase.table('userProfile',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    height:integer(),
    weight:numeric({precision:3,scale:2}),
    type:varchar(),
    problems:text(),
    avatar:varchar(),
    role:rolesEnum().default('customer').notNull(),
    plan:plansEnum().default('free').notNull(),
    idGoal:integer().references(()=>goalTable.id),
    idUser:integer().references(()=>userTable.id).unique(),
    ...timestamps
})

export const goalTable = snakeCase.table("goal",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar().notNull().unique(),
    description:text(),
    color:varchar(),
    ...timestamps
})

export const roomTable = snakeCase.table("room",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar().notNull(),
    color:varchar(),
    icon:varchar(),
    capacity:integer().notNull(),
    ...timestamps
})

export const trainingTable = snakeCase.table('training',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar().notNull(),
    description:text(),
    daysTraining:integer(),
    color:varchar(),
    icon:varchar(),
    public:boolean().default(false),
    idGoal:integer().references(()=>goalTable.id),
    idUser:integer().references(()=>userTable.id),
    plan:plansEnum().default('free').notNull(),
    ...timestamps
})

export const trainingExerciceTable = snakeCase.table('trainingExercice',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar().notNull(),
    description:text(),
    series:integer().notNull(),
    reps:integer().notNull(),
    weight:varchar(),
    idTraining:integer().references(()=>trainingTable.id),
    ...timestamps
})

export const eventTable = snakeCase.table('event',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar().notNull(),
    description:text(),
    color:varchar(),
    plan:plansEnum().default('free').notNull(),
    start:timestamp({withTimezone:true}),
    end:timestamp({withTimezone:true}),
    public:boolean().default(true),
    idRoom:integer().references(()=>roomTable.id),
    idUser:integer().references(()=>userTable.id),
    ...timestamps
})

export const userEvent = snakeCase.table("userEvent",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    idEvent:integer().references(()=>eventTable.id),
    idUser:integer().references(()=>userTable.id),
    ...timestamps
})

export const recordTable = snakeCase.table('record',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    start:timestamp({withTimezone:true}),
    end:timestamp({withTimezone:true}),
    idUser:integer().references(()=>userTable.id),
    ...timestamps
})

export const followTable = snakeCase.table('follow',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    idUserFollow:integer().references(()=>userTable.id),
    idUserFollowed:integer().references(()=>userTable.id),
    ...timestamps
})
