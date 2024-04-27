/**
 * クエリストリングに関するユーティリティ
 */
export const queryUtil = {
  /**
   * vueのクエリストリングを配列に変換する
   *
   * @param query LocationQuery | LocationQuery[]
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toArrayQuery: (query: any): string[] => Array.isArray(query) ? (query as string[]) : query ? [query] : [],
}
