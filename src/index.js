import React from 'react'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'


export function mouseTrap(Base) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.__mousetrapBindings = [];
    }

    bindShortcut(key, callback) {
      Mousetrap.bind(key, callback);
      this.__mousetrapBindings.push(key);
    }

    bindGlobalShortcut(key, callback) {
      Mousetrap.bindGlobal(key, callback)
      this.__mousetrapBindings.push(key)
    }

    unbindShortcut(key) {
      var index = this.__mousetrapBindings.indexOf(key);

      if (index > -1) {
        this.__mousetrapBindings.splice(index, 1);
      }

      Mousetrap.unbind(key);
    }

    unbindAllShortcuts() {
      if (this.__mousetrapBindings.length < 1) {
        return;
      }

      this.__mousetrapBindings.forEach(binding => {
        Mousetrap.unbind(binding);
      });
      this.__mousetrapBindings = [];
    }

    componentWillUnmount() {
      this.unbindAllShortcuts();
    }

    render() {
      return (
        <Base
          {...this.props}
          bindShortcut={this.bindShortcut.bind(this)}
          bindGlobalShortcut={this.bindGlobalShortcut.bind(this)}
          unbindShortcut={this.unbindShortcut.bind(this)}
        />
      );
    }
  };
}

export default mouseTrap;