const getXHR = (method, url) => {
  let xhr = new XMLHttpRequest()
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true)
    return xhr
  } else if (typeof XDomainRequest !== 'undefined') {
    xhr = new XDomainRequest()
    xhr.open(method, url)
    return xhr
  } else {
    return null
  }
}

const statusOK = (xhr) => {
  return xhr.status >= 200 && xhr.status < 300
}

const createError = (xhr) => {
  return new Error(`${xhr.status} - ${xhr.statusText}`)
}

const getXHRParams = (params) => {
  if (params && typeof params === 'object') {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&')
  } else {
    return null
  }
}

export default function qwest (method, url, params, headers, props) {
  return new Promise((resolve, reject) => {
    const xhr = getXHR(method, url)
    if (xhr === null) throw new Error('CORS not supported')
    xhr.onerror = () => { reject(createError(xhr)) }
    xhr.onload = () => {
      if (statusOK(xhr)) resolve(xhr.response)
      else reject(createError(xhr))
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }

    if (props) {
      Object.keys(props).forEach((key) => {
        Object.defineProperty(xhr, key, {
          value: props[key],
          writable: true
        })
      })
    }

    const xhrParams = getXHRParams(params)
    xhr.send(xhrParams)
  })
}
