/**
 * Vuetifyのバリデーションに関するユーティリティ
 */
export const validationUtil = {
  /**
   * 必須入力です
   *
   * @param value
   * @param message
   * @returns
   */
  required: (value: string, message: string) => !!value || message,
  /**
   * 数値を指定してください
   *
   * @param value
   * @param message
   * @returns
   */
  numeric: (value: string, message: string) => !isNaN(+value) || message,
  /**
   * 以上にしてください
   *
   * @param value
   * @param max
   * @param message
   * @returns
   */
  min: (value: number, max: number, message: string) =>
    value >= max || formatUtil.replace(message, max),
  /**
   * 以内にしてください
   *
   * @param value
   * @param max
   * @param message
   * @returns
   */
  max: (value: number, max: number, message: string) =>
    value <= max || formatUtil.replace(message, max),
  /**
   * 正しいURLを入力してください
   *
   * @param value
   * @param message
   * @returns
   */
  url: (value: string, message: string) => {
    try {
      // eslint-disable-next-line no-new
      new URL(value)
    } catch {
      return message
    }
    return true
  },
  /**
   * 文字以内にしてください
   *
   * @param value
   * @param message
   * @param max
   * @returns
   */
  maxLength: (value: string, message: string, max: number) =>
    value.length <= max || formatUtil.replace(message, max),
  /**
   * 正しいメールアドレスを入力してください
   *
   * @param value
   * @param message
   * @returns
   */
  email: (value: string, message: string) => {
    const result = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    return !!result || message
  },
  /**
   * <input type="file">の空チェック
   *
   * @param value
   * @param message
   * @returns
   */
  requiredFile: (value: File[], message: string) => !!value.length || message,
  /**
   * <input type="file">のファイルサイズチェック
   *
   * @param value
   * @param message
   * @returns
   */
  maxFileSize: (value: File[], maxSize: number = 10000000, message: string) => {
    const overSizeFiles = value.filter((v) => v.size >= maxSize).map((v) => v)
    if (overSizeFiles.length === 0) {
      return true
    }
    return formatUtil.replace(
      message,
      overSizeFiles.map((v) => v.name).join(),
      formatUtil.toByte(maxSize),
    )
  },
}
