import { checkPropTypes } from 'prop-types';

export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    // eslint-disable-next-line react/forbid-foreign-prop-types
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
};
