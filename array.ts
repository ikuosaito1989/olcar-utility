/**
 * 配列を操作するユーティリティ
 */
export const arrayUtil = {
  /**
   * pushに機能を追加したやつ
   *
   * @param targetArray push対象のArray
   * @param items pushするArray
   * @param options
   *  allowDuplicate: 重複を許可するか
   *  maxLength: Arrayに追加できる最大数
   */
  push: <T>(
    targetArray: T[],
    items: T[],
    options?: { allowDuplicate?: boolean; maxLength?: number },
  ) => {
    targetArray.push(...items)

    if (options?.allowDuplicate) {
      targetArray = [...new Set(targetArray)]
    }

    if (options?.maxLength) {
      targetArray.splice(options.maxLength, targetArray.length - options.maxLength)
    }
  },
  /**
   * 指定した配列を削除する
   *
   * @param items
   */
  splice: <T>(targetArray: T[], item: T) => {
    const index = targetArray.indexOf(item)
    targetArray.splice(index, 1)
  },
}
