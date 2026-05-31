import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {SceneKind, getScene} from '../data';

const WHITE = '#fbfbf4';
const BLACK = '#050607';
const BLUE = '#2498ff';
const CYAN = '#29e1ff';
const ORANGE = '#ffb52f';
const GREEN = '#37e36f';
const RED = '#ff4444';
const PURPLE = '#bc5cff';
const MUTED = 'rgba(251,251,244,0.72)';
const PANEL = 'rgba(4,6,7,0.72)';

const secToFrame = (seconds: number, fps: number) => Math.round(seconds * fps);
const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

const baseText: React.CSSProperties = {
  fontFamily:
    'Inter, "Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", Arial, sans-serif',
  letterSpacing: 0,
};

const mono: React.CSSProperties = {
  fontFamily:
    '"SFMono-Regular", Consolas, "Liberation Mono", "Microsoft YaHei UI", monospace',
  letterSpacing: 0,
};

const ease = (frame: number, fps: number, delay = 0, duration = 0.45) =>
  interpolate(frame, [delay * fps, (delay + duration) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const pop = (frame: number, fps: number, delay = 0, damping = 12) =>
  spring({
    frame: frame - secToFrame(delay, fps),
    fps,
    config: {damping, stiffness: 240, mass: 0.58},
    durationInFrames: 22,
  });

const sceneFrame = (start: number, fps: number) => useCurrentFrame() - secToFrame(start, fps);

type IconType =
  | 'spark'
  | 'stack'
  | 'terminal'
  | 'timer'
  | 'route'
  | 'video'
  | 'repair'
  | 'play'
  | 'chart'
  | 'map'
  | 'rocket'
  | 'code'
  | 'cut'
  | 'folder'
  | 'sound'
  | 'check'
  | 'cursor'
  | 'brain'
  | 'codex'
  | 'remotion'
  | 'ai'
  | 'cursorLogo'
  | 'claudeLogo';

type Theme = {
  color: string;
  alt: string;
  danger?: string;
  icon: IconType;
  stage: string;
  caption: string;
  no: string;
};

type Copy = {
  hero: string;
  hero2?: string;
  sub: string;
  stat: string;
  side: Array<{text: string; icon: IconType; color: string}>;
  flow?: Array<{text: string; icon: IconType; color: string}>;
};

const themeFor = (kind: SceneKind): Theme => {
  const table: Record<SceneKind, Theme> = {
    headline: {color: BLUE, alt: CYAN, icon: 'spark', stage: 'BREAKING · AI VIDEO', caption: 'AI 短视频生产方式变了', no: '00'},
    capabilities: {color: CYAN, alt: ORANGE, icon: 'stack', stage: 'CODEX · CAPABILITY', caption: '不只是写代码', no: '01'},
    concept: {color: BLUE, alt: GREEN, icon: 'terminal', stage: 'CONTROL · SOFTWARE', caption: '电脑任务执行者', no: '02'},
    plugins: {color: ORANGE, alt: CYAN, icon: 'video', stage: 'PLUGIN · REMOTION', caption: '代码生成视频', no: '03'},
    manualSteps: {color: RED, alt: ORANGE, danger: RED, icon: 'cut', stage: 'OLD PIPELINE · STEPS', caption: '手动逐项完成', no: '04'},
    workflow: {color: RED, alt: ORANGE, danger: RED, icon: 'timer', stage: 'OLD PIPELINE · COST', caption: '传统流程太慢', no: '05'},
    terminalPrompt: {color: CYAN, alt: BLUE, icon: 'terminal', stage: 'CODEX · PROMPT', caption: '打开终端描述风格', no: '06'},
    codexFlow: {color: GREEN, alt: BLUE, icon: 'route', stage: 'CODEX · AUTO FLOW', caption: '自动拆解执行', no: '07'},
    demoBuild: {color: ORANGE, alt: CYAN, icon: 'video', stage: 'DEMO · PROMPT TO VIDEO', caption: '一句话生成', no: '08'},
    autoRepair: {color: ORANGE, alt: GREEN, icon: 'repair', stage: 'AUTO REPAIR · QUEUE', caption: '异常自动处理', no: '09'},
    demoFix: {color: RED, alt: ORANGE, danger: RED, icon: 'repair', stage: 'FIX · AUDIO TRACK', caption: '问题自修复', no: '10'},
    demoResult: {color: GREEN, alt: CYAN, icon: 'play', stage: 'PREVIEW · RESULT', caption: '成片直接看', no: '11'},
    packaging: {color: CYAN, alt: ORANGE, icon: 'video', stage: 'STYLE · PACKAGING', caption: '口播视频视觉包装', no: '12'},
    power: {color: PURPLE, alt: ORANGE, icon: 'code', stage: 'MOTION · CODED', caption: '动画可编程', no: '13'},
    metrics: {color: BLUE, alt: GREEN, icon: 'chart', stage: 'MARKET · SCALE', caption: '真实增长信号', no: '14'},
    mindmap: {color: PURPLE, alt: BLUE, icon: 'map', stage: 'TOOL CHOICE · MAP', caption: '工具怎么选', no: '15'},
    creator: {color: BLUE, alt: GREEN, icon: 'brain', stage: 'CREATOR · TEAM', caption: '一个人就是影视团队', no: '16'},
    finale: {color: GREEN, alt: ORANGE, icon: 'rocket', stage: 'CREATOR · 10X OUTPUT', caption: '产能放大十倍', no: '17'},
  };
  return table[kind];
};

const copyFor = (kind: SceneKind): Copy => {
  const table: Record<SceneKind, Copy> = {
    headline: {
      hero: 'AI 自己剪视频',
      sub: '从脚本、分镜、素材到包装，一条链路自动推进',
      stat: 'AUTO',
      side: [
        {text: '脚本', icon: 'code', color: BLUE},
        {text: '分镜', icon: 'cut', color: CYAN},
        {text: '成片', icon: 'play', color: GREEN},
      ],
    },
    capabilities: {
      hero: '不只是',
      hero2: '写代码',
      sub: 'Codex 正在变成任务执行外包',
      stat: '90+',
      side: [
        {text: '写脚本', icon: 'code', color: CYAN},
        {text: '生成素材', icon: 'folder', color: ORANGE},
        {text: '剪辑包装', icon: 'video', color: GREEN},
      ],
      flow: [
        {text: '需求', icon: 'cursor', color: CYAN},
        {text: '拆任务', icon: 'brain', color: ORANGE},
        {text: '执行', icon: 'terminal', color: GREEN},
      ],
    },
    concept: {
      hero: '能操控',
      hero2: '电脑软件',
      sub: '把需求变成电脑里的连续动作',
      stat: 'TASK',
      side: [
        {text: '浏览器', icon: 'cursor', color: BLUE},
        {text: '文件工程', icon: 'folder', color: ORANGE},
        {text: '自动执行', icon: 'terminal', color: GREEN},
      ],
      flow: [
        {text: '听懂目标', icon: 'brain', color: BLUE},
        {text: '打开软件', icon: 'terminal', color: CYAN},
        {text: '交付结果', icon: 'check', color: GREEN},
      ],
    },
    plugins: {
      hero: 'Remotion',
      hero2: '生成视频',
      sub: '用代码描述镜头、动效、字幕和渲染',
      stat: 'PLUGIN',
      side: [
        {text: 'React 时间线', icon: 'code', color: CYAN},
        {text: '动画参数', icon: 'spark', color: ORANGE},
        {text: '透明导出', icon: 'video', color: GREEN},
      ],
    },
    manualSteps: {
      hero: '传统流程',
      hero2: '逐项手动',
      sub: '写稿、找素材、剪辑、配乐、字幕和调色，一个都不能少',
      stat: 'MANUAL',
      side: [
        {text: '写稿找素材', icon: 'folder', color: RED},
        {text: '剪辑配乐', icon: 'cut', color: ORANGE},
        {text: '字幕调色', icon: 'sound', color: PURPLE},
      ],
    },
    workflow: {
      hero: '5-6 小时',
      sub: '传统流程：写稿、找素材、剪辑、配乐、字幕',
      stat: 'OLD',
      side: [
        {text: '写稿 2h', icon: 'code', color: RED},
        {text: '剪辑 2h', icon: 'cut', color: ORANGE},
        {text: '字幕配乐 1h', icon: 'sound', color: PURPLE},
      ],
      flow: [
        {text: '写稿', icon: 'code', color: RED},
        {text: '找素材', icon: 'folder', color: ORANGE},
        {text: '剪辑', icon: 'cut', color: RED},
        {text: '配乐字幕', icon: 'sound', color: PURPLE},
      ],
    },
    terminalPrompt: {
      hero: '打开终端',
      hero2: '说清风格',
      sub: '把目标描述清楚，后续拆任务、生成和检查自动推进',
      stat: 'PROMPT',
      side: [
        {text: '输入需求', icon: 'cursor', color: CYAN},
        {text: '描述风格', icon: 'spark', color: BLUE},
        {text: '自动推进', icon: 'route', color: GREEN},
      ],
    },
    codexFlow: {
      hero: '30 分钟',
      sub: '一句话需求，自动拆任务，生成完整视频工程',
      stat: 'FAST',
      side: [
        {text: 'Prompt 输入', icon: 'cursor', color: BLUE},
        {text: '工程生成', icon: 'terminal', color: GREEN},
        {text: '导出成片', icon: 'check', color: ORANGE},
      ],
      flow: [
        {text: '描述风格', icon: 'cursor', color: BLUE},
        {text: '生成代码', icon: 'code', color: CYAN},
        {text: '渲染视频', icon: 'video', color: ORANGE},
        {text: '检查输出', icon: 'check', color: GREEN},
      ],
    },
    demoBuild: {
      hero: '一句话',
      hero2: '生成视频',
      sub: '输入需求后，项目、画面、预览和文件一起生成',
      stat: 'DEMO',
      side: [
        {text: '输入需求', icon: 'cursor', color: ORANGE},
        {text: '生成工程', icon: 'code', color: CYAN},
        {text: '看到预览', icon: 'play', color: GREEN},
      ],
    },
    autoRepair: {
      hero: '遇到问题',
      hero2: '自动处理',
      sub: '发现异常后继续检查、确认修改并补齐所需插件',
      stat: 'QUEUE',
      side: [
        {text: '发现异常', icon: 'repair', color: ORANGE},
        {text: '确认修改', icon: 'cursor', color: BLUE},
        {text: '补齐插件', icon: 'stack', color: GREEN},
      ],
    },
    demoFix: {
      hero: '漏音轨',
      hero2: '也能修',
      sub: '发现问题后继续补脚本、重渲染、检查音轨',
      stat: 'FIX',
      side: [
        {text: '发现问题', icon: 'sound', color: RED},
        {text: '补脚本', icon: 'repair', color: ORANGE},
        {text: '检查成功', icon: 'check', color: GREEN},
      ],
      flow: [
        {text: '报错', icon: 'sound', color: RED},
        {text: '定位', icon: 'cursor', color: ORANGE},
        {text: '修复', icon: 'repair', color: GREEN},
      ],
    },
    demoResult: {
      hero: '结果',
      hero2: '直接看',
      sub: '演示视频可播放，不只是文字说明',
      stat: 'DONE',
      side: [
        {text: '播放预览', icon: 'play', color: GREEN},
        {text: '工具卡片', icon: 'stack', color: CYAN},
        {text: '完成交付', icon: 'check', color: ORANGE},
      ],
    },
    packaging: {
      hero: '口播视频',
      hero2: '自动包装',
      sub: '先保留真人表达，再叠加大字、信息卡和节奏动效',
      stat: 'STYLE',
      side: [
        {text: '口播基础', icon: 'video', color: CYAN},
        {text: '参考风格', icon: 'spark', color: ORANGE},
        {text: '视觉包装', icon: 'stack', color: GREEN},
      ],
    },
    power: {
      hero: '动画',
      hero2: '可编程',
      sub: '时间、曲线、颜色、镜头节奏都能精确控制',
      stat: 'CODE',
      side: [
        {text: '帧级时间', icon: 'timer', color: BLUE},
        {text: '曲线参数', icon: 'spark', color: ORANGE},
        {text: '批量生成', icon: 'terminal', color: GREEN},
      ],
    },
    metrics: {
      hero: '300 万',
      hero2: '周活',
      sub: 'AI 编程工具进入真实生产力场景',
      stat: '3M+',
      side: [
        {text: '增长信号', icon: 'chart', color: GREEN},
        {text: '非代码任务', icon: 'stack', color: BLUE},
        {text: '自动生成', icon: 'terminal', color: ORANGE},
      ],
    },
    mindmap: {
      hero: '工具',
      hero2: '怎么选',
      sub: 'Cursor、Claude Code、Codex 对应不同工作深度',
      stat: 'MAP',
      side: [
        {text: 'Cursor 陪练', icon: 'cursor', color: BLUE},
        {text: 'Claude 深度搭档', icon: 'brain', color: ORANGE},
        {text: 'Codex 全流程交付', icon: 'rocket', color: GREEN},
      ],
    },
    creator: {
      hero: '一个人',
      hero2: '就是团队',
      sub: '会判断、会调用工具、会完成交付，个人产能开始接近团队',
      stat: 'TEAM',
      side: [
        {text: '判断', icon: 'brain', color: BLUE},
        {text: '执行', icon: 'terminal', color: GREEN},
        {text: '交付', icon: 'check', color: ORANGE},
      ],
    },
    finale: {
      hero: '10 倍',
      hero2: '产能',
      sub: '不是替代创作者，而是把交付能力放大',
      stat: '10X',
      side: [
        {text: '判断', icon: 'brain', color: BLUE},
        {text: '执行', icon: 'terminal', color: GREEN},
        {text: '交付', icon: 'check', color: ORANGE},
      ],
    },
  };
  return table[kind];
};

const Icon: React.FC<{type: IconType; color: string; size?: number}> = ({type, color, size = 96}) => {
  const brandAsset =
    type === 'codex'
      ? 'assets/logos/openai.svg'
      : type === 'cursorLogo'
        ? 'assets/logos/cursor.svg'
        : type === 'claudeLogo'
          ? 'assets/logos/anthropic.svg'
          : type === 'remotion'
            ? 'assets/logos/remotion-white.png'
          : null;
  if (brandAsset) {
    return (
      <div style={{width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', filter: `drop-shadow(0 0 18px ${color})`}}>
        <Img
          src={staticFile(brandAsset)}
          style={
            type === 'remotion'
              ? {width: size * 3.6, height: size * 0.88, maxWidth: 'none', objectFit: 'contain', transform: `translateX(${size * 1.28}px)`}
              : {width: size * 0.82, height: size * 0.82, objectFit: 'contain'}
          }
        />
      </div>
    );
  }
  const line = (style: React.CSSProperties) => (
    <div style={{position: 'absolute', background: color, borderRadius: 8, ...style}} />
  );
  const box = (style: React.CSSProperties) => (
    <div style={{position: 'absolute', border: `7px solid ${color}`, borderRadius: 18, ...style}} />
  );
  const circle = (style: React.CSSProperties) => (
    <div style={{position: 'absolute', border: `7px solid ${color}`, borderRadius: '50%', ...style}} />
  );
  return (
    <div style={{position: 'relative', width: size, height: size, filter: `drop-shadow(0 0 18px ${color})`}}>
      {type === 'spark' && (
        <>
          {line({left: size * 0.48, top: size * 0.08, width: 8, height: size * 0.84})}
          {line({left: size * 0.08, top: size * 0.48, width: size * 0.84, height: 8})}
          {line({left: size * 0.2, top: size * 0.2, width: size * 0.6, height: 8, transform: 'rotate(45deg)'})}
          {line({left: size * 0.2, top: size * 0.2, width: size * 0.6, height: 8, transform: 'rotate(-45deg)'})}
        </>
      )}
      {type === 'stack' && (
        <>
          {box({left: size * 0.16, top: size * 0.16, width: size * 0.6, height: size * 0.22})}
          {box({left: size * 0.25, top: size * 0.42, width: size * 0.6, height: size * 0.22})}
          {box({left: size * 0.1, top: size * 0.68, width: size * 0.6, height: size * 0.18})}
        </>
      )}
      {type === 'terminal' && (
        <>
          {box({left: size * 0.08, top: size * 0.18, width: size * 0.82, height: size * 0.62})}
          <div style={{...baseText, position: 'absolute', left: size * 0.2, top: size * 0.34, color, fontSize: size * 0.3, fontWeight: 1000}}>{'>'}</div>
          {line({left: size * 0.48, top: size * 0.56, width: size * 0.26, height: 8})}
        </>
      )}
      {type === 'timer' && (
        <>
          {circle({left: size * 0.14, top: size * 0.2, width: size * 0.68, height: size * 0.68})}
          {line({left: size * 0.48, top: size * 0.44, width: size * 0.3, height: 8, transform: 'rotate(35deg)', transformOrigin: 'left center'})}
          {line({left: size * 0.38, top: size * 0.06, width: size * 0.24, height: 8})}
        </>
      )}
      {type === 'route' && (
        <>
          {[0.1, 0.44, 0.78].map((x) => (
            <div key={x} style={{position: 'absolute', left: size * x, top: size * 0.42, width: size * 0.18, height: size * 0.18, borderRadius: '50%', background: color}} />
          ))}
          {line({left: size * 0.24, top: size * 0.5, width: size * 0.58, height: 7})}
        </>
      )}
      {(type === 'video' || type === 'play') && (
        <>
          {box({left: size * 0.08, top: size * 0.24, width: size * 0.62, height: size * 0.46})}
          <div style={{position: 'absolute', right: size * 0.08, top: size * 0.34, width: 0, height: 0, borderTop: `${size * 0.15}px solid transparent`, borderBottom: `${size * 0.15}px solid transparent`, borderLeft: `${size * 0.24}px solid ${color}`}} />
        </>
      )}
      {type === 'repair' && (
        <>
          {box({left: size * 0.1, top: size * 0.2, width: size * 0.72, height: size * 0.5})}
          {line({left: size * 0.22, top: size * 0.56, width: size * 0.64, height: 8, transform: 'rotate(-36deg)'})}
        </>
      )}
      {type === 'chart' &&
        [0.18, 0.42, 0.66].map((x, i) => (
          <React.Fragment key={i}>
            {line({left: size * x, bottom: size * 0.14, width: size * 0.14, height: size * (0.28 + i * 0.18)})}
          </React.Fragment>
        ))}
      {type === 'map' && (
        <>
          {box({left: size * 0.12, top: size * 0.12, width: size * 0.72, height: size * 0.72})}
          <div style={{position: 'absolute', left: size * 0.42, top: size * 0.26, width: size * 0.2, height: size * 0.2, borderRadius: '50%', background: color}} />
          {line({left: size * 0.5, top: size * 0.48, width: 8, height: size * 0.28})}
        </>
      )}
      {type === 'rocket' && (
        <>
          {line({left: size * 0.16, top: size * 0.6, width: size * 0.66, height: 9, transform: 'rotate(-45deg)', transformOrigin: 'right center'})}
          <div style={{position: 'absolute', right: size * 0.14, top: size * 0.16, width: size * 0.3, height: size * 0.3, borderTop: `8px solid ${color}`, borderRight: `8px solid ${color}`, borderRadius: 6}} />
        </>
      )}
      {type === 'code' && (
        <>
          <div style={{...mono, position: 'absolute', left: size * 0.08, top: size * 0.2, color, fontSize: size * 0.52, fontWeight: 1000}}>{'</>'}</div>
        </>
      )}
      {type === 'cut' && (
        <>
          {circle({left: size * 0.12, top: size * 0.16, width: size * 0.28, height: size * 0.28})}
          {circle({left: size * 0.12, bottom: size * 0.16, width: size * 0.28, height: size * 0.28})}
          {line({left: size * 0.36, top: size * 0.44, width: size * 0.54, height: 8, transform: 'rotate(25deg)'})}
          {line({left: size * 0.36, top: size * 0.54, width: size * 0.54, height: 8, transform: 'rotate(-25deg)'})}
        </>
      )}
      {type === 'folder' && (
        <>
          {box({left: size * 0.08, top: size * 0.28, width: size * 0.82, height: size * 0.52})}
          {line({left: size * 0.12, top: size * 0.2, width: size * 0.32, height: 9})}
        </>
      )}
      {type === 'sound' && (
        <>
          {line({left: size * 0.16, top: size * 0.42, width: size * 0.22, height: size * 0.2})}
          {[0.42, 0.58, 0.74].map((x, i) => (
            <React.Fragment key={i}>
              {line({left: size * x, top: size * (0.28 + i * 0.07), width: 8, height: size * (0.44 - i * 0.04)})}
            </React.Fragment>
          ))}
        </>
      )}
      {type === 'check' && (
        <>
          {circle({left: size * 0.12, top: size * 0.12, width: size * 0.72, height: size * 0.72})}
          {line({left: size * 0.28, top: size * 0.52, width: size * 0.24, height: 9, transform: 'rotate(42deg)'})}
          {line({left: size * 0.43, top: size * 0.47, width: size * 0.38, height: 9, transform: 'rotate(-48deg)'})}
        </>
      )}
      {type === 'cursor' && (
        <div style={{position: 'absolute', left: size * 0.18, top: size * 0.12, width: 0, height: 0, borderLeft: `${size * 0.54}px solid ${color}`, borderTop: `${size * 0.76}px solid transparent`, filter: `drop-shadow(0 0 16px ${color})`}} />
      )}
      {type === 'brain' && (
        <>
          {circle({left: size * 0.14, top: size * 0.18, width: size * 0.68, height: size * 0.5})}
          {[0.26, 0.46, 0.66].map((x, i) => (
            <React.Fragment key={i}>
              {line({left: size * x, top: size * (0.36 + i * 0.06), width: size * 0.12, height: 8})}
            </React.Fragment>
          ))}
        </>
      )}
      {type === 'ai' && (
        <>
          <div style={{...mono, position: 'absolute', left: size * 0.08, top: size * 0.18, color, fontSize: size * 0.56, fontWeight: 1000}}>AI</div>
          {line({left: size * 0.08, bottom: size * 0.18, width: size * 0.78, height: 8})}
        </>
      )}
    </div>
  );
};

const splitHero = (copy: Copy) => [copy.hero, copy.hero2].filter(Boolean) as string[];

const termBadgesFor = (kind: SceneKind): Array<{label: string; sub: string; icon: IconType; color: string; important?: boolean}> => {
  const table: Record<SceneKind, Array<{label: string; sub: string; icon: IconType; color: string; important?: boolean}>> = {
    headline: [
      {label: 'AI VIDEO', sub: '自动剪辑', icon: 'ai', color: BLUE, important: true},
      {label: '一条链路', sub: '脚本到成片', icon: 'route', color: CYAN},
    ],
    capabilities: [
      {label: 'OpenAI Codex', sub: '任务执行外包', icon: 'codex', color: CYAN, important: true},
      {label: '90+ Plugins', sub: '能力扩展', icon: 'stack', color: ORANGE},
    ],
    concept: [
      {label: 'Software Agent', sub: '操控软件', icon: 'terminal', color: BLUE, important: true},
      {label: 'Task Runner', sub: '连续动作', icon: 'route', color: GREEN},
    ],
    plugins: [
      {label: 'Remotion', sub: '代码生成视频', icon: 'remotion', color: ORANGE, important: true},
      {label: 'React Timeline', sub: '逐帧控制', icon: 'code', color: CYAN},
    ],
    manualSteps: [
      {label: 'Manual Flow', sub: '逐项手动完成', icon: 'cut', color: RED, important: true},
      {label: 'Six Steps', sub: '流程繁琐', icon: 'stack', color: ORANGE},
    ],
    workflow: [
      {label: 'Old Flow', sub: '5-6 小时', icon: 'timer', color: RED, important: true},
      {label: 'Manual Edit', sub: '人力剪辑', icon: 'cut', color: ORANGE},
    ],
    terminalPrompt: [
      {label: 'Prompt', sub: '一句话描述风格', icon: 'cursor', color: CYAN, important: true},
      {label: 'Terminal', sub: '任务入口', icon: 'terminal', color: BLUE},
    ],
    codexFlow: [
      {label: 'Codex Flow', sub: '自动拆任务', icon: 'codex', color: GREEN, important: true},
      {label: '30 Min', sub: '快速成片', icon: 'timer', color: BLUE},
    ],
    demoBuild: [
      {label: 'Prompt', sub: '一句话需求', icon: 'cursorLogo', color: ORANGE, important: true},
      {label: 'Remotion', sub: '工程生成', icon: 'remotion', color: CYAN},
    ],
    autoRepair: [
      {label: 'Auto Repair', sub: '异常进入队列', icon: 'repair', color: ORANGE, important: true},
      {label: 'Plugin Check', sub: '缺少自动补齐', icon: 'stack', color: GREEN},
    ],
    demoFix: [
      {label: 'Audio Track', sub: '音轨修复', icon: 'sound', color: RED, important: true},
      {label: 'Self Repair', sub: '自动补上', icon: 'repair', color: GREEN},
    ],
    demoResult: [
      {label: 'Preview', sub: '直接播放', icon: 'play', color: GREEN, important: true},
      {label: 'Cards Motion', sub: '卡片动效', icon: 'stack', color: CYAN},
    ],
    packaging: [
      {label: 'Talking Head', sub: '保留真人表达', icon: 'video', color: CYAN, important: true},
      {label: 'Style Pack', sub: '自动叠加包装', icon: 'stack', color: ORANGE},
    ],
    power: [
      {label: 'Frame Control', sub: '帧级控制', icon: 'timer', color: BLUE, important: true},
      {label: 'Motion Code', sub: '动效参数化', icon: 'code', color: PURPLE},
    ],
    metrics: [
      {label: '3M+ Weekly', sub: '300 万周活', icon: 'chart', color: GREEN, important: true},
      {label: '50%+ Tasks', sub: '不只是写代码', icon: 'stack', color: BLUE},
    ],
    mindmap: [
      {label: 'Cursor', sub: '实时陪练', icon: 'cursorLogo', color: BLUE, important: true},
      {label: 'Claude Code', sub: '深度搭档', icon: 'claudeLogo', color: ORANGE},
      {label: 'Codex', sub: '全流程交付', icon: 'codex', color: GREEN},
    ],
    creator: [
      {label: 'Creator OS', sub: '一个人就是团队', icon: 'brain', color: BLUE, important: true},
      {label: 'Codex', sub: '全流程执行', icon: 'codex', color: GREEN},
    ],
    finale: [
      {label: 'Creator OS', sub: '一人团队', icon: 'brain', color: BLUE, important: true},
      {label: '10X Engine', sub: '交付加速', icon: 'rocket', color: GREEN},
    ],
  };
  return table[kind];
};

const StageHeader: React.FC<{theme: Theme; start: number}> = ({theme, start}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  const p = ease(f, fps, 0, 0.38);
  const scan = interpolate(f % 60, [0, 60], [-25, 125], {easing: Easing.linear});
  return (
    <div style={{position: 'absolute', left: 118, top: 82, width: 1320, opacity: p, transform: `translateX(${(1 - p) * -90}px)`, zIndex: 8}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <div style={{width: 8, height: 66, background: theme.color, boxShadow: `0 0 28px ${theme.color}`}} />
        <div style={{...mono, color: theme.color, fontSize: 44, fontWeight: 1000, letterSpacing: 8, textShadow: `0 0 24px ${theme.color}88`}}>{theme.stage}</div>
      </div>
      <div style={{...baseText, color: WHITE, fontSize: 40, fontWeight: 950, marginTop: 10, textShadow: '0 8px 22px rgba(0,0,0,0.8)'}}>{theme.caption}</div>
      <div style={{position: 'absolute', left: 0, top: 82, width: 640, height: 4, background: `linear-gradient(90deg, transparent ${scan - 20}%, ${theme.color} ${scan}%, transparent ${scan + 20}%)`, boxShadow: `0 0 22px ${theme.color}`}} />
    </div>
  );
};

const BigMomentTitle: React.FC<{kind: SceneKind; theme: Theme; start: number}> = ({kind, theme, start}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  const copy = copyFor(kind);
  const lines = splitHero(copy);
  const isDemo = kind === 'demoBuild' || kind === 'demoFix' || kind === 'demoResult';
  const compactAfter = ease(f, fps, 2.1, 0.55);
  const introOpacity = interpolate(f, [0, fps * 0.15, fps * 2.6, fps * 3.5], [0, 1, 1, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const left = isDemo ? 72 : interpolate(compactAfter, [0, 1], [300, 118]);
  const top = isDemo ? 460 : interpolate(compactAfter, [0, 1], [420, 510]);
  const scale = isDemo ? 0.92 : interpolate(compactAfter, [0, 1], [1, 0.76]);
  return (
    <div style={{position: 'absolute', left, top, width: isDemo ? 1180 : 2450, opacity: introOpacity, transform: `scale(${scale})`, transformOrigin: 'left top', zIndex: 5}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 26, marginBottom: 26}}>
        <div style={{width: 172, height: 172, borderRadius: '50%', background: theme.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 50px ${theme.color}`}}>
          <div style={{...mono, color: WHITE, fontSize: 72, fontWeight: 1000}}>{theme.no}</div>
        </div>
        <Icon type={theme.icon} color={theme.color} size={142} />
      </div>
      {lines.map((line, lineIndex) => {
        const words = line.split('');
        return (
          <div key={line} style={{display: 'flex', flexWrap: 'wrap', lineHeight: 0.94, marginTop: lineIndex ? 14 : 0}}>
            {words.map((ch, i) => {
              const p = pop(f, fps, 0.12 + lineIndex * 0.12 + i * 0.025, 10);
              const isHot = /[0-9]|AI|倍|万|分钟|Remotion/.test(ch);
              return (
                <span
                  key={`${line}-${ch}-${i}`}
                  style={{
                    ...baseText,
                    display: 'inline-block',
                    color: isHot ? theme.color : WHITE,
                    fontSize: isDemo ? 156 : lines.length > 1 ? 220 : 260,
                    fontWeight: 1000,
                    marginRight: ch === ' ' ? 34 : 9,
                    opacity: p,
                    WebkitTextStroke: '5px rgba(0,0,0,0.58)',
                    textShadow: `0 30px 46px rgba(0,0,0,0.68), 0 0 ${isHot ? 58 : 24}px ${isHot ? theme.color : 'rgba(255,255,255,0.2)'}`,
                    transform: `translateY(${(1 - p) * 130}px) scale(${0.68 + p * 0.32}) skewX(${(1 - p) * -10}deg)`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        );
      })}
      <div style={{...baseText, color: MUTED, fontSize: isDemo ? 38 : 48, fontWeight: 900, lineHeight: 1.18, marginTop: 34, maxWidth: isDemo ? 1000 : 1800, textShadow: '0 10px 28px rgba(0,0,0,0.7)'}}>
        {copy.sub}
      </div>
    </div>
  );
};

const StatPill: React.FC<{theme: Theme; start: number; stat: string}> = ({theme, start, stat}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  const p = pop(f, fps, 0.34);
  return (
    <div style={{position: 'absolute', right: 128, top: 96, width: 410, height: 112, borderRadius: 56, border: `3px solid ${theme.color}99`, background: 'rgba(0,0,0,0.68)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: p, transform: `translateY(${(1 - p) * -70}px)`, boxShadow: `0 0 34px ${theme.color}55`, zIndex: 8}}>
      <div style={{width: 18, height: 18, borderRadius: '50%', background: theme.color, boxShadow: `0 0 22px ${theme.color}`}} />
      <div style={{...mono, color: WHITE, fontSize: 44, fontWeight: 1000, letterSpacing: 5}}>{stat}</div>
    </div>
  );
};

const TermBadgeRail: React.FC<{kind: SceneKind; start: number}> = ({kind, start}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  const isDemo = kind === 'demoBuild' || kind === 'demoFix' || kind === 'demoResult';
  const hasChart = kind === 'metrics' || kind === 'power' || kind === 'finale';
  if (hasChart) return null;
  const badges = termBadgesFor(kind);
  return (
    <div style={{position: 'absolute', right: 76, top: isDemo ? 450 : 450, width: 880, zIndex: 7}}>
      {badges.map((badge, i) => {
        const p = pop(f, fps, 0.34 + i * 0.13, 11);
        const scan = interpolate((f + i * 12) % 62, [0, 62], [-20, 120], {easing: Easing.linear});
        const lock = badge.important
          ? interpolate(f, [4, 15, 34, 50], [0, 1, 0.42, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : 0;
        const h = 174;
        const iconSize = 104;
        return (
          <div
            key={badge.label}
            style={{
              height: h,
              marginBottom: 18,
              borderRadius: 18,
              border: `3px solid ${badge.color}aa`,
              background: 'rgba(0,0,0,0.62)',
              boxShadow: `0 0 ${34 + lock * 34}px ${badge.color}${badge.important ? '88' : '55'}, inset 0 0 ${lock * 30}px ${badge.color}22`,
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              padding: '0 32px',
              opacity: p,
              overflow: 'hidden',
              transform: `translateX(${(1 - p) * 110}px) scale(${0.92 + p * 0.08 + lock * 0.035})`,
            }}
          >
            <div style={{width: 10, height: 110, borderRadius: 10, background: badge.color, boxShadow: `0 0 ${30 + lock * 22}px ${badge.color}`}} />
            <div
              style={{
                width: iconSize,
                height: iconSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${1 + lock * 0.34}) rotate(${lock * -6}deg)`,
                filter: `drop-shadow(0 0 ${18 + lock * 34}px ${badge.color})`,
              }}
            >
              <Icon type={badge.icon} color={badge.color} size={iconSize} />
            </div>
            <div style={{flex: 1}}>
              <div style={{...mono, color: badge.color, fontSize: 48, fontWeight: 1000, letterSpacing: 2, textShadow: `0 0 ${24 + lock * 24}px ${badge.color}`}}>{badge.label}</div>
              <div style={{...baseText, color: WHITE, fontSize: 44, fontWeight: 1000, marginTop: 4}}>{badge.sub}</div>
            </div>
            {badge.important ? <div style={{...mono, position: 'absolute', right: 22, top: 18, color: badge.color, fontSize: 22, fontWeight: 1000, letterSpacing: 3, opacity: lock}}>LOCK</div> : null}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: `linear-gradient(90deg, transparent ${scan - 18}%, ${badge.color} ${scan}%, transparent ${scan + 18}%)`, boxShadow: `0 0 20px ${badge.color}`}} />
          </div>
        );
      })}
    </div>
  );
};

