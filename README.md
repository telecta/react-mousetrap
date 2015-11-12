# react-mousetrap [![Build Status](https://travis-ci.org/alvinsj/react-mousetrap.svg?branch=master)](https://travis-ci.org/alvinsj/react-mousetrap) [![npm version](https://badge.fury.io/js/react-mousetrap.svg)](https://badge.fury.io/js/react-mousetrap)
React's high order component for [Mousetrap](https://www.npmjs.com/package/mousetrap) integration.

## Setup

NPM install

    npm install --save react-mousetrap

## Example

Create higher order component

    import {mouseTrap} from 'react-mousetrap';

    class YourComponent extends React.Component {
        /*your implementation */

        componentWillMount {
            this.props.bindShortcut('right', this._goToNext);
        }

        _goToNext() {
            this.props.unbindShortcut('right');
        }
    }

    export default mouseTrap(BaseComponent);
