import Mousetrap from 'mousetrap';

export function mouseTrap(Base){
    return class extends React.Component {
        constructor(props){
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

            Mousetrap.unbind(binding);
        }

        unbindAllShortcuts () {
            if (this.__mousetrapBindings.length < 1) {
                return;
            }

            this.__mousetrapBindings.forEach(function (binding) {
                Mousetrap.unbind(binding);
            });
        }

        componentWillUnmount () {
            this.unbindAllShortcuts();
        }

        render () {
            return <Base
                {...props}
                bindShortcut={this.bindShortcut.bind(this)}
                unbindShortcut={this.unbindShortcut.bind(this)} />
        }
    };
}
