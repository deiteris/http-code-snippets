import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/paper-tabs/paper-tabs.js';
import '../../@polymer/paper-tabs/paper-tab.js';
import '../../@polymer/iron-pages/iron-pages.js';
import '../../@polymer/prism-element/prism-highlighter.js';
import './raw-http-snippet.js';
import './curl-http-snippet.js';
import './javascript-http-snippets.js';
import './python-http-snippets.js';
import './c-curl-http-snippet.js';
import './java-http-snippets.js';
/**
 * `http-code-snippets`
 *
 * Code snippets to display code implementatyion examples for a HTTP request
 *
 * ## Polyfills
 *
 * This component requires `advanced-rest-client/URL` (or other) polyfill for
 * URL object. This spec is not supported in Safari 9 and IE 11.
 * If you are targeting this browsers install ind include this dependency.
 *
 * This component does not include polyfills.
 *
 * ## Styling
 *
 * See http-code-snippets-style.js file for styling definition.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 */
class HttpCodeSnippets extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
    </style>
    <prism-highlighter></prism-highlighter>
    <paper-tabs selected="{{selectedPlatform}}" scrollable="[[scrollable]]" fit-container="">
      <paper-tab>cURL</paper-tab>
      <paper-tab>HTTP</paper-tab>
      <paper-tab>JavaScript</paper-tab>
      <paper-tab>Python</paper-tab>
      <paper-tab>C</paper-tab>
      <paper-tab>Java</paper-tab>
    </paper-tabs>
    <div class="container"></div>
`;
  }

  static get is() {
    return 'http-code-snippets';
  }

  static get properties() {
    return {
      // Currently selected tab for the platform row.
      selectedPlatform: {
        type: Number,
        value: 0,
        observer: '_selectedChanged'
      },
      /**
       * Computed list of headers from `headers` property.
       * It is an array of objects where each object contains `name` and `value`
       * properties.
       * @type {Array<Object>}
       */
      _headersList: {
        type: Array,
        computed: 'headersToList(headers)',
        observer: '_headersChanged'
      },
      // Passed to `paper-tabs` `scrollable` property
      scrollable: Boolean,
      /**
       * Request URL
       */
      url: {type: String, observer: '_urlChanged'},
      /**
       * HTTP method
       */
      method: {type: String, observer: '_methodChanged'},
      /**
       * Parsed HTTP headers.
       * Each item contains `name` and `value` properties.
       */
      headers: String,
      /**
       * HTTP body (the message)
       */
      payload: {type: String, observer: '_payloadChanged'}
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._panel = undefined;
  }
  /**
   * @return {Element|null|undefined} Reference to currently selected panel.
   */
  get _container() {
    return this.shadowRoot && this.shadowRoot.querySelector('.container');
  }
  /**
   * Adds code snippet when selection change.
   * @param {Number} selection Currently selected snippet.
   */
  _selectedChanged(selection) {
    this._removeCurrentSnippet();
    let name;
    switch (selection) {
      case 0: name = 'curl-http-snippet'; break;
      case 1: name = 'raw-http-snippet'; break;
      case 2: name = 'javascript-http-snippets'; break;
      case 3: name = 'python-http-snippets'; break;
      case 4: name = 'c-curl-http-snippet'; break;
      case 5: name = 'java-http-snippets'; break;
    }
    if (!name) {
      return;
    }
    const panel = document.createElement(name);
    this._panel = panel;
    this._container.appendChild(panel);
    this._urlChanged(this.url);
    this._methodChanged(this.method);
    this._payloadChanged(this.payload);
    this._headersChanged(this._headersList);
  }
  /**
   * Propagates a property change to current panel, if any.
   * @param {String} property Name of the property to propagate.
   * @param {String} value Value of the property
   */
  _propertyChanged(property, value) {
    if (!this._panel) {
      return;
    }
    this._panel[property] = value;
  }
  /**
   * Updates URL property on current panel
   * @param {String} value New value to set
   */
  _urlChanged(value) {
    this._propertyChanged('url', value);
  }
  /**
   * Updates "method" property on current panel
   * @param {String} value New value to set
   */
  _methodChanged(value) {
    this._propertyChanged('method', value);
  }
  /**
   * Updates "payload" property on current panel
   * @param {String} value New value to set
   */
  _payloadChanged(value) {
    this._propertyChanged('payload', value);
  }
  /**
   * Updates "headers" property on current panel as a `_headersList` property
   * @param {Array<Object>} value New value to set
   */
  _headersChanged(value) {
    this._propertyChanged('headers', value);
  }
  /**
   * Removes current code snippet panel from the UI.
   */
  _removeCurrentSnippet() {
    const c = this._container;
    if (!c) {
      return;
    }
    const cn = c.childNodes;
    for (let i = cn.length - 1; i >= 0; i--) {
      const child = cn[i];
      if (!child) {
        continue;
      }
      child.parentNode.removeChild(child);
    }
    this._panel = undefined;
  }
  /**
   * Computes a list of headers from a headers string.
   * @param {?String} headers
   * @return {Array} Headers as a list od maps. Can be empty.
   */
  headersToList(headers) {
    headers = headers || this.headers;
    if (!headers || !headers.trim() || typeof headers !== 'string') {
      return [];
    }
    const result = [];
    headers = headers.replace('\\n', '\n');
    headers = headers.split(/\n(?=[^ \t]+)/gim);
    for (let i = 0, len = headers.length; i < len; i++) {
      const line = headers[i].trim();
      if (line === '') {
        continue;
      }
      const sepPosition = line.indexOf(':');
      if (sepPosition === -1) {
        result[result.length] = {
          name: line,
          value: ''
        };
        continue;
      }
      const name = line.substr(0, sepPosition);
      const value = line.substr(sepPosition + 1).trim();
      const obj = {
        name: name,
        value: value
      };
      result.push(obj);
    }
    return result;
  }
}
window.customElements.define(HttpCodeSnippets.is, HttpCodeSnippets);