const PrimaryBrandBurst: React.FC<{kind: SceneKind; start: number}> = ({kind, start}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  const primary = termBadgesFor(kind).find((badge) => badge.important);
  if (!primary) return null;
  const p = pop(f, fps, 0.12, 10);
  const hold = interpolate(f, [0, fps * 1.2, fps * 2.3, fps * 3.1], [1, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scan = interpolate(f % 54, [0, 54], [-24, 124], {easing: Easing.linear});
  const isDemo = kind === 'demoBuild' || kind === 'demoFix' || kind === 'demoResult';
  const left = isDemo ? 120 : 1760;
  const top = isDemo ? 620 : 690;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 980,
        height: 260,
        borderRadius: 34,
        border: `5px solid ${primary.color}`,
        background: 'rgba(0,0,0,0.68)',
        boxShadow: `0 0 72px ${primary.color}66, inset 0 0 42px ${primary.color}22`,
        display: 'flex',
        alignItems: 'center',
        gap: 42,
        padding: '0 52px',
        opacity: p * hold,
        overflow: 'hidden',
        transform: `translateX(${(1 - p) * (isDemo ? -120 : 140)}px) scale(${0.82 + p * 0.18})`,
        zIndex: 9,
      }}
    >
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 8, background: `linear-gradient(90deg, transparent ${scan - 18}%, ${primary.color} ${scan}%, transparent ${scan + 18}%)`, boxShadow: `0 0 30px ${primary.color}`}} />
      <div style={{width: 168, height: 168, borderRadius: 30, border: `3px solid ${primary.color}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 42px ${primary.color}55`}}>
        <Icon type={primary.icon} color={primary.color} size={138} />
      </div>
      <div style={{flex: 1}}>
        <div style={{...mono, color: primary.color, fontSize: 58, fontWeight: 1000, letterSpacing: 4, textShadow: `0 0 28px ${primary.color}`}}>
          {primary.label}
        </div>
        <div style={{...baseText, color: WHITE, fontSize: 46, fontWeight: 1000, marginTop: 14, textShadow: '0 10px 26px rgba(0,0,0,0.7)'}}>
          {primary.sub}
        </div>
      </div>
      <div style={{...mono, position: 'absolute', right: 34, bottom: 24, color: 'rgba(255,255,255,0.34)', fontSize: 26, fontWeight: 900, letterSpacing: 4}}>LOCKED</div>
    </div>
  );
};

