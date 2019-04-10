import { getViewInfo, buildResolveForm } from './common/api'

global.onResolve = async function(request) {
  const aid = request.url.replace(/^.*\/av(\d+).*$/, '$1')
  try {
    const viewInfo = await getViewInfo(aid)
    if (viewInfo) {
      const cid = viewInfo.data.cid
      const title = viewInfo.data.title
      const quality = pdown.settings.quality || 80
      const resolveForm = await buildResolveForm(aid, cid, quality, title)
      resolveForm.data = { cid: cid, quality }
      resolveForm.config = { connections: 16 }
      return resolveForm
    }
  } catch (e) {
    console.error(e)
  }
}
