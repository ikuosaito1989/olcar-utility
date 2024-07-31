/**
 * NonNullableなdataを返却するuseFetch
 *
 * @params url URL文字列
 * @params opts オプション
 */
export const useFetchi = async <T>(url: string, opts?: object) => {
  const result = await useFetch<T>(url, opts)
  return {
    ...result,
    data: result.data as globalThis.Ref<NonNullable<typeof result.data.value>>,
  }
}

/**
 * x-api-keyを付与した$fetch
 *
 * @param url
 * @param opts
 * @returns
 */
export const $fetchByApiKey = async <T>(url: string, opts?: object) => {
  const runtimeConfig = useRuntimeConfig()
  await $fetch<T>(url, {
    ...opts,
    headers: { 'x-api-key': runtimeConfig.public.apiKey },
  })
}
