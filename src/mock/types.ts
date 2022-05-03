export interface RequestInfo {
  method: string
  body: any
  query: any
}

export interface MockInfo {
  url: string
  type: string
  response: any
}
