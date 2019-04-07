const button = $(`
<span class="bpui-bilibili-download-btn">
    <i class="van-icon-download"></i>
    PD下载
<ul class="bpui-selectmenu-list bpui-selectmenu-list-left">
    <li class="bpui-selectmenu-list-row" data-value="112">
        <span class="bilibili-player-video-quality-text">超清+ </span>
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
      <li class="bpui-selectmenu-list-row" data-value="16">
        <span class="bilibili-player-video-quality-text">流畅 </span>
        <span>360P</span>
      </li>
    </ul>
</span>
`)

const style = `
.bpui-bilibili-download-btn {
  margin-left: 30px;
  position: relative;
}
.bpui-bilibili-download-btn .bpui-selectmenu-list {
  position: absolute;
  left: 0px;
  top: 30px;
  z-index: 999;
  background: #fff;
  border: 1px solid #ccd0d7;
  display: none;
}
.bpui-bilibili-download-btn:hover .bpui-selectmenu-list {
  display: inherit;
}
.bpui-bilibili-download-btn .bpui-selectmenu-list li {
  padding: 2px 15px;
}
.bpui-bilibili-download-btn .bpui-selectmenu-list li:hover {
  background: #e2e2e2;
}
`

export default {
  Button: button,
  Style: style
} 
