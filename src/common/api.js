import burl from 'bilibili-playurl'
import { jQuery as $ } from 'proxyee-down-extension-sdk'

export default {
  async getDownLink(cid, quality) {
    const url = await burl(cid, { season_type: 0, quality: quality })
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
  },
  async buildResolveForm(cid, quality, title) {
    const result = await this.getDownLink(cid, 80)
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
      }
    }
  }
}
