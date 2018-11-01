import pdownSdk from 'proxyee-down-extension-sdk'

/* const playInfo = { ...window.__playinfo__ }
burl(window.__INITIAL_STATE__.videoData.cid, { season_type: 0, quality: 32 }).then(function(url) {
  console.log(url)
}) */

window.onload = () => {
  const checkLoad = setInterval(() => {
    //检查播放器是否加载完成
    if (window.$ && $('div.bilibili-player-video-control>div').size() > 0) {
      clearInterval(checkLoad)
      const api = require('./common/api').default
      const downDivJq = $(require('./views/DownButton').default)
      $('div.bilibili-player-video-control div[name=pause_button]').after(downDivJq)
      downDivJq.on('click', 'li.bpui-selectmenu-list-row', async function() {
        const quality = $(this).attr('data-value')
        const result = await api.getDownLink(window.__INITIAL_STATE__.videoData.cid, quality)
        const downInfo = result.durl[0]
        const url = downInfo.url.replace(/^http/, 'https')
        pdownSdk.createTask({
          request: {
            url: url,
            heads: { referer: 'https://bilibili.com' }
          },
          response: {
            fileName:
              $('#viewbox_report')
                .find('h1>span')
                .text() + '.flv',
            totalSize: downInfo.size,
            supportRange: true
          },
          config: { connections: 16 }
        })
      })
    }
  }, 200)
}
