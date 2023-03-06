import { GraphQLScalarType } from "graphql";
import { AuthorModel, FolderModel, NoteModel, NotificationModel } from "../models/index.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),

  Query: {
    folders: async (parent, args, ctx) => {
      const folders = await FolderModel.find({
        authorId: ctx.uid,
      }).sort({ updatedAt: "desc" });

      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },

    note: async (parent, args) => {
      const { noteId } = args;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },

  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const authors = await AuthorModel.findOne({
        uid: authorId,
      });
      return authors;
    },
    notes: async (parent, args) => {
      const notes = NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },

  Mutation: {
    addNote: async (parent, args, ctx) => {
      const newNote = new NoteModel(args);
      newNote.save();
      return newNote;
    },

    updateNote: async (parent, args, cts) => {
      const note = NoteModel.findByIdAndUpdate(args.id, args);
      return note;
    },

    addFolder: async (parent, args, ctx) => {
      const newFolder = new FolderModel({ ...args, authorId: ctx.uid });
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder created",
        },
      });
      newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        console.log(newUser);
        newUser.save(args);
        return newUser;
      }
      return foundUser;
    },

    pushNotification: async (parent, args) => {
      const newNotification = new NotificationModel(args);

      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.content,
        },
      });

      await newNotification.save();
      return { message: "Success" };
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED", "NOTE_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
