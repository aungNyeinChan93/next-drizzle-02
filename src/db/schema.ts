import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer, index } from "drizzle-orm/pg-core";


export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});


// users
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
    articles: many(articleTable),
    comments: many(commentTable)
}))


// articles 
export const articleTable = pgTable('articles', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    title: text('title').notNull(),
    body: text('body'),
    author_id: text('suthor_id').notNull().references(() => user.id, { onDelete: 'cascade' }),

    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date())
}, (table) => {
    return {
        titleIndex: index('titleIndex').on(table.title)
    }
});

export const articleRelations = relations(articleTable, ({ one, many }) => ({
    user: one(user, {
        fields: [articleTable.author_id],
        references: [user.id]
    }),
}));

// comments
export const commentTable = pgTable('comments', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    body: text('body').notNull(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'no action' }),
    article_id: integer('article_id').notNull().references(() => articleTable.id, { onDelete: "cascade" }),

    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date())
}, (table) => {
    return { bodyIndex: index('bodyIndex').on(table.body) }
});

export const commentRelations = relations(commentTable, ({ one, many }) => ({
    user: one(user, {
        fields: [commentTable.user_id],
        references: [user.id]
    }),
    article: one(articleTable, {
        fields: [commentTable.article_id],
        references: [articleTable.id]
    })
}))