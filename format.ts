import { Autolinker, type Match } from 'autolinker'
import dayjs from '~/lib/day'

/**
 * 文字列をフォーマットするユーティリティ
 */
export const formatUtil = {
  /**
   * プレースホルダを置き換える
   *
   * @example
   * formatUtil.replace('{0}は{1}である', '吾輩', '猫') // 吾輩は猫である
   * @param value
   * @param args
   * @returns
   */
  replace: (value: string, ...args: unknown[]) => {
    for (const [i, arg] of args.entries()) {
      const regExp = new RegExp(`\\{${i}\\}`, 'g')
      value = value.replace(regExp, arg as string)
    }
    return value
  },
  /**
   * 固定小数点表記+万km
   *
   * @param value
   * @param fixed 桁の数
   * @returns
   */
  toMileage: (value: number | string | null, fixed: number = 1) => {
    if (!value) {
      return '-'
    }

    return `${parseFloat((+value / 10000).toString()).toFixed(fixed)}万km`
  },

  /**
   * 文字連結
   *
   * @param value
   * @returns
   */
  toJoinString: (...value: string[]) => {
    if (!value.length) {
      return '-'
    }

    return value.map((v) => v || '').join('')
  },

  /**
   * YYYY年M月 | あり | '-'
   *
   * @param value
   * @param unknownVehicleInspection 車検有無
   * @returns
   */
  toLocaleVehicleInspection: (value: string | null, unknownVehicleInspection: boolean) => {
    if (value) {
      return dayjsUtil.dayjs(value).format('YYYY年M月')
    }

    return unknownVehicleInspection ? 'あり' : '-'
  },

  /**
   * YYYY-MM-DD
   *
   * @param value
   * @returns
   */
  toDate: (value: string | null) => {
    if (!value) {
      return value
    }

    return dayjsUtil.dayjs(value).format('YYYY-MM-DD')
  },

  /**
   * 指定した年月の最初の日を返却する
   *
   * @param year
   * @param month
   * @returns
   */
  toFirstDate: (year?: number, month?: number) => {
    if (!year || !month) {
      return ''
    }

    return dayjsUtil
      .dayjs()
      .year(year)
      .month(month - 1)
      .date(1)
      .hour(9)
      .minute(0)
      .second(0)
      .toISOString()
  },

  /**
   * 「日付」部を表す言語に依存した文字列を返却する
   *
   * @param value
   * @returns
   */
  toLocaleDateString: (value: string | null) => {
    if (!value) {
      return value
    }

    return dayjsUtil.dayjs.utc(value).local().format('YYYY年MM月DD日')
  },

  /**
   * 文字列をリンクにする
   *
   * @param value
   * @returns
   */
  toLink: (value: string) => Autolinker.link(value),

  /**
   * 文字列からUrlを取得する
   *
   * @param value
   * @returns
   */
  getUrls: (value: string): string[] => {
    const matches = Autolinker.parse(value, {
      urls: true,
    })

    // eslint-disable-next-line require-jsdoc
    const getUrls = (matche: Match) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (matche as any).getUrl === 'function'
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (matche as any).getUrl()
        : ''

    return matches.map((v) => getUrls(v)).filter((v) => v !== '')
  },

  /**
   * オフセットを取得する
   *
   * @param current 現在の数
   * @param limit 最大値
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toOffset: (current: any, limit: number) => (current! ? (current - 1) * limit : 0),

  /**
   * ISO8601形式で日付を取得する
   *
   * @params date 日付
   */
  toIso8601: (date: string | null) => (date ? dayjs(date).format(Constants.ISO8601_FORMAT) : date),

  /**
   * 1万区切りにする
   *
   * @param value
   * @param fixed
   * @returns
   */
  toTenThousand: (value: number | string | null, fixed: number = 1) => {
    if (!value && typeof value !== 'number') {
      return ''
    }

    return parseFloat((+value / 10000).toString()).toFixed(fixed)
  },
  /**
   * バイト数から単位を返却する
   *
   * @param value
   * @returns
   */
  toByte: (value: number) => {
    const kb = 1000
    const mb = Math.pow(kb, 2)
    const gb = Math.pow(kb, 3)
    const tb = Math.pow(kb, 4)

    let unit: { target: number | null; unit: string } = { target: null, unit: 'byte' }

    if (value >= tb) {
      unit = { target: tb, unit: 'TB' }
    } else if (value >= gb) {
      unit = { target: gb, unit: 'GB' }
    } else if (value >= mb) {
      unit = { target: mb, unit: 'MB' }
    } else if (value >= kb) {
      unit = { target: kb, unit: 'KB' }
    }

    const d = Math.pow(10, 0)
    const newSize = unit.target !== null ? Math.floor((value / unit.target) * d) / d : value
    return `${newSize}${unit.unit}`
  },
}
