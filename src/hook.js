import api from './common/api'

global.onResolve = async function(request) {
  const aid = request.url.replace(/^.*\/av(\d+).*$/)
  const viewInfo = await api.getViewInfo(aid)
  if (viewInfo) {
    const cid = viewInfo.data.cid
    const title = viewInfo.data.title
    const quality = pdown.settings.quality || 80
    try {
      const resolveForm = await api.buildResolveForm(aid, cid, quality, title)
      resolveForm.data = { cid: cid, quality }
      resolveForm.config = { connections: 16 }
      return resolveForm
    } catch (e) {
      console.error(e)
    }
  }
}
