const localStorage = {
  getItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorage });

export default localStorage;
