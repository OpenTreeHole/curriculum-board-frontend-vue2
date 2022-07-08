export interface ChineseToken {
  matches: { english: string; pinyin: string; pinyinPretty: string }[]
  position: { column: number; line: number; offset: number }
  simplified: string
  text: string
  traditional: string
}
