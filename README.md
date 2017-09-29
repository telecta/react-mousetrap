# react-mousetrap [![Build Status](https://travis-ci.org/blacktangent/react-mousetrap.svg?branch=master)](https://travis-ci.org/blacktangent/react-mousetrap) [![npm version](https://badge.fury.io/js/react-mousetrap.svg)](https://badge.fury.io/js/react-mousetrap)
React's high order component for [Mousetrap](https://www.npmjs.com/package/mousetrap) integration.

## Setup

Yarn install

    yarn add react-mousetrap

## Example

Create higher order component
```
    import mouseTrap from 'react-mousetrap';

    class YourComponent extends React.Component {
        componentWillMount {
            this.props.bindShortcut('right', this._goToNext);
        }
    }

    export default mouseTrap(BaseComponent);
```
