jest.mock('../firebase/firebase', () => ({
  ui: {
    start: jest.fn(),
  },
  logout: jest.fn(),
}));