const SidePromptRail: React.FC<{kind: SceneKind; theme: Theme; start: number}> = ({kind, theme, start}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  const copy = copyFor(kind);
  if (kind === 'mindmap') return null;
  const hasChart = kind === 'metrics' || kind === 'power' || kind === 'finale';
  const isDemo = kind === 'demoBuild' || kind === 'demoFix' || kind === 'demoResult';
  const layout: Record<SceneKind, {side: 'left' | 'right'; top: number; title: string}> = {
    headline: {side: 'left', top: 1260, title: 'OUTPUT CHAIN'},
    capabilities: {side: 'left', top: 1270, title: 'CAPABILITY STACK'},
    concept: {side: 'left', top: 1270, title: 'TASK SCOPE'},
    plugins: {side: 'left', top: 1240, title: 'VIDEO PLUGIN'},
    manualSteps: {side: 'left', top: 1200, title: 'MANUAL STEPS'},
    workflow: {side: 'left', top: 1200, title: 'MANUAL COST'},
    terminalPrompt: {side: 'left', top: 1200, title: 'PROMPT INPUT'},
    codexFlow: {side: 'left', top: 1200, title: 'AUTO PIPELINE'},
    demoBuild: {side: 'left', top: 1160, title: 'BUILD STEPS'},
    autoRepair: {side: 'left', top: 1160, title: 'REPAIR QUEUE'},
    demoFix: {side: 'left', top: 1160, title: 'REPAIR STEPS'},
    demoResult: {side: 'left', top: 1160, title: 'DELIVERY CHECK'},
    packaging: {side: 'left', top: 1240, title: 'STYLE PACK'},
    power: {side: 'left', top: 1240, title: 'CONTROL LAYERS'},
    metrics: {side: 'left', top: 1240, title: 'MARKET SIGNALS'},
    mindmap: {side: 'left', top: 1000, title: 'TOOL ROLES'},
    creator: {side: 'left', top: 1240, title: 'CREATOR TEAM'},
    finale: {side: 'left', top: 1240, title: 'CREATOR STACK'},
  };
  const promptLayout = layout[kind];
  const railTop = promptLayout.top;
  const delayBase = isDemo ? 0.56 : 1.62;
  const railSide = promptLayout.side;
  const renderItem = (item: Copy['side'][number], i: number) => {
    const p = pop(f, fps, delayBase + i * 0.13);
    return (
      <div
        key={item.text}
        style={{
          height: 172,
          marginBottom: 18,
          borderRadius: 18,
          border: `3px solid ${item.color}a8`,
          background: PANEL,
          boxShadow: `0 0 32px ${item.color}44`,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          padding: '0 32px',
          opacity: p,
          transform: `translateX(${(1 - p) * (railSide === 'left' ? -130 : 130)}px) scale(${0.92 + p * 0.08})`,
        }}
      >
        <div style={{width: 10, height: 98, borderRadius: 8, background: item.color, boxShadow: `0 0 22px ${item.color}`}} />
        <Icon type={item.icon} color={item.color} size={96} />
        <div style={{...baseText, color: item.color === RED ? WHITE : item.color, fontSize: 72, fontWeight: 1000, lineHeight: 1.02, textShadow: `0 0 24px ${item.color}55`}}>{item.text}</div>
      </div>
    );
  };
  return (
    <div style={{position: 'absolute', [railSide]: 42, top: railTop, width: 890, zIndex: 6}}>
      <div style={{borderLeft: `3px solid ${theme.color}88`, paddingLeft: 18, boxShadow: `-10px 0 26px ${theme.color}22`}}>
        {copy.side.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  );
};

const FlowOverlay: React.FC<{kind: SceneKind; theme: Theme; start: number}> = ({kind, theme, start}) => {
  const copy = copyFor(kind);
  const flow = copy.flow;
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  if (!flow) return null;
  const totalW = 2380;
  const pAll = ease(f, fps, 0.74, 0.5);
  return (
    <div style={{position: 'absolute', left: 1080, top: 1990, width: totalW, height: 430, opacity: 0.86 * pAll, zIndex: 4}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 178, height: 6, background: `linear-gradient(90deg, transparent, ${theme.color}aa, ${theme.alt}aa, transparent)`, boxShadow: `0 0 30px ${theme.color}`}} />
      {flow.map((item, i) => {
        const p = pop(f, fps, 0.82 + i * 0.16);
        const x = (totalW - 360) * (flow.length === 1 ? 0 : i / (flow.length - 1));
        return (
          <div key={item.text} style={{position: 'absolute', left: x, top: i % 2 ? 96 : 36, width: 360, height: 260, borderRadius: 26, border: `3px solid ${item.color}aa`, background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(5px)', boxShadow: `0 0 34px ${item.color}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 80}px) scale(${0.86 + p * 0.14})`}}>
            <div style={{position: 'absolute', left: 22, top: 20, ...mono, color: item.color, fontSize: 30, fontWeight: 1000}}>{String(i + 1).padStart(2, '0')}</div>
            <Icon type={item.icon} color={item.color} size={86} />
            <div style={{...baseText, color: WHITE, fontSize: 46, fontWeight: 1000, marginTop: 18, textShadow: '0 8px 24px rgba(0,0,0,0.7)'}}>{item.text}</div>
          </div>
        );
      })}
    </div>
  );
};

const ChartLayer: React.FC<{kind: SceneKind; theme: Theme; start: number}> = ({kind, theme, start}) => {
  const {fps} = useVideoConfig();
  const f = sceneFrame(start, fps);
  if (kind !== 'metrics' && kind !== 'power' && kind !== 'finale') return null;
  const cards =
    kind === 'metrics'
      ? [
          ['周活', '300万', GREEN, 'chart' as IconType],
          ['非代码任务', '50%+', BLUE, 'stack' as IconType],
          ['自动生成', '大部分', ORANGE, 'terminal' as IconType],
        ]
      : kind === 'power'
        ? [
            ['帧控制', '30fps', BLUE, 'timer' as IconType],
            ['曲线参数', '精准', ORANGE, 'spark' as IconType],
            ['批量生成', '自动', GREEN, 'terminal' as IconType],
          ]
        : [
            ['产能', '10X', GREEN, 'rocket' as IconType],
            ['团队', '1人', BLUE, 'brain' as IconType],
            ['交付', '成片', ORANGE, 'check' as IconType],
          ];
  return (
    <div style={{position: 'absolute', right: 110, top: 1050, width: 960, zIndex: 7}}>
      {cards.map(([label, value, color, icon], i) => {
        const p = pop(f, fps, 0.58 + i * 0.12);
        return (
          <div key={label} style={{height: 174, marginBottom: 18, borderRadius: 18, border: `3px solid ${color}`, background: PANEL, boxShadow: `0 0 34px ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px', opacity: p, transform: `translateX(${(1 - p) * 120}px)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <Icon type={icon as IconType} color={color as string} size={86} />
              <div style={{...baseText, color: WHITE, fontSize: 54, fontWeight: 1000}}>{label}</div>
            </div>
            <div style={{...mono, color: color as string, fontSize: 84, fontWeight: 1000, textShadow: `0 0 30px ${color}`}}>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

type Shot = {until: number; scale: number; x: number; y: number; label: string; callout: string};
const shotAt = (t: number, shots: Shot[]) => shots.find((s) => t < s.until) ?? shots[shots.length - 1];

const DemoWindow: React.FC<{src: string; start: number; end: number; color: string; title: string; shots: Shot[]}> = ({src, start, end, color, title, shots}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const local = frame - secToFrame(start, fps);
  const seconds = Math.max(0, local / fps);
  const p = pop(local, fps, 0, 11);
  const out = interpolate(local, [secToFrame(end - start - 0.55, fps), secToFrame(end - start, fps)], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shot = shotAt(seconds, shots);
  const pulse = 0.72 + Math.sin(frame / 6) * 0.22;
  return (
    <Sequence from={secToFrame(start, fps)} durationInFrames={Math.max(1, secToFrame(end - start, fps))}>
      <div style={{position: 'absolute', right: 42, top: 1370, width: 2040, height: 1170, borderRadius: 48, border: `7px solid ${color}`, background: BLACK, boxShadow: `0 0 ${64 + pulse * 42}px ${color}, 0 42px 120px rgba(0,0,0,0.58)`, overflow: 'hidden', opacity: p * out, transform: `translateX(${(1 - p) * 260}px) scale(${0.84 + p * 0.16})`, zIndex: 3}}>
        <div style={{height: 112, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 44px', background: 'rgba(0,0,0,0.76)', borderBottom: `2px solid ${color}88`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Icon type="video" color={color} size={68} />
            <div style={{...mono, color, fontSize: 32, fontWeight: 1000, letterSpacing: 5}}>{title}</div>
          </div>
          <div style={{...baseText, color: WHITE, fontSize: 44, fontWeight: 1000}}>{shot.label}</div>
        </div>
        <div style={{position: 'relative', height: 1058, overflow: 'hidden'}}>
          <OffthreadVideo src={staticFile(src)} muted style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${shot.scale}) translate(${shot.x}%, ${shot.y}%)`, transformOrigin: 'center center'}} />
          <div style={{position: 'absolute', left: 42, top: 42, padding: '18px 26px', borderRadius: 14, border: `3px solid ${color}`, background: 'rgba(0,0,0,0.76)', boxShadow: `0 0 28px ${color}`, display: 'flex', alignItems: 'center', gap: 18}}>
            <Icon type="cursor" color={color} size={54} />
            <div style={{...baseText, color: WHITE, fontSize: 38, fontWeight: 1000}}>{shot.callout}</div>
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 42, height: 5, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 28px ${color}`}} />
          <div style={{position: 'absolute', inset: 30, border: `2px solid ${color}66`, borderRadius: 28}} />
        </div>
      </div>
    </Sequence>
  );
};

const DemoLayer: React.FC = () => (
  <>
    <DemoWindow
      src="assets/demo-codex-generate.mp4"
      start={55.566}
      end={84.966}
      color={ORANGE}
      title="CASE 01 · PROMPT TO VIDEO"
      shots={[
        {until: 7, scale: 2.35, x: 27, y: -8, label: '输入需求', callout: '重点看：一句话需求'},
        {until: 17, scale: 2.22, x: 25, y: 2, label: '生成工程', callout: '自动生成 Remotion 项目'},
        {until: 30, scale: 2.38, x: 26, y: 8, label: '预览与文件', callout: '预览帧 + 文件输出'},
      ]}
    />
    <DemoWindow
      src="assets/demo-audio-fix.mp4"
      start={101}
      end={110}
      color={RED}
      title="CASE 02 · SELF REPAIR"
      shots={[
        {until: 4, scale: 2.28, x: 26, y: -4, label: '发现漏音轨', callout: '问题进入修复队列'},
        {until: 10, scale: 2.22, x: 26, y: 6, label: '自动补上', callout: '脚本 + 音轨检查'},
      ]}
    />
    <DemoWindow
      src="assets/demo-result-preview.mp4"
      start={110}
      end={121.833}
      color={GREEN}
      title="CASE 03 · RESULT PREVIEW"
      shots={[
        {until: 5, scale: 2.02, x: 22, y: 2, label: '播放预览', callout: '成片可以直接看'},
        {until: 12, scale: 2.08, x: 24, y: 4, label: '卡片动效', callout: '工具卡片已经动起来'},
      ]}
    />
  </>
);

const KineticEdges: React.FC<{theme: Theme}> = ({theme}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame % 76, [0, 76], [-28, 128], {easing: Easing.linear});
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1280, height: 8, background: `linear-gradient(90deg, transparent ${sweep - 18}%, ${theme.color} ${sweep}%, transparent ${sweep + 18}%)`, opacity: 0.86, boxShadow: `0 0 28px ${theme.color}`}} />
    </>
  );
};

export const CodexOverlay: React.FC<{includeAudio?: boolean}> = ({includeAudio = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  const scene = getScene(time);
  const theme = themeFor(scene.kind);
  const copy = copyFor(scene.kind);
  const sceneP = clamp((time - scene.start) / Math.max(0.001, scene.end - scene.start));
  const flash = Math.max(0, 1 - Math.abs(sceneP - 0.025) * 18);

  return (
    <AbsoluteFill style={{backgroundColor: 'transparent', ...baseText}}>
      {includeAudio ? <Audio src={staticFile('audio/sfx-stem.wav')} volume={0.76} /> : null}
      <KineticEdges theme={theme} />
      <StageHeader theme={theme} start={scene.start} />
      <StatPill theme={theme} start={scene.start} stat={copy.stat} />
      <TermBadgeRail kind={scene.kind} start={scene.start} />
      <BigMomentTitle kind={scene.kind} theme={theme} start={scene.start} />
      <SidePromptRail kind={scene.kind} theme={theme} start={scene.start} />
      <FlowOverlay kind={scene.kind} theme={theme} start={scene.start} />
      <ChartLayer kind={scene.kind} theme={theme} start={scene.start} />
      <DemoLayer />
    </AbsoluteFill>
  );
};
