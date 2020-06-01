import '../../../tests/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCreateCards from './PageCreateCards';


describe('Create cards page', () => {
  const setup = () => {
    const wrapper = shallow(<PageCreateCards />);
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-create-cards');
    expect(component.length).toBe(1);
  });

  describe('state controlled input fields', () => {
    const mockSetCurrentInput = jest.fn();

    beforeEach(() => {
      mockSetCurrentInput.mockClear();
      React.useState = jest.fn(() => ['', mockSetCurrentInput]);
    });

    it('should update state with the  value of Name input box on change', () => {
      const { wrapper } = setup();
      const nameInput = findByTestAttr(wrapper, 'card-name');

      const mockEvent = { target: { value: 'Card Name' } };
      nameInput.simulate('change', mockEvent);

      expect(mockSetCurrentInput).toHaveBeenCalledWith('Card Name');
    });
  });
});
