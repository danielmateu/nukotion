import { v as v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel";

/* The `export const archive = mutation({ ... })` code block defines a mutation function named
`archive`. */
export const archive = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Documento no encontrado");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("No tienes permisos para editar este documento");
        }

        /**
         * The recursiveArchive function archives a document and all its children documents.
         * @param documentId - The documentId parameter is the unique identifier of a document that you
         * want to recursively archive.
         */
        const recursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db.query("documents").withIndex("by_user_parent", (q) => (
                q
                    .eq("userId", userId)
                    .eq("parentDocument", documentId)
            ))
                .collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })

                await recursiveArchive(child._id);
            }
        }

        /* The code `const document = await ctx.db.patch(args.id, { isArchived: true })` is updating
        the `isArchived` property of a document with the specified `args.id` to `true`. It is using
        the `ctx.db.patch` method to update the document in the database. The updated document is
        then stored in the `document` variable. */
        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        recursiveArchive(args.id);

        return document;
    }
});

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Debes estar autenticado')
        }

        const userID = identity.subject;

        const documents = await ctx.db.query("documents")
            .withIndex("by_user_parent", (q) =>
                q.eq("userId", userID).eq("parentDocument", args.parentDocument)
            )
            .filter((q) =>
                q.eq(q.field("isArchived"), false)
            )
            .order("desc")
            .collect()

        return documents;
    }
});

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false
        })

        return document;
    }
});

export const getTrash = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        /* The code is querying the database to retrieve a list of documents that are archived for a
        specific user. */
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) =>
                q.eq(q.field("isArchived"), true),
            )
            .order("desc")
            .collect()

        return documents;
    }

});

export const restore = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Documento no encontrado");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("No tienes permisos para editar este documento");
        }

        /**
         * The recursiveRestore function restores a document and all its children by setting their
         * isArchived property to false.
         * @param documentId - The documentId parameter is the unique identifier of the document that
         * needs to be restored.
         */
        const recursiveRestore = async (documentId: Id<"documents">) => {
            const children = await ctx.db.query("documents").withIndex("by_user_parent", (q) => (
                q
                    .eq("userId", userId)
                    .eq("parentDocument", documentId)
            ))
                .collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false
                })

                await recursiveRestore(child._id);
            }
        }

        const options: Partial<Doc<"documents">> = {
            isArchived: false
        }

        if (existingDocument.parentDocument) {
            const parent = await ctx.db.get(existingDocument.parentDocument);
            if (parent?.isArchived) {
                options.parentDocument = undefined;
            }
        }

        const document = await ctx.db.patch(args.id, options);

        recursiveRestore(args.id);

        return document;
    }
});

export const remove = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Documento no encontrado");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("No tienes permisos para editar este documento");
        }

        /**
         * The recursiveRemove function removes a document and all its children documents.
         * @param documentId - The documentId parameter is the unique identifier of a document that you
         * want to recursively remove.
         */

        const document = await ctx.db.delete(args.id);

        return document;
    }
});

export const getSearch = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) =>
                q.eq(q.field("isArchived"), false)
            )
            .order("desc")
            .collect()

        return documents;
    }
})

export const getById = query({
    args: { documentId: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        const document = await ctx.db.get(args.documentId);

        if (!document) {
            throw new Error("Documento no encontrado");
        }

        if (document.isPublished && !document.isArchived) {
            return document;
        }

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        if (document.userId !== userId) {
            throw new Error("No tienes permisos para editar este documento");
        }

        return document;
    }
})


export const update = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const { id, ...rest } = args;

        const existingDocument = await ctx.db.get(id);

        if (!existingDocument) {
            throw new Error("Documento no encontrado");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("No tienes permisos para editar este documento");
        }

        const document = await ctx.db.patch(args.id, {
            ...rest,
        });

        return document;
    }
})