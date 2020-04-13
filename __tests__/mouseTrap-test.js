jest.unmock('../src/index.js');
jest.mock('mousetrap', () => ({
  bind: jest.fn(),
  unbind: jest.fn()
}));

import React from 'react';
import { mount } from 'enzyme';
import mouseTrap from '../src/index.js';
import Adapter from 'enzyme-adapter-react-16';
import Mousetrap from 'mousetrap';

describe('mouseTrap(Component)', () => {
  var Base, mockProp, mockShortcut, component;
  beforeEach(() => {
    mockShortcut = {
      key: 'c',
      cb: jest.fn()
    };
    Base = props => {
      return <div />;
    };
    const NewComponent = mouseTrap(Base);
    mockProp = {};
    component = mount(<NewComponent hello={mockProp} />);
  });

  it('should pass all the props back to Base', () => {
    expect(component.props().hello).toBe(mockProp);

    let search = component.find(Base);
    expect(search.length).toBe(1);

    expect(search.props().hello).toBe(mockProp);
  });

  it('should pass the prop of #bindShortcut', () => {
    let search = component.find(Base);
    expect(search.length).toBe(1);

    expect(search.props().bindShortcut).toBeDefined();
    search.props().bindShortcut(mockShortcut.key, mockShortcut.cb);

    expect(Mousetrap.bind).toBeCalledWith(mockShortcut.key, mockShortcut.cb);
    expect(component.instance().__mousetrapBindings.length).toBe(1);
  });

  it('should pass the prop of #unbindShortcut', () => {
    let search = component.find(Base);
    expect(search.length).toBe(1);

    expect(search.props().unbindShortcut).toBeDefined();

    search.props().bindShortcut(mockShortcut.key, mockShortcut.cb);
    expect(component.instance().__mousetrapBindings.length).toBe(1);

    search.props().unbindShortcut(mockShortcut.key);
    expect(component.instance().__mousetrapBindings.length).toBe(0);
    expect(Mousetrap.unbind).toBeCalledWith(mockShortcut.key);
  });

  it('should #unbindAllShortcuts on #componentWillUnmount', () => {
    let search = component.find(Base);
    expect(search.length).toBe(1);

    expect(search.props().bindShortcut).toBeDefined();
    search.props().bindShortcut(mockShortcut.key, mockShortcut.cb);

    expect(Mousetrap.bind).toBeCalledWith(mockShortcut.key, mockShortcut.cb);
    expect(component.instance().__mousetrapBindings.length).toBe(1);

    component.instance().componentWillUnmount();
    expect(component.instance().__mousetrapBindings.length).toBe(0);
    expect(Mousetrap.unbind).toBeCalledWith(mockShortcut.key);
  });
});
