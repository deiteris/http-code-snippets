/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { BaseCodeSnippet } from '../BaseCodeSnippet.js';

/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */

/**
 * `fetch-js-http-snippet`
 *
 * A snippet for requests made in JavaScript using Fetch API.
 */
export class FetchJsHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'javascript';
  }

  /**
   * Computes code for JavaScript (Fetch API).
   * @param {string} url
   * @param {string} method
   * @param {CodeHeader[]} headers
   * @param {string} payload
   * @return {string} Complete code for given arguments
   */
  _computeCommand(url, method, headers, payload) {
    if (!url || !method) {
      return '';
    }
    const hasHeaders = !!(headers && headers instanceof Array && headers.length);
    const hasPayload = !!payload;
    const hasInit = hasHeaders || hasPayload || !!(method && method !== 'GET');
    let result = '';

    if (hasInit) {
      if (hasHeaders) {
        result += this._createHeaders(headers);
      }
      if (hasPayload) {
        result += this._createPayload(payload);
      }
      result += 'const init = {\n';
      result += `  method: '${method}'`;
      if (hasHeaders) {
        result += `,\n  headers`;
      }
      if (hasPayload) {
        result += `,\n  body`;
      }
      result += '\n';
      result += '};\n\n';
    }

    result += `fetch('${url}'`;
    if (hasInit) {
      result += ', init';
    }
    result += ')\n';
    result += '.then((response) => {\n';
    result += '  return response.json(); // or .text() or .blob() ...\n';
    result += '})\n';
    result += '.then((text) => {\n';
    result += '  // text is the response body\n';
    result += '})\n';
    result += '.catch((e) => {\n';
    result += '  // error in e.message\n';
    result += '});';
    return result;
  }

  /**
   * 
   * @param {CodeHeader[]} headers 
   * @returns {string}
   */
  _createHeaders(headers) {
    let result = 'const headers = new Headers();\n';
    for (let i = 0, len = headers.length; i < len; i++) {
      const h = headers[i];
      result += `headers.append('${h.name}', '${h.value}');\n`;
    }
    result += '\n';
    return result;
  }

  /**
   * 
   * @param {string} payload 
   * @returns {string}
   */
  _createPayload(payload) {
    return `const body = \`${payload}\`;\n\n`;
  }
}
