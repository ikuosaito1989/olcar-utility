/**
 * 配列を操作するユーティリティ
 */
export const arrayUtil = {
  /**
   * Refに対するpushに機能を追加したやつ
   *
   * @param targetArray push対象のArray
   * @param items pushするArray
   * @param options
   *  allowDuplicate: 重複を許可するか
   *  maxLength: Arrayに追加できる最大数
   */
  push: <T>(
    targetArray: Ref<T[]> | T[],
    items: T[],
    options?: { allowDuplicate?: boolean; maxLength?: number },
  ) => {
    let target = 'value' in targetArray ? targetArray.value : targetArray

    target.push(...items)

    if (!options?.allowDuplicate) {
      target = [...new Set(target)]
    }

    if (options?.maxLength) {
      target.splice(options.maxLength, target.length - options.maxLength)
    }
  },
  /**
   * 指定した配列を削除する
   *
   * @param items
   */
  splice: <T>(targetArray: Ref<T[]>, item: T) => {
    const index = targetArray.value.indexOf(item)
    targetArray.value.splice(index, 1)
  },
  /**
   * Fileに対するpushに機能を追加したやつ
   *
   * @param targetFiles
   * @param items
   * @param options
   */
  pushFile: (
    targetArray: Ref<File[]>,
    items: File[],
    options?: { allowDuplicate?: boolean; maxLength?: number },
  ) => {
    targetArray.value.push(...items)

    if (!options?.allowDuplicate) {
      targetArray.value = targetArray.value.filter(
        (element, index, self) =>
          self.findIndex(
            (e) =>
              e.name === element.name &&
              e.size === element.size &&
              e.lastModified === element.lastModified &&
              e.type === element.type &&
              e.arrayBuffer === element.arrayBuffer,
          ) === index,
      )
    }

    if (options?.maxLength) {
      targetArray.value.splice(options?.maxLength, targetArray.value.length - options.maxLength)
    }
  },
}
