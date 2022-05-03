import Mock from 'mockjs'

import demoApi from './mock-data'

const mocks = [
  {
    intercept: true,
    fetchs: demoApi
  }
]

export function param2Obj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}')
}

export function mockXHR() {
  function XHR2ExpressReqWrap(respond: any) {
    return function ({ body, type, url }: { body: any; type: string; url: string }) {
      let result = null
      if (respond instanceof Function) {
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    if (i.intercept) {
      for (const fetch of i.fetchs) {
        Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response))
      }
    }
  }
}
