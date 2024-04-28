import { Autolinker, type Match } from 'autolinker'

/**
 * 文字列をフォーマットするユーティリティ
 */
export const formatUtil = {
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
   * 和暦からISO8601形式で日付を取得する
   *
   * @params wareki 和暦
   */
  toIso8601: (wareki: string) => {
    let vehicleInspection = dayjsUtil.dayjs('')
    if (wareki) {
      vehicleInspection = dayjsUtil.dayjs(wareki.replace('年', '-').replace('月', ''))
    }
    return vehicleInspection.isValid() ? vehicleInspection.format('YYYY-MM-01') : ''
  },

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
}
