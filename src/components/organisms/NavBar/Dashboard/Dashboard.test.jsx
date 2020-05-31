import '../../../../tests/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import { findByTestAttr } from '../../../../tests/testUtils';

describe('Dashboard, sub-header', () => {
  const setup = () => {
    const wrapper = shallow(<Dashboard />);
    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const dashboardRender = findByTestAttr(wrapper, 'dashboard-render');
    expect(dashboardRender.length).toBe(1);
  });
});
