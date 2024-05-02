import { PhoneNumber, PhoneNumberUtil } from 'google-libphonenumber'

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
  required: (value: string, message: string = '必須入力です') => !!value || message,
  /**
   * 数値を指定してください
   *
   * @param value
   * @param message
   * @returns
   */
  numeric: (value: string, message: string = '数値を指定してください') => !isNaN(+value) || message,
  /**
   * 以上にしてください
   *
   * @param value
   * @param max
   * @param message
   * @returns
   */
  min: (value: number, max: number, message: string = '以上にしてください') =>
    value >= max || `${max}${message}`,
  /**
   * 以内にしてください
   *
   * @param value
   * @param max
   * @param message
   * @returns
   */
  max: (value: number, max: number, message: string = '以内にしてください') =>
    value <= max || `${max}${message}`,
  /**
   * 正しいURLを入力してください
   *
   * @param value
   * @param message
   * @returns
   */
  url: (value: string, message: string = '正しいURLを入力してください') => {
    try {
      // eslint-disable-next-line no-new
      new URL(value)
    } catch (_) {
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
  maxLength: (value: string, message: string = '文字以内にしてください', max: number) =>
    value.length <= max || `${max}${message}`,
  /**
   * 正しいメールアドレスを入力してください
   *
   * @param value
   * @param message
   * @returns
   */
  email: (value: string, message: string = '正しいメールアドレスを入力してください') => {
    const result = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    return !!result || message
  },
  /**
   * 正しい電話番号を入力してください
   *
   * @param value
   * @param message
   * @returns
   */
  phone: (value: string, message: string = '正しい電話番号を入力してください') => {
    if (!value) {
      return true
    }

    try {
      const util = PhoneNumberUtil.getInstance()
      const region = 'JP'
      const number: PhoneNumber = util.parseAndKeepRawInput(value, region)
      if (!util.isValidNumberForRegion(number, region)) {
        return message
      }
      return true
    } catch {
      return message
    }
  },
  /**
   * <input type="file">の空チェック
   *
   * @param value
   * @param message
   * @returns
   */
  requiredFile: (value: File[], message: string = '必須入力です') => !!value.length || message,
  /**
   * <input type="file">のファイルサイズチェック
   *
   * @param value
   * @param message
   * @returns
   */
  maxFileSize: (
    value: File[],
    maxSize: number = 10000000,
    message: string = '{0}は{1}以内の画像ファイルを入力してください',
  ) => {
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
