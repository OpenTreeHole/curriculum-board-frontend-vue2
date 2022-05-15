declare module 'chinese-tokenizer' {
  import { ChineseToken } from '@/types'

  export function load(content: string): (v: string) => ChineseToken[]
}

declare module '*.u8' {
  const content: string
  export default content
}
