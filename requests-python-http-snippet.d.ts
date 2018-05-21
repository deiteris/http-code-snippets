/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   requests-python-http-snippet.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-if.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="code-snippets-mixin.d.ts" />
/// <reference path="http-code-snippets-style.d.ts" />

declare namespace ApiElements {

  /**
   * `raw-http-snippet`
   *
   * A snippet for requests made in Python using the Requests library.
   *
   * ## Styling
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--http-code-snippets` | Mixin applied to this elment | `{}`
   */
  class RequestsPythonHttpSnippet extends
    ArcBehaviors.CodeSnippetsMixin(
    Polymer.Element) {

    /**
     * Lower case method name
     */
    readonly lowerMethod: string|null|undefined;
    _methodChanged(method: any): void;
    _isLast(index: any, array: any): any;
  }
}

interface HTMLElementTagNameMap {
  "requests-python-http-snippet": ApiElements.RequestsPythonHttpSnippet;
}
