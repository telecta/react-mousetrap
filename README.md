# react-mousetrap
React's high order component for [Mousetrap](https://www.npmjs.com/package/mousetrap) integration.

## Setup

NPM install

    npm install --save react-mousetrap

## Example

Create higher order component

    import {mouseTrap} from 'react-mousetrap';

    class BaseComponent extends React.Component { 
    	/*your implementation */
    }

    export default mouseTrap(BaseComponent);
