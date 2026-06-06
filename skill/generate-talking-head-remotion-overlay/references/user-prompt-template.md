# User Prompt Template

Use this in a new Codex window when asking for a new talking-head Remotion overlay.

```text
请使用 generate-talking-head-remotion-overlay Skill，帮我根据口播视频和 SRT 生成透明 Remotion 动效层。

素材：
- 口播视频：
- SRT 字幕：
- 截图/录屏/证据素材目录：
- 参考视频或截图：

输出要求：
- 比例/尺寸：
- 剪辑软件：
- 是否需要透明 MOV：
- 是否需要内嵌 SFX：
- 最终输出目录：

制作要求：
- 不显示口播字幕、不显示网格、不显示进度条。
- 先分析参考视频和 SRT，拆出细分语义时间轴。
- 大标题、词条、图标、证据窗口、右侧图片、图表、流程图都必须跟口播时间轴对应。
- 词条按口播节奏错峰进入并停留足够时间，不要一股脑出现又快速消失。
- 右侧优先展示证据截图、真实图片、公司 Logo、图表，不要重复左侧文字。
- 重要品牌用真实 Logo；没有真实图标时根据语境设计或生成语义图标。
- 数字要有滚动/冲击/增长图表动效。
- 风险、机会、证据、行动建议、评论互动要有不同的专属动效和音效。
- 先给关键帧图片，再给分段/低清 MP4 预览，确认后再输出最终透明 MOV。
```

If the user wants the same style as the proven AI hardware overlay, they can add:

```text
风格沿用之前 AI 硬件横版视频最终版：左侧大标题和词条，右侧以证据/真实图片/品牌 Logo/图表为主，商业实战 + 科技控制台，高冲击但不乱堆元素。
```
