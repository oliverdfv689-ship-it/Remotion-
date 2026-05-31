import captionsData from '../public/data/captions.json';

export type Caption = {
  index: number;
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number;
  confidence: null;
};

export const captions = captionsData as Caption[];

export type SceneKind =
  | 'headline'
  | 'capabilities'
  | 'concept'
  | 'plugins'
  | 'manualSteps'
  | 'workflow'
  | 'terminalPrompt'
  | 'codexFlow'
  | 'demoBuild'
  | 'autoRepair'
  | 'demoFix'
  | 'demoResult'
  | 'packaging'
  | 'power'
  | 'metrics'
  | 'mindmap'
  | 'creator'
  | 'finale';

export type SceneSpec = {
  kind: SceneKind;
  start: number;
  end: number;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export const scenes: SceneSpec[] = [
  {
    kind: 'headline',
    start: 0.133,
    end: 6.166,
    eyebrow: 'SIGNAL / 00',
    title: 'AI 现在能自己剪视频了',
    subtitle: '从脚本、分镜、素材到成片，一条链路自动推进',
  },
  {
    kind: 'capabilities',
    start: 6.166,
    end: 20.066,
    eyebrow: 'CODEX / CAPABILITY STACK',
    title: 'OpenAI Codex 不只是写代码',
    subtitle: '写脚本、划分镜、生成素材、剪辑字幕配乐',
  },
  {
    kind: 'concept',
    start: 20.066,
    end: 24,
    eyebrow: 'MISCONCEPTION / FIXED',
    title: '它能操控电脑上的软件',
    subtitle: '从“程序员助手”变成“任务执行外包”',
  },
  {
    kind: 'plugins',
    start: 24,
    end: 29.6,
    eyebrow: 'PLUGIN / REMOTION',
    title: '90+ 插件里，Remotion 专门做视频',
    subtitle: '代码描述镜头、动画、字幕和渲染参数',
  },
  {
    kind: 'manualSteps',
    start: 29.6,
    end: 38.5,
    eyebrow: 'OLD PIPELINE / STEPS',
    title: '传统视频流程，需要手动逐项完成',
    subtitle: '写稿、找素材、剪辑、配乐、字幕、调色',
  },
  {
    kind: 'workflow',
    start: 38.5,
    end: 43.866,
    eyebrow: 'OLD PIPELINE / COST',
    title: '传统流程：5-6 小时',
    subtitle: '写稿、找素材、剪辑、配乐、字幕、调色',
  },
  {
    kind: 'terminalPrompt',
    start: 43.866,
    end: 47.133,
    eyebrow: 'CODEX PIPELINE / PROMPT',
    title: '打开终端，说清楚你想要的风格',
    subtitle: '一句话描述目标，后续步骤自动推进',
  },
  {
    kind: 'codexFlow',
    start: 47.133,
    end: 55.566,
    eyebrow: 'CODEX PIPELINE / OUTPUT',
    title: '打开终端，说清风格',
    subtitle: '半小时左右，完整视频躺进文件夹',
  },
  {
    kind: 'demoBuild',
    start: 55.566,
    end: 84.966,
    eyebrow: 'LIVE DEMO / BUILD',
    title: '一句话生成 AI 工具介绍视频',
    subtitle: '审查项目、生成分镜、画面、剪辑、转场、字幕',
  },
  {
    kind: 'autoRepair',
    start: 85.3,
    end: 101,
    eyebrow: 'AUTO REPAIR / QUEUE',
    title: '遇到问题，它会继续检查并处理',
    subtitle: '缺插件、执行异常和修改确认，都进入处理队列',
  },
  {
    kind: 'demoFix',
    start: 101,
    end: 110,
    eyebrow: 'AUTO REPAIR / AUDIO',
    title: '遇到问题，继续检查并修复',
    subtitle: '缺音轨、缺插件、执行异常，都进入处理队列',
  },
  {
    kind: 'demoResult',
    start: 110,
    end: 121.833,
    eyebrow: 'RESULT / PREVIEW',
    title: '成片可以直接查看',
    subtitle: '口播视频作为基础，Codex 负责视觉包装',
  },
  {
    kind: 'packaging',
    start: 121.833,
    end: 144.8,
    eyebrow: 'TALKING HEAD / PACKAGING',
    title: '口播视频作为基础，Codex 负责视觉包装',
    subtitle: '参考目标风格，自动生成大字、卡片和节奏动效',
  },
  {
    kind: 'power',
    start: 144.8,
    end: 167.8,
    eyebrow: 'WHY CODE WORKS',
    title: '动画本质：精确时间控制',
    subtitle: '曲线、色彩、参数、镜头节奏，都适合用代码描述',
  },
  {
    kind: 'metrics',
    start: 167.8,
    end: 182.066,
    eyebrow: 'MARKET SIGNAL / SCALE',
    title: 'Codex 正在变成通用生产力工具',
    subtitle: '视频、设计、文档、自动化，不只代码',
  },
  {
    kind: 'mindmap',
    start: 182.066,
    end: 220.666,
    eyebrow: 'TOOL CHOICE / MAP',
    title: 'Cursor / Claude Code / Codex 怎么选',
    subtitle: '实时陪练、深度搭档、全能外包',
  },
  {
    kind: 'creator',
    start: 220.666,
    end: 245.7,
    eyebrow: 'CREATOR / TEAM',
    title: '一个人，就是影视团队',
    subtitle: '会判断、会调用工具、会交付结果，已经不是比喻',
  },
  {
    kind: 'finale',
    start: 245.7,
    end: 261.6,
    eyebrow: 'CREATOR / MULTIPLIER',
    title: '一个人，就是影视团队',
    subtitle: 'AI 不是替代创作者，而是把产能放大 10 倍',
  },
];

export const getScene = (time: number) =>
  scenes.find((scene) => time >= scene.start && time < scene.end) ?? scenes[0];

export const visibleCaptions = (time: number) =>
  captions.filter((caption) => {
    const start = caption.startMs / 1000;
    const end = caption.endMs / 1000;
    return time >= start - 0.2 && time <= end + 0.25;
  });
