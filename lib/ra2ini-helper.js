'use babel';

import Ra2iniHelperView from './ra2ini-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  ra2iniHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ra2iniHelperView = new Ra2iniHelperView(state.ra2iniHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ra2iniHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
     // 'ra2ini-helper:toggle': () => this.toggle()

    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ra2iniHelperView.destroy();
  },

  serialize() {
    return {
      ra2iniHelperViewState: this.ra2iniHelperView.serialize()
    };
  },


};
