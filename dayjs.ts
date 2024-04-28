import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

/**
 * dayjsに関するユーティリティ
 */
export const dayjsUtil = {
  /**
   * dayjsをセットアップする
   * nuxtはpluginsに置くのがよい
   * @returns
   */
  setup: () => {
    dayjs.extend(timezone)
    dayjs.extend(utc)
    dayjs.tz.setDefault('Asia/Tokyo')
  },
  /**
   * dayjsインスタンス
   */
  dayjs: dayjs,
}
