const button = $(`
<div class="bilibili-player-video-btn bilibili-player-video-btn-quality">
  <div class="bilibili-player-video-quality-menu bui bui-select bui-dark bui-select-quality-menu">
    <div class="bui-select-wrap">
      <div class="bui-select-border">
        <div class="bui-select-header">
          <span class="bui-select-result">
            PD下载
          </span>
          <span class="bui-select-arrow">
            <span class="bui-select-arrow-down">
            </span>
          </span>
        </div>
        <div class="bui-select-bridge" style="height: 20px;">
        </div>
        <div class="bui-select-list-wrap">
          <ul class="bui-select-list" style="bottom: 41px; left: -51px; height: 150px;display:none;">
            <li class="bui-select-item" data-value="112">
              <span class="bilibili-player-video-quality-text">
                超清
              </span>
              <span>
                1080P+
              </span>
            </li>
            <li class="bui-select-item" data-value="80">
              <span class="bilibili-player-video-quality-text">
                超清
              </span>
              <span>
                1080P
              </span>
            </li>
            <li class="bui-select-item" data-value="64">
              <span class="bilibili-player-video-quality-text">
                高清
              </span>
              <span>
                720P
              </span>
            </li>
            <li class="bui-select-item" data-value="32">
              <span class="bilibili-player-video-quality-text">
                清晰
              </span>
              <span>
                480P
              </span>
            </li>
            <li class="bui-select-item" data-value="15">
              <span class="bilibili-player-video-quality-text">
                流畅
              </span>
              <span>
                360P
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
`)

button.find('div.bui-select-header').click(function() {
  const ul = button.find('ul.bui-select-list')
  if (ul.is(':hidden')) {
    ul.show()
  } else {
    ul.hide()
  }
})

button.find('li.bui-select-item').click(function() {
  button.find('ul.bui-select-list').hide()
})

export default button
