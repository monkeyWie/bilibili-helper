import { jQuery as $ } from 'proxyee-down-extension-sdk'

const sameProtocal = url => {
  const protocal = window.location ? window.location.protocol : null
  return protocal ? url.replace(/^(http)?s?:\/\//, protocal + '//') : url
}

const getDownLink = (aid, cid, quality) => {
  const url = sameProtocal('https://api.bilibili.com/x/player/playurl')
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      type: 'GET',
      dataType: 'json',
      data: { avid: aid, cid, qn: quality, otype: 'json' },
      success(response) {
        resolve(response)
      },
      error(request, status, error) {
        reject(error)
      }
    })
  })
}

const qualityDesc = quality => {
  if (quality == 112) {
    return '1080p+'
  } else if (quality == 80) {
    return '1080p'
  } else if (quality == 64) {
    return '720p'
  } else if (quality == 32) {
    return '480p'
  } else if (quality == 16) {
    return '360p'
  } else {
    return 'other'
  }
}

export function getViewInfo(aid) {
  const url = sameProtocal('https://api.bilibili.com/x/web-interface/view')
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: { aid },
      success(response) {
        resolve(response)
      },
      error(request, status, error) {
        reject(error)
      }
    })
  })
}

export async function buildResolveForm(aid, cid, quality, title) {
  const result = await getDownLink(aid, cid, quality)
  const downInfo = result.data.durl[0]
  const url = sameProtocal(downInfo.url)
  return {
    request: {
      url: url,
      heads: { referer: 'https://bilibili.com' }
    },
    response: {
      fileName: title + '_' + qualityDesc(quality) + '.flv',
      totalSize: downInfo.size,
      supportRange: true
    },
    config: { connections: 16 }
  }
}
