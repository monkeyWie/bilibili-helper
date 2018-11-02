import burl from 'bilibili-playurl'
import { jQuery as $ } from 'proxyee-down-extension-sdk'

const getDownLink = async (cid, quality, seasonType) => {
  const url = await burl(cid, { season_type: seasonType, quality: quality })
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(response) {
        resolve(response)
      },
      error(request, status, error) {
        reject(error)
      }
    })
  })
}

export default {
  async buildResolveForm(cid, quality, seasonType, title) {
    const result = await getDownLink(cid, quality, seasonType)
    const downInfo = result.durl[0]
    const url = !result.durl[0].url.startsWith('https')
      ? result.durl[0].url.replace(/^http/i, 'https')
      : result.durl[0].url
    return {
      request: {
        url: url,
        heads: { referer: 'https://bilibili.com' }
      },
      response: {
        fileName: title + '.flv',
        totalSize: downInfo.size,
        supportRange: true
      },
      config: { connections: 16 }
    }
  }
}
