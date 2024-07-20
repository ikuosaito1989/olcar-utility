export const headUtil = {
  /**
   *
   * @param title
   * @param description
   * @param image
   * @param type
   * @param twitterCard
   * @param isNoIndex
   * @returns
   */
  seo(
    title: string = '格安な中古車、車の個人売買なら【olcar（オルカー）】',
    description: string = '格安な中古車、車の個人売買を集めた中古車情報サイト、olcar（オルカー）です。個人売買を中心とした中古車情報を集め、従来の中古車情報サイトの価格より安い値段の車が勢揃いしています！',
    image: string = 'https://ol-car.com/ogp.jpg',
    type: string = 'website',
    twitterCard: string = 'summary',
    isNoIndex: boolean = false,
  ) {
    title = title.replace(/<("[^"]*"|'[^']*'|[^'">]|)*>/g, '')
    description = description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')

    return {
      title: `${title} | olcar（オルカー）`,
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { hid: 'charset', charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '中古車,中古車販売,中古車情報,中古車検索,中古自動車,車選び,',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: type,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://ol-car.com',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'olcar（オルカー）',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: twitterCard,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://ol-car.com',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: isNoIndex ? 'noindex' : 'noarchive',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
}
