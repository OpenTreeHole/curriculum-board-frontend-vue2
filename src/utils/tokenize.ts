import { ChineseToken } from '@/types'
import { load } from 'chinese-tokenizer'
import { remove, uniq } from 'lodash-es'

let tokenize: ((str: string) => ChineseToken[]) | undefined = undefined

export const toSuffixList = (list: string[]) => {
  const result: string[] = []
  for (let i = list.length - 1; i >= 0; i--) {
    result.push(list[i] + (result[result.length - 1] || ''))
  }
  return result.reverse()
}

export const initializeTokenize = async () => {
  const response = await fetch('/cedict_ts.u8', {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
  const text = await response.text()
  tokenize = load(text)
}

export const generateIndex = (str: string) => {
  if (!tokenize) {
    throw new Error('tokenize is not initialized')
  }
  const result = tokenize(str)
  const textList = result.map(({ simplified }) => simplified)
  const textSuffixList = toSuffixList(textList)
  const fTextSuffixList = toSuffixList(textList.map((v) => v[0]))
  const textPinYinList = result.map(
    (v) =>
      v.matches[0]?.pinyin
        .split(' ')
        .map((p) => p.substring(0, p.length - 1).toLowerCase())
        .join('') || ''
  )
  const fPinYinList = result.map(
    (v) =>
      v.matches[0]?.pinyin
        .split(' ')
        .map((p) => p.substring(0, 1).toLowerCase())
        .join('') || ''
  )
  const fPinYinSuffixList = toSuffixList(fPinYinList)
  const fTextPinYinSuffixList = toSuffixList(textPinYinList.map((v) => v[0] || ''))
  return uniq([...textSuffixList, ...fTextSuffixList, ...fPinYinSuffixList, ...textPinYinList, ...fTextPinYinSuffixList]).filter((v) => !!v)
}
