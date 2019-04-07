window.onload = () => {
  const checkLoad = setInterval(() => {
    // 检查播放器是否加载完成
    if (window.$ && ($('div.bilibili-player-video-control>div').length > 0) || $('object.player').length > 0) {
      clearInterval(checkLoad)
      const api = require('./common/api')
      const pdownSdk = require('proxyee-down-extension-sdk').default
      let downDivJq
      if ($('object.player').length > 0) {
        const downDivStyle = require('./views/DownButtonFlash').default.Style
        $('html>head').append(`<style>${downDivStyle}</style>`)
        downDivJq = require('./views/DownButtonFlash').default.Button
        const waitInjectButton = setInterval(() => {
          if ($('object.player') && $('object').context.readyState === 'complete') {
            clearInterval(waitInjectButton)
            $('#arc_toolbar_report>.ops').append(downDivJq)
          }
        }, 200)
      } else {
        downDivJq =
        $('div.old-btn').size() > 0
          ? require('./views/DownButtonNew').default
          : require('./views/DownButtonOld').default
        $('div.bilibili-player-video-control div.bilibili-player-video-btn-start').after(downDivJq)
      }
      
      downDivJq.on('click', 'li[data-value]', async function() {
        const quality = $(this).attr('data-value')
        try {
          const aid = window.__INITIAL_STATE__.aid || window.location.href.replace(/^.*\/av(\d+).*$/, '$1')
          let cid
          let title
          if (window.__INITIAL_STATE__.videoData) {
            cid = window.__INITIAL_STATE__.videoData.cid
            title = window.__INITIAL_STATE__.videoData.title
          } else if (window.__INITIAL_STATE__.epInfo) {
            cid = window.__INITIAL_STATE__.epInfo.cid
            title = window.__INITIAL_STATE__.epInfo.title
          } else {
            const viewInfo = await api.getViewInfo(aid)
            cid = viewInfo.data.cid
            title = viewInfo.data.title
          }
          const createForm = await api.buildResolveForm(aid, cid, quality, title)
          pdownSdk.createTask(createForm)
        } catch (e) {
          alert('获取下载链接失败')
          console.error(e)
        }
      })
    }
  }, 200)
}
