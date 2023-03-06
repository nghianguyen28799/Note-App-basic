const fakeData = {
  authors: [
    {
      id: 123,
      name: "Nghia",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Home",
      createdAt: "2022-11-17T03:42:13Z",
      authorId: 123,
    },
    {
      id: "2",
      name: "New Folder",
      createdAt: "2022-11-17T03:42:13Z",
      authorId: 1231,
    },
    {
      id: "3",
      name: "Work",
      createdAt: "2022-11-17T03:42:13Z",
      authorId: 123,
    },
  ],
  notes: [
    {
      id: "123",
      content: "<p>Go to supermarkets</p>",
      folderId: "2",
    },
    {
      id: "234",
      content: "<p>Go to Park</p>",
      folderId: "2",
    },
    {
      id: "123",
      content: "<p>Go to School</p>",
      folderId: "3",
    },
  ],
};

export default fakeData;
