jest.dontMock('../index.js');
jest.mock('mousetrap', {bind: jest.genMockFn(), unbind: jest.genMockFn()});

describe('mouseTrap(Component)', () => {
    var ReactTestUtils,
        React,
        Mousetrap,

        Base,
        mouseTrap,
        mockProp,
        mockShortcut,

        component;

    beforeEach(() => {
        React = require('react');
        ReactTestUtils = require('react-addons-test-utils');
        Mousetrap = require('mousetrap');
        let renderIntoDocument = ReactTestUtils.renderIntoDocument;

        mockShortcut = {
            key: 'c',
            cb: jest.genMockFn()
        }
        Base = class extends React.Component {
            render () {
                return <div />;
            }
        }
        mouseTrap = require('../index.js').mouseTrap;
        let NewComponent = mouseTrap(Base);
        mockProp = {}
        component = renderIntoDocument(<NewComponent hello={mockProp} />);
    })

    it('should pass all the props back to Base', () => {
        expect(component.props.hello).toBe(mockProp);

        let search = ReactTestUtils.scryRenderedComponentsWithType(component, Base);
        expect(search.length).toBe(1);

        expect(search[0].props.hello).toBe(mockProp);
    });

    it('should pass the prop of #bindShortcut', () => {
        let search = ReactTestUtils.scryRenderedComponentsWithType(component, Base);
        expect(search.length).toBe(1);

        expect(search[0].props.bindShortcut).toBeDefined();
        search[0].props.bindShortcut(mockShortcut.key, mockShortcut.cb);

        expect(Mousetrap.bind).toBeCalledWith(mockShortcut.key, mockShortcut.cb);
        expect(component.__mousetrapBindings.length).toBe(1);
    });

    it('should pass the prop of #unbindShortcut', () => {
        let search = ReactTestUtils.scryRenderedComponentsWithType(component, Base);
        expect(search.length).toBe(1);

        expect(search[0].props.unbindShortcut).toBeDefined();

        search[0].props.bindShortcut(mockShortcut.key, mockShortcut.cb);
        expect(component.__mousetrapBindings.length).toBe(1);

        search[0].props.unbindShortcut(mockShortcut.key);
        expect(component.__mousetrapBindings.length).toBe(0);
        expect(Mousetrap.unbind).toBeCalledWith(mockShortcut.key);
    });

    it('should #unbindAllShortcuts on #componentWillUnmount', () => {
        let search = ReactTestUtils.scryRenderedComponentsWithType(component, Base);
        expect(search.length).toBe(1);

        expect(search[0].props.bindShortcut).toBeDefined();
        search[0].props.bindShortcut(mockShortcut.key, mockShortcut.cb);

        expect(Mousetrap.bind).toBeCalledWith(mockShortcut.key, mockShortcut.cb);
        expect(component.__mousetrapBindings.length).toBe(1);

        component.componentWillUnmount();
        expect(component.__mousetrapBindings.length).toBe(0);
        expect(Mousetrap.unbind).toBeCalledWith(mockShortcut.key);
    });
})
