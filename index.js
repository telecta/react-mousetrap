import Mousetrap from 'mousetrap';
import React from 'react';

export function mouseTrap(Base){
    return class extends React.Component {
        constructor(props){
            super(props);
            this.__mousetrapBindings = [];
        }

        bindShortcut (key, callback) {
            Mousetrap.bind(key, callback);
            this.__mousetrapBindings.push(key);
        }

        unbindShortcut (key) {
            var index = this.__mousetrapBindings.indexOf(key);

            if (index > -1) {
                this.__mousetrapBindings.splice(index, 1);
            }

            Mousetrap.unbind(key);
        }

        unbindAllShortcuts () {
            if (this.__mousetrapBindings.length < 1) {
                return;
            }

            this.__mousetrapBindings.forEach(function (binding) {
                Mousetrap.unbind(binding);
            });
            this.__mousetrapBindings = [];
        }

        componentWillUnmount () {
            this.unbindAllShortcuts();
        }

        render () {
            return <Base
                {...this.props}
                bindShortcut={this.bindShortcut.bind(this)}
                unbindShortcut={this.unbindShortcut.bind(this)} />
        }
    };
}
