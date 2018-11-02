window.onload = () => {
  const checkLoad = setInterval(() => {
    //检查播放器是否加载完成
    if (window.$ && $('div.bilibili-player-video-control>div').size() > 0) {
      clearInterval(checkLoad)
      const api = require('./common/api').default
      const pdownSdk = require('proxyee-down-extension-sdk').default
      const downDivJq =
        $('div.old-btn').size() > 0
          ? require('./views/DownButtonNew').default
          : require('./views/DownButtonOld').default
      $('div.bilibili-player-video-control div.bilibili-player-video-btn-start').after(downDivJq)
      downDivJq.on('click', 'li[data-value]', async function() {
        const quality = $(this).attr('data-value')
        try {
          let seasonType
          let cid
          if (window.__INITIAL_STATE__.videoData) {
            seasonType = 0
            cid = window.__INITIAL_STATE__.videoData.cid
          } else {
            seasonType = 1
            cid = window.__INITIAL_STATE__.epInfo.cid
          }
          const createForm = await api.buildResolveForm(cid, quality, seasonType, $('h1[title]').attr('title'))
          pdownSdk.createTask(createForm)
        } catch (e) {
          alert('获取下载链接失败')
          console.error(e)
        }
      })
    }
  }, 200)
}
