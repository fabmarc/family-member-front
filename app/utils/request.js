const noBodyCodes = [204, 205, 401];

function hasNoBody(response) {
  return noBodyCodes.includes(response.status);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (!response || hasNoBody(response)) return null;
  return response.json();
}

/**
 * Parses the XML returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed XML from the request
 */
function parseXml(response) {
  if (hasNoBody(response)) return null;
  return response
    .text()
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}

/**
 * Parses the text returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed text from the request
 */
function parseText(response) {
  if (hasNoBody(response)) return null;
  return response.text();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return { response };
  }
  const error = new Error(response.statusText || response.status);
  error.status = response.status;
  return { response, error };
}

function parseResponse(type) {
  return ({ response, error }) => {
    if (!type || error) return Promise.all([parseJSON(response), error]);
    if (type === 'text') return Promise.all([parseText(response), error]);
    if (type === 'xml') return Promise.all([parseXml(response), error]);
    return [response, error];
  };
}

function resolveResponse([response, error]) {
  const exception = error;
  if (exception) {
    exception.body = response;
    throw exception;
  }
  return response;
}

/**
 * Convert a JSON object, returning a query string
 *
 * @param  {object} params   JSON object
 * @param  {string} [prefix] Param name for the object (params)
 *
 * @return {string}          The query string
 */
export function serialize(params, prefix = '') {
  if (!params) return '';
  const query = Object.keys(params).reduce((accum, item) => {
    let key = item;
    const value = params[key];
    if (params.constructor === Array) {
      key = `${prefix}[]`;
    } else if (params.constructor === Object) {
      key = prefix ? `${prefix}[${key}]` : key;
    }
    if (value === undefined) {
      return accum;
    }
    if (typeof value === 'object') {
      const moreParams = serialize(value, key);
      if (moreParams) accum.push(moreParams);
    } else {
      accum.push(`${key}=${encodeURIComponent(value)}`);
    }
    return accum;
  }, []);
  return query.join('&');
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url            The URL we want to request
 * @param  {object} [params]       The params we want to pass to "fetch"
 * @param  {string} [responseType] The response type for parsing
 *
 * @return {object}                The response data
 */
export default function request(url, params = {}, responseType) {
  const options = params;
  options.credentials = 'same-origin';
  return fetch(url, options)
    .then(checkStatus)
    .then(parseResponse(responseType))
    .then(resolveResponse);
}
