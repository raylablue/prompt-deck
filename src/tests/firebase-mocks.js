jest.mock('../firebase/firebase', () => ({
  ui: {
    start: jest.fn(),
  },
  logout: jest.fn(),
  db: {
    collection: jest.fn(),
  },
}));
