# Talking-Head Remotion Overlay Skill

用 Codex 和 Remotion 为口播视频生成透明科技感动效层。

这个 Skill 面向短视频创作者。你只需要提供口播字幕、录屏素材和参考视频，Codex 会按照字幕时间轴生成可叠加到口播画面上的透明动效视频。

## 能生成什么

- 透明背景 Remotion 动效层
- 大标题、关键词卡片、图标、流程图、数据图表和强调动画
- 根据 SRT 时间轴同步的轻量音效
- 录屏素材的放大、裁切、高亮和演示窗口动画
- 适合剪映专业版使用的高清透明 MOV
- 用于确认效果的低体积 MP4 预览版

默认视觉方向是高对比科技感：黑灰玻璃面板、白色大字、少量橙色或青绿色强调。画面会尽量避让中间的主播区域，必要时才短暂覆盖人物展示流程或录屏。

## 最简单的使用方法

1. 下载 [`generate-talking-head-remotion-overlay.skill.zip`](dist/generate-talking-head-remotion-overlay.skill.zip)。
2. 新开一个 Codex 对话。
3. 把 ZIP 文件拖进对话框，并告诉 Codex：`请安装并使用这个 Skill。`
4. 上传你的 `.srt` 字幕、口播视频、录屏素材和参考视频。
5. 把下面这句话发给 Codex：

```text
请使用 generate-talking-head-remotion-overlay Skill，根据我提供的 SRT、口播视频、录屏素材和参考视频，先分析时间轴和视觉风格，再生成关键帧预览图。得到我确认后，再生成 MP4 预览版。最终输出 1440x1080、4:3、透明背景、可以导入剪映专业版的 MOV，并保留独立 SFX 音轨。
```

不要一开始就要求 Codex 渲染最终 MOV。先确认关键帧和 MP4 预览，可以明显减少返工时间。

## 需要准备的素材

| 素材 | 必需 | 说明 |
| --- | --- | --- |
| `.srt` 字幕 | 是 | 用于驱动动效时间轴，不等于给视频添加字幕 |
| 口播视频 | 建议提供 | 用于分析人物位置和避让区域 |
| 录屏素材 | 按需 | Codex 会按照内容匹配字幕段落，不按文件名机械排序 |
| 参考视频或截图 | 建议提供 | 用于确定字体包装、动画节奏和科技感方向 |
| 品牌 Logo 或图标 | 可选 | 没有素材时可使用真实存在的公开品牌图标或模拟图标 |

## 推荐交付规格

| 文件 | 用途 |
| --- | --- |
| `preview.mp4` | 低体积预览版，用于确认动画、时间轴和布局 |
| `overlay-alpha.mov` | 1440x1080、4:3、透明背景高清 MOV，用于导入剪映 |
| `sfx-stem.wav` | 独立音效轨，便于后期单独调整音量 |

## 完整说明

第一次使用建议阅读：[小白使用说明](docs/小白使用说明.md)。

## 仓库结构

```text
.
├─ dist/
│  └─ generate-talking-head-remotion-overlay.skill.zip
├─ docs/
│  └─ 小白使用说明.md
└─ skill/
   └─ generate-talking-head-remotion-overlay/
      ├─ SKILL.md
      ├─ agents/
      ├─ assets/
      ├─ references/
      └─ scripts/
```

`dist` 中的 ZIP 适合直接导入 Codex。`skill` 中保留的是可修改源文件，方便继续优化模板、脚本和视觉规范。

## License

本仓库暂未附加开源许可证。公开查看和下载不等于自动授权商用、修改或再分发。需要开放授权时，请根据实际用途补充许可证。
