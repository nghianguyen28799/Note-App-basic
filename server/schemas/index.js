export const typeDefs = `#graphql
  scalar Date 
  
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author
    notes: [Note]
  }

  type Note {
    id: String!,
    content: String
    updatedAt: Date
  }

  type Author {
    uid: String!,
    name: String!
  }

  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder
    note(noteId: String!): Note
  }

  type Mutation {
    addNote(folderId: String!, content: String!): Note
    updateNote(id: String!, content: String!): Note
    addFolder(name: String!): Folder
    register(uid: String, name: String!): Author
    pushNotification(content: String!): Message
  }

  type Message {
    message: String
  }

  type Subscription {
    folderCreated: Message
    notification: Message
  }
`;
