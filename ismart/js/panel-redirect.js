/*************************************************************************************************************************
 * Purpose: Add items to the Home Assistant sidebar to any path in Home Assistant
 * Many thanks to balloob https://gist.github.com/balloob for his initial code (see link in Change Log)
 * -------------------------------------------------------------------------------------------------------
 * Resources and References:
 *  - Current Code Source  https://gist.github.com/Acqua-H/a33ef5bd5a95f14c5888494565bb0436
 *  - HA Forum Thread      https://community.home-assistant.io/t/how-to-add-a-restart-home-assistant-button-to-sidebar/214179/2
 *  - Acqua                https://github.com/Acqua-H/ | https://community.home-assistant.io/u/acqua/
 * -------------------------------------------------------------------------------------------------------
 * Change Log:
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  08-Nov-2021 | Acqua | 1. Fix: blank page when clicking on side bar item
 *                        2. Add: Second item to demonstrate how to add multiple items
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  22-Jun-2020 | balloob | New - https://gist.github.com/balloob/580deaf8c3fc76948559c5963ed4d436
 * -------------------------------------------------------------------------------------------------------
 * How to install:
 *  1. Put this file in <config>/www/panel-redirect.js (you may need to create a new 'www' folder if not yet existing)
 *  2. Add following to configuration.yaml, and change as needed:
-------------- BEGIN --------------
panel_custom:
  - name: Server Controls
    url_path: config/server_control  # url_path needs to be unique for each panel_custom config
    sidebar_title: Server Controls
    sidebar_icon: mdi:server # https://materialdesignicons.com/
    module_url: /local/panel-redirect.js  # 'local' is '/config/www/'
  - name: Zones
    url_path: config/zone
    sidebar_title: Zones
    sidebar_icon: mdi:google-maps
    module_url: /local/panel-redirect.js
-------------- END --------------
 *  4. Restart HA Server
 * -------------------------------------------------------------------------------------------------------
*/

class PanelRedirect extends HTMLElement {
  connectedCallback() {
    if (this._info) {
      this._navigate();
    }
  }

  set panel(info) {
    this._info = info;

    if (this.isConnected) {
      this._navigate();
    }
  }

  _navigate() {
    history.replaceState(null, "", this._info.config.target);
    const event = new Event("location-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { replace: true };
    this.dispatchEvent(event);
  }
}

customElements.define("panel-redirect", PanelRedirect);
