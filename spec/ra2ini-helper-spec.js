'use babel';

import Ra2iniHelper from '../lib/ra2ini-helper';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Ra2iniHelper', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('ra2ini-helper');
  });

  describe('when the ra2ini-helper:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.ra2ini-helper')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ra2ini-helper:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.ra2ini-helper')).toExist();

        let ra2iniHelperElement = workspaceElement.querySelector('.ra2ini-helper');
        expect(ra2iniHelperElement).toExist();

        let ra2iniHelperPanel = atom.workspace.panelForItem(ra2iniHelperElement);
        expect(ra2iniHelperPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'ra2ini-helper:toggle');
        expect(ra2iniHelperPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.ra2ini-helper')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ra2ini-helper:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let ra2iniHelperElement = workspaceElement.querySelector('.ra2ini-helper');
        expect(ra2iniHelperElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'ra2ini-helper:toggle');
        expect(ra2iniHelperElement).not.toBeVisible();
      });
    });
  });
});
