import 'core-js/es6/math'
import api from './common/api'
import { jQuery as $ } from 'proxyee-down-extension-sdk'

global.onResolve = async function(request) {
  let html
  $.ajax({
    url: request.url,
    async: false,
    contentType: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    headers: {
      Host: 'www.bilibili.com',
      Referer: 'https://www.bilibili.com/'
    },
    success(result) {
      html = result
    }
  })
  const cidMatch = /"cid":(\d+),/.exec(html)
  if (cidMatch) {
    const cid = cidMatch[1]
    const title = /<h1\s+title="([^<>]*)"\s*>/.exec(html)[1]
    const quality = pdown.settings.quality || 80
    const seasonType = request.url.indexOf('/bangumi/') != -1 ? 1 : 0
    try {
      const resolveForm = await api.buildResolveForm(cid, quality, seasonType, title)
      resolveForm.data = { cid: cid, quality }
      resolveForm.config = { connections: 16 }
      return resolveForm
    } catch (e) {
      console.error(e)
    }
  }
}
