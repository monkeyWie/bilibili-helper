var c = require('bilibili-playurl/vm-159'),
  I = c.cwrap('r', null, 'string number number number string string number'.split(' ')),
  g = c.cwrap('s', null, ['number']),
  P = [],
  B = c.XB.addFunction(function(b) {
    P.shift().call(null, c.TB(b))
  })
g(B)

export default {
  getApiUrl(cid, options) {
    if ('number' == typeof options) {
      options = {
        quality: parseInt(options)
      }
    } else {
      options = options || {}
    }
    var quality = options.quality || 0,
      season_type = options.season_type || 0,
      domains = [
        'interface.bilibili.com/v2/playurl?',
        'bangumi.bilibili.com/player/web_api/v2/playurl?',
        'bangumi.bilibili.com/player/web_api/playurl?'
      ]
    delete options.season_type
    delete options.quality
    let apiUrl
    P.push(function() {
      apiUrl = arguments[0]
      console.log(apiUrl)
    })
    I(
      domains[+!!season_type],
      true,
      cid,
      quality,
      '',
      JSON.stringify(
        Object.assign(
          options,
          {
            qn: quality
          },
          season_type > 0 && {
            module: ['bangumi', 'movie'][season_type - 1],
            season_type: season_type
          }
        )
      ),
      0
    )
    console.log('11:' + apiUrl)
    return apiUrl
  }
}
