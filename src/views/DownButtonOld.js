const button = $(`
<div class="bilibili-player-video-btn bilibili-player-video-btn-quality">
  <div class="bilibili-player-video-quality-menu bpui-component bpui-selectmenu">
    <span class="bpui-selectmenu-txt">
      <span class="bilibili-player-video-quality-text">下载 </span>
      <span>PD下载</span>
    </span>
    <div class="bpui-selectmenu-arrow bpui-icon bpui-icon-arrow-down"></div>
    <ul class="bpui-selectmenu-list bpui-selectmenu-list-left" style="display: none;">
    <li class="bpui-selectmenu-list-row" data-value="112">
        <span class="bilibili-player-video-quality-text">超清 </span>
        <span>1080P+</span>
      </li>
      <li class="bpui-selectmenu-list-row" data-value="80">
        <span class="bilibili-player-video-quality-text">超清 </span>
        <span>1080P</span>
      </li>
      <li class="bpui-selectmenu-list-row" data-value="64">
        <span class="bilibili-player-video-quality-text">高清
        </span>
        <span>720P</span>
      </li>
      <li class="bpui-selectmenu-list-row" data-value="32">
        <span class="bilibili-player-video-quality-text">清晰 </span>
        <span>480P</span>
      </li>
      <li class="bpui-selectmenu-list-row" data-value="15">
        <span class="bilibili-player-video-quality-text">流畅 </span>
        <span>360P</span>
      </li>
    </ul>
  </div>
</div>
`)

button.find('span.bpui-selectmenu-txt').click(function() {
  const ul = button.find('ul.bpui-selectmenu-list')
  if (ul.is(':hidden')) {
    ul.show()
  } else {
    ul.hide()
  }
})

button.find('li.bpui-selectmenu-list-row').click(function() {
  button.find('ul.bpui-selectmenu-list').hide()
})

export default button
