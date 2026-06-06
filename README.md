# Talking-Head Remotion Overlay Skill

这个仓库保存 `generate-talking-head-remotion-overlay` Codex Skill，用于根据口播视频、SRT、证据素材、参考视频，生成可叠加到口播画面上的透明 Remotion 动效层。

它的目标不是简单堆科技感元素，而是让 Codex 像短视频信息导演一样工作：听到什么，画面就用大标题、词条、真实 Logo、证据截图、真实图片、图表、流程和音效帮助观众理解什么。

## 能生成什么

- 透明背景 Remotion 动效层
- 大字号中文冲击标题
- 按口播节奏错峰进入的分组词条
- 真实品牌 Logo 和语义图标
- 证据截图全图展示、关键区域放大和高亮锁定
- 右侧真实图片、Logo、图表和场景视觉
- 数字滚动、增长图、警示、checklist、评论输入等专属语义动效
- 根据 SRT 同步的轻量 SFX
- 剪映专业版 / CapCut 可用的 ProRes 4444 Alpha MOV
- 低清或分段 MP4 预览

## 最新 V2 经验

V2 来自一次完整的 AI 硬件横版视频迭代，核心升级：

- 不再粗暴按大段落显示，而是按 SRT 拆细语义时间轴。
- 标题、词条、素材、Logo、数字、音效都必须跟口播内容对应。
- 右侧以证据、真实图片、真实 Logo、图表为主，不重复左侧文字。
- 词条按口播节奏错峰进入，并保留足够阅读时间。
- 证据素材采用“全图 -> 关键区域放大 -> 高亮锁定 -> 退出”的动画。
- 图标必须有意义；真实品牌优先用原色真实 Logo。
- 风险、机会、证据、行动建议、评论互动使用不同动效和音效。

## 最简单使用方式

1. 下载 [`generate-talking-head-remotion-overlay.skill.zip`](dist/generate-talking-head-remotion-overlay.skill.zip)。
2. 新开一个 Codex 窗口。
3. 把 ZIP 拖进对话，告诉 Codex 安装并使用这个 Skill。
4. 上传口播视频、SRT、素材目录和参考视频。
5. 给 Codex 发送类似提示：

```text
请使用 generate-talking-head-remotion-overlay Skill，帮我给新口播视频生成透明 Remotion 动效层。

风格沿用之前 AI 硬件横版最终版：左侧大标题和词条，右侧以证据截图、真实图片、品牌 Logo、图表为主，商业实战 + 科技控制台，高冲击但不乱堆元素。

先分析口播视频尺寸、SRT 和素材，拆细文案语义时间轴。先给关键帧图片，再给分段或低清 MP4 预览，确认后再输出透明 MOV。
```

## 新窗口还需要重新给风格要求吗

如果沿用 V2 风格，不需要重新写长篇风格要求，只要说明“沿用之前 AI 硬件横版最终版风格”即可。

但每条新视频仍然需要提供：

- 口播视频
- SRT 字幕
- 素材目录
- 参考视频或截图
- 输出比例和尺寸
- 是否需要透明 MOV
- 是否需要音效
- 最终输出目录

Skill 能保留方法和风格规则，但不能自动知道新视频的文案、素材和比例。

## 推荐交付规格

| 文件 | 用途 |
| --- | --- |
| `preview.mp4` | 低体积预览，用于确认动效、时间轴和布局 |
| `overlay-alpha.mov` | ProRes 4444 Alpha 透明 MOV，用于导入剪映/CapCut |
| `sfx-stem.wav` | 独立音效轨，便于后期单独调音 |

已验证过的规格：

- 4:3：`1440x1080`
- 16:9：`1920x1080`
- 30fps
- ProRes 4444 Alpha
- alpha 像素格式如 `yuva444p12le`

## 文档

- [V2 交接文档](docs/Remotion_口播透明动效Skill_V2_交接文档.md)
- [小白使用说明](docs/小白使用说明.md)

## 仓库结构

```text
.
├── dist/
│   └── generate-talking-head-remotion-overlay.skill.zip
├── docs/
│   ├── Remotion_口播透明动效Skill_V2_交接文档.md
│   └── 小白使用说明.md
└── skill/
    └── generate-talking-head-remotion-overlay/
        ├── SKILL.md
        ├── agents/
        ├── assets/
        ├── references/
        └── scripts/
```

`dist` 里的 ZIP 适合直接导入 Codex。`skill` 里是可修改源文件，方便继续优化模板、脚本和规则。

## License

本仓库暂未附加开源许可证。公开查看和下载不等于自动授权商业、修改或再分发。需要开放授权时，请根据实际用途补充许可证。
