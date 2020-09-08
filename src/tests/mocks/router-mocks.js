jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ id: '123' }),
}));
