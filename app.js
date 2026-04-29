const STORAGE_KEY = "daily-life-compound-entries-v2";

const knowledgeLinks = [
  {
    title: "人生复利系统总入口",
    source: "Naval / 个人复利框架",
    note: "总问题：今天做的事，会不会在未来继续替我工作？"
  },
  {
    title: "人生复利系统诊断提示词",
    source: "AI 复盘协议",
    note: "机会诊断：特定知识、杠杆、许可、资产、自由、欲望成本。"
  },
  {
    title: "人生复利周报模板",
    source: "周复盘模板",
    note: "把一周行动沉淀成资产和下周唯一复利动作。"
  },
  {
    title: "每日饮食决策工具",
    source: "运动营养 / 今日饮食决策",
    note: "营养产品底层：今天怎么吃，不做百科，做决策支持。"
  },
  {
    title: "AI 协作提示词 SOP",
    source: "AI 协作工作流",
    note: "写清任务、上下文、边界、输出格式和禁止事项。"
  },
  {
    title: "系统提示词与知识库分工",
    source: "知识管理原则",
    note: "稳定规则放 prompt，大体量材料放知识库或笔记库。"
  }
];

const modeLabels = {
  recovery: "恢复日",
  steady: "稳态日",
  push: "推进日",
  sprint: "冲刺日"
};

const fields = {
  date: document.querySelector("#dateInput"),
  workDay: document.querySelector("#workDayInput"),
  availableMinutes: document.querySelector("#availableInput"),
  energy: document.querySelector("#energyInput"),
  anxiety: document.querySelector("#anxietyInput"),
  soreness: document.querySelector("#sorenessInput"),
  appetite: document.querySelector("#appetiteInput"),
  primaryDesire: document.querySelector("#primaryDesireInput"),
  fitnessAction: document.querySelector("#fitnessActionInput"),
  outputAction: document.querySelector("#outputActionInput"),
  readingAction: document.querySelector("#readingActionInput"),
  coachAction: document.querySelector("#coachActionInput"),
  mealQuality: document.querySelector("#mealQualityInput"),
  trainingMinutes: document.querySelector("#trainingInput"),
  sleepHours: document.querySelector("#sleepInput"),
  calories: document.querySelector("#caloriesInput"),
  vegetables: document.querySelector("#vegetablesInput"),
  fruit: document.querySelector("#fruitInput"),
  nuts: document.querySelector("#nutsInput"),
  fastingDay: document.querySelector("#fastingInput"),
  proteinHit: document.querySelector("#proteinInput"),
  workHours: document.querySelector("#workHoursInput"),
  deepWorkHours: document.querySelector("#deepWorkInput"),
  scheduleControl: document.querySelector("#controlInput"),
  clientsChecked: document.querySelector("#clientsInput"),
  programsUpdated: document.querySelector("#programsInput"),
  coachTemplate: document.querySelector("#coachTemplateInput"),
  coachAsset: document.querySelector("#coachAssetInput"),
  readingMinutes: document.querySelector("#readingInput"),
  englishMinutes: document.querySelector("#englishInput"),
  aiTokens: document.querySelector("#tokensInput"),
  aiAssets: document.querySelector("#aiAssetsInput"),
  promptAssets: document.querySelector("#promptAssetsInput"),
  recoveryMinutes: document.querySelector("#recoveryInput"),
  desireCount: document.querySelector("#desireCountInput"),
  assetText: document.querySelector("#assetInput"),
  manualCu: document.querySelector("#manualCuInput"),
  debtUnits: document.querySelector("#debtInput"),
  tomorrowMove: document.querySelector("#tomorrowInput")
};

const ui = {
  todayLabel: document.querySelector("#todayLabel"),
  scoreLabel: document.querySelector("#scoreLabel"),
  scoreBig: document.querySelector("#scoreBig"),
  scoreRing: document.querySelector("#scoreRing"),
  scoreTitle: document.querySelector("#scoreTitle"),
  scoreCopy: document.querySelector("#scoreCopy"),
  gradeLabel: document.querySelector("#gradeLabel"),
  cuLabel: document.querySelector("#cuLabel"),
  debtLabel: document.querySelector("#debtLabel"),
  modeLabel: document.querySelector("#modeLabel"),
  todayActionsList: document.querySelector("#todayActionsList"),
  barList: document.querySelector("#barList"),
  assetJudgement: document.querySelector("#assetJudgement"),
  leverageJudgement: document.querySelector("#leverageJudgement"),
  specificJudgement: document.querySelector("#specificJudgement"),
  freedomJudgement: document.querySelector("#freedomJudgement"),
  actionList: document.querySelector("#actionList"),
  constraintList: document.querySelector("#constraintList"),
  promptOutput: document.querySelector("#promptOutput"),
  knowledgeList: document.querySelector("#knowledgeList"),
  historyList: document.querySelector("#historyList"),
  mealQualityOutput: document.querySelector("#mealQualityOutput"),
  energyOutput: document.querySelector("#energyOutput"),
  anxietyOutput: document.querySelector("#anxietyOutput"),
  sorenessOutput: document.querySelector("#sorenessOutput"),
  appetiteOutput: document.querySelector("#appetiteOutput"),
  controlOutput: document.querySelector("#controlOutput"),
  toast: document.querySelector("#toast")
};

const todayIso = new Date().toISOString().slice(0, 10);
fields.date.value = todayIso;
ui.todayLabel.textContent = todayIso;

function numberValue(name) {
  const value = Number(fields[name].value);
  return Number.isFinite(value) ? value : 0;
}

function textValue(name) {
  return fields[name].value.trim();
}

function dayMode() {
  return document.querySelector("input[name='dayMode']:checked")?.value || "steady";
}

function currentEntry() {
  return {
    date: fields.date.value || todayIso,
    mode: dayMode(),
    workDay: fields.workDay.checked,
    availableMinutes: numberValue("availableMinutes"),
    energy: numberValue("energy"),
    anxiety: numberValue("anxiety"),
    soreness: numberValue("soreness"),
    appetite: numberValue("appetite"),
    primaryDesire: textValue("primaryDesire"),
    fitnessAction: textValue("fitnessAction"),
    outputAction: textValue("outputAction"),
    readingAction: textValue("readingAction"),
    coachAction: textValue("coachAction"),
    mealQuality: numberValue("mealQuality"),
    trainingMinutes: numberValue("trainingMinutes"),
    sleepHours: numberValue("sleepHours"),
    calories: numberValue("calories"),
    vegetables: numberValue("vegetables"),
    fruit: numberValue("fruit"),
    nuts: numberValue("nuts"),
    fastingDay: fields.fastingDay.checked,
    proteinHit: fields.proteinHit.checked,
    workHours: numberValue("workHours"),
    deepWorkHours: numberValue("deepWorkHours"),
    scheduleControl: numberValue("scheduleControl"),
    clientsChecked: numberValue("clientsChecked"),
    programsUpdated: numberValue("programsUpdated"),
    coachTemplate: fields.coachTemplate.checked,
    coachAsset: textValue("coachAsset"),
    readingMinutes: numberValue("readingMinutes"),
    englishMinutes: numberValue("englishMinutes"),
    aiTokens: numberValue("aiTokens"),
    aiAssets: numberValue("aiAssets"),
    promptAssets: numberValue("promptAssets"),
    recoveryMinutes: numberValue("recoveryMinutes"),
    desireCount: numberValue("desireCount"),
    assetText: textValue("assetText"),
    manualCu: numberValue("manualCu"),
    debtUnits: numberValue("debtUnits"),
    tomorrowMove: textValue("tomorrowMove")
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function calculateCu(entry) {
  let cu = entry.manualCu;
  if (entry.assetText) cu += 2;
  if (entry.coachTemplate) cu += 2;
  if (entry.coachAsset) cu += 2;
  cu += clamp(entry.aiAssets, 0, 6) * 2;
  cu += clamp(entry.promptAssets, 0, 6) * 2;
  if (entry.readingMinutes >= 20) cu += 1;
  if (entry.englishMinutes >= 20) cu += 1;
  if (entry.fitnessAction || entry.outputAction || entry.readingAction || entry.coachAction) cu += 1;
  return Math.round(cu);
}

function calculateDebt(entry) {
  let debt = entry.debtUnits;
  if (!entry.primaryDesire) debt += 1;
  if (entry.desireCount > 3) debt += entry.desireCount - 3;
  if (entry.anxiety >= 7) debt += 2;
  if (entry.aiTokens > 8000 && entry.aiAssets + entry.promptAssets === 0) debt += 3;
  if (entry.sleepHours > 0 && entry.sleepHours < 5.5) debt += 3;
  if (!entry.fastingDay && entry.vegetables < 250) debt += 1;
  if (entry.recoveryMinutes < 20) debt += 1;
  return Math.round(debt);
}

function calculate(entry) {
  const sleepScore = clamp((entry.sleepHours / 7.5) * 6, 0, 6);
  const sorenessAdjustment = entry.soreness >= 8 ? 2 : 0;
  const trainingScore = entry.soreness >= 8
    ? clamp((entry.recoveryMinutes / 45) * 4, 0, 4)
    : clamp((entry.trainingMinutes / 45) * 4, 0, 4);
  const vegetableScore = clamp((entry.vegetables / 350) * 4, 0, 4);
  const fruitScore = entry.fastingDay ? 2 : clamp((entry.fruit / 350) * 3, 0, 3);
  const proteinScore = entry.proteinHit ? 3 : 0;
  const caloriesScore = entry.fastingDay
    ? (entry.calories > 0 && entry.calories <= 1300 ? 2 : 1)
    : (entry.calories >= 1400 ? 2 : 0);
  const nutsScore = clamp((entry.nuts / 50) * 1.5, 0, 1.5);
  const nutritionFeelScore = clamp(entry.mealQuality / 10, 0, 1.5);
  const foundation = clamp(
    sleepScore + trainingScore + vegetableScore + fruitScore + proteinScore + caloriesScore + nutsScore + nutritionFeelScore + sorenessAdjustment,
    0,
    25
  );

  const clientScore = clamp(entry.clientsChecked * 1.2, 0, 6);
  const programScore = clamp(entry.programsUpdated * 2, 0, 5);
  const deepRatio = entry.workHours > 0 ? entry.deepWorkHours / entry.workHours : 0;
  const deepWorkScore = clamp(deepRatio * 4, 0, 4);
  const templateScore = entry.coachTemplate ? 3 : 0;
  const coachAssetScore = entry.coachAsset ? 2 : 0;
  const coachWork = clamp(clientScore + programScore + deepWorkScore + templateScore + coachAssetScore, 0, 20);

  const reading = clamp((entry.readingMinutes / 45) * 6, 0, 6);
  const english = clamp((entry.englishMinutes / 30) * 5, 0, 5);
  const cardBonus = entry.readingAction || entry.assetText ? 4 : 0;
  const learning = clamp(reading + english + cardBonus, 0, 15);

  const aiOutputScore = clamp(entry.aiAssets * 5 + entry.promptAssets * 4, 0, 14);
  const tokenRoiScore = entry.aiTokens > 0
    ? clamp(((entry.aiAssets + entry.promptAssets) / (entry.aiTokens / 6000 || 1)) * 3, 0, 4)
    : 0;
  const aiGoalScore = entry.outputAction ? 2 : 0;
  let ai = clamp(aiOutputScore + tokenRoiScore + aiGoalScore, 0, 20);
  if (entry.aiTokens > 0 && entry.aiAssets + entry.promptAssets === 0) ai = Math.min(ai, 8);

  const recoveryBase = entry.recoveryMinutes >= 30 && entry.recoveryMinutes <= 120
    ? 5
    : clamp((entry.recoveryMinutes / 45) * 4, 0, 4);
  const energyBalance = entry.energy <= 3 ? clamp(entry.recoveryMinutes / 20, 0, 3) : 2;
  const entertainment = clamp(recoveryBase + energyBalance, 0, 10);

  const calendar = clamp(entry.scheduleControl * 0.7, 0, 7);
  const desireCalm = entry.desireCount <= 1 ? 3 : entry.desireCount <= 3 ? 1.5 : 0;
  const anxietyAdjustment = entry.anxiety >= 7 ? -2 : entry.anxiety <= 4 ? 1 : 0;
  const freedom = clamp(calendar + desireCalm + anxietyAdjustment, 0, 10);

  const cu = calculateCu(entry);
  const debt = calculateDebt(entry);
  let total = foundation + coachWork + learning + ai + entertainment + freedom - debt;
  if (entry.sleepHours > 0 && entry.sleepHours < 5.5) total = Math.min(total, 75);
  if (entry.anxiety >= 8) total = Math.min(total, 72);
  total = Math.round(clamp(total, 0, 100));

  return {
    total,
    cu,
    debt,
    parts: [
      { key: "身体", value: foundation, max: 25, color: "var(--teal)" },
      { key: "教练", value: coachWork, max: 20, color: "var(--blue)" },
      { key: "阅读", value: learning, max: 15, color: "var(--green)" },
      { key: "AI", value: ai, max: 20, color: "var(--gold)" },
      { key: "恢复", value: entertainment, max: 10, color: "var(--rose)" },
      { key: "自由", value: freedom, max: 10, color: "var(--ink)" }
    ]
  };
}

function grade(score) {
  if (score >= 85) return ["A", "高复利日", "今天的行动有资产、有杠杆，也没有明显牺牲自由。"];
  if (score >= 70) return ["B", "有效积累日", "今天在变好，下一步是减少一点消耗，把产出封装成资产。"];
  if (score >= 55) return ["C", "可修正日", "今天有行动，但复利密度不够，优先补一个可复用产物。"];
  return ["D", "止损重启日", "今天先保底盘，不要加更多目标。"];
}

function navalJudgement(entry, result) {
  const assetJudgement = result.cu >= 8 ? "资产日" : result.cu >= 3 ? "有沉淀" : "偏消耗";
  const leverageBits = [];
  if (entry.aiAssets || entry.promptAssets) leverageBits.push("代码/AI");
  if (entry.assetText || entry.coachAsset) leverageBits.push("媒体/知识资产");
  if (entry.clientsChecked || entry.programsUpdated) leverageBits.push("劳动力");
  const leverageJudgement = leverageBits.length ? leverageBits.join(" + ") : "未使用";
  const specificJudgement = entry.coachAsset || entry.assetText.length > 18 || entry.englishMinutes >= 30 || entry.aiAssets >= 2
    ? "出现特定知识信号"
    : "还停在执行层";
  const freedomJudgement = entry.scheduleControl >= 7 && entry.desireCount <= 2
    ? "日历由你控制"
    : entry.scheduleControl >= 4
      ? "部分自由"
      : "被日程牵着走";
  return {
    assetJudgement,
    leverageJudgement,
    specificJudgement,
    freedomJudgement,
    grade: grade(result.total)
  };
}

function actionItems(entry) {
  const items = [
    entry.outputAction || "AI：把今天最重要的对话沉淀成 prompt / SOP / 网页功能",
    entry.fitnessAction || (entry.soreness >= 8 ? "训练营养：恢复优先，散步 10 分钟 + 蔬菜 350g" : "训练营养：训练 45 分钟 + 蔬菜 350g + 蛋白质底线"),
    entry.readingAction || "阅读：20 分钟英文阅读，留下一张卡",
    entry.coachAction || "教学：把一个上课讲法或客户反馈沉淀成模板"
  ];
  return items.slice(0, 4);
}

function nextActions(entry, result) {
  if (entry.anxiety >= 7) {
    return [
      "进入恢复协议：吃一顿像样的饭、走路 10 分钟、洗澡、睡觉。",
      "今天不新增规划，只写下明天唯一下一步。",
      "把同时想做的大事删到 1 个，其他放进以后再说。"
    ];
  }
  const actions = [];
  if (!entry.assetText && !entry.coachAsset) actions.push("把今天最有价值的一件事封装成一条笔记、SOP 或客户案例。");
  if (entry.aiTokens > 8000 && entry.aiAssets + entry.promptAssets < 2) actions.push("停止继续烧 Token，先把本轮对话收束成一个可复用 prompt。");
  if (entry.workDay && entry.workHours >= 5 && entry.deepWorkHours < 1.5) actions.push("明天优先保护 90 分钟高质量专注，不先打开碎任务。");
  if (entry.mealQuality < 7) actions.push("今天饮食只补一个最低动作：先保证一份蛋白质和一份蔬菜。");
  if (entry.englishMinutes < 20) actions.push("英文阅读做 20 分钟即可，不追求量，留下一张卡。");
  if (!actions.length) actions.push("把今天的资产同步进 Obsidian，然后选出明天唯一复利动作。");
  return actions.slice(0, 3);
}

function constraints(entry) {
  const rules = [
    "每天最多三个必须完成项，超过三个就删。",
    "Token 不是努力，只有变成可复用资产才算杠杆。",
    "娱乐不是罪，娱乐后更累才会变成明日负担。"
  ];
  if (entry.desireCount > 3) rules.unshift("同时想做的大事超过 3 个时，不新增项目，只删目标。");
  if (entry.sleepHours > 0 && entry.sleepHours < 5.5) rules.unshift("睡眠少于 5.5 小时，总分封顶，明天先修底盘。");
  if (entry.workDay) rules.push("工作日默认 6 小时，不用更多时长证明自己。");
  return rules.slice(0, 4);
}

function markdownFor(entry, result) {
  const [letter, title] = grade(result.total);
  return `# 每日人生复利记录 - ${entry.date}

## 今日判定

- 今日模式：${modeLabels[entry.mode]}
- 复利分：${result.total}
- 等级：${letter} / ${title}
- 新增 CU：${result.cu}
- 明日负担：${result.debt}
- 今日主欲望：${entry.primaryDesire || "未填写"}

## 今日三件事

1. ${actionItems(entry)[0]}
2. ${actionItems(entry)[1]}
3. ${actionItems(entry)[2]}

## 今日行动数据

| 模块 | 数据 |
|---|---|
| 状态 | 可用 ${entry.availableMinutes} 分钟；精力 ${entry.energy}/10；压力/焦虑 ${entry.anxiety}/10；酸痛 ${entry.soreness}/10；食欲 ${entry.appetite}/10 |
| 运动营养/健身 | 睡眠 ${entry.sleepHours} 小时；训练 ${entry.trainingMinutes} 分钟；热量 ${entry.calories} kcal；蔬菜 ${entry.vegetables}g；水果 ${entry.fruit}g；坚果 ${entry.nuts}g；断食日 ${entry.fastingDay ? "是" : "否"}；蛋白质底线 ${entry.proteinHit ? "完成" : "未完成"} |
| 教练教学/工作沉淀 | 工作 ${entry.workHours} 小时；高质量专注 ${entry.deepWorkHours} 小时；客户跟进 ${entry.clientsChecked}；方案更新 ${entry.programsUpdated}；模板 ${entry.coachTemplate ? "已沉淀" : "未沉淀"} |
| 阅读英文 | 阅读 ${entry.readingMinutes} 分钟；英文 ${entry.englishMinutes} 分钟 |
| AI 杠杆 | Token ${entry.aiTokens}；AI 资产 ${entry.aiAssets}；Prompt/SOP ${entry.promptAssets} |
| 娱乐恢复 | 恢复 ${entry.recoveryMinutes} 分钟；同时想做的大事 ${entry.desireCount} 个 |

## 今日资产沉淀

${entry.assetText || entry.coachAsset || "无"}

## 明日唯一复利动作

${entry.tomorrowMove || "未填写"}

## 建议沉淀到笔记库

- [[人生复利系统总入口]]
- [[人生复利周报模板]]
- [[营养网站产品计划：每日饮食决策工具]]
- [[AI 协作提示词 SOP]]
`;
}

function promptFor(entry, result) {
  const [letter, title] = grade(result.total);
  return `你是我的“每日人生复利系统”复盘助手。

请基于 Naval Ravikant 的复利、杠杆、特定知识、时间自由、欲望管理框架，同时结合行为科学、营养健康、训练恢复、知识管理、健身教练工作流和 AI 协作视角，诊断我今天的行动。

重要边界：
1. 不要鸡汤，不要泛泛鼓励。
2. 先拆事实、推测、判断、建议。
3. 如果我的数据不足，要标出不确定处。
4. 不做疾病诊断，不替代医生、注册营养师或专业治疗。
5. 输出要能直接进入 Obsidian、Notion 或任意笔记软件，优先沉淀成卡片、SOP、案例、数据库、prompt 或工具。
6. 焦虑 >= 7 时，只给恢复优先方案，不做宏大规划。

我的笔记库底层规则：
- 稳定规则放在 prompt。
- 大体量材料、案例、语料放知识库。
- 今日行动要回答：我今天做的事，会不会在未来继续替我工作？

今日数据：
- 日期：${entry.date}
- 今日模式：${modeLabels[entry.mode]}
- 当前网页评分：${result.total} / ${letter} ${title}
- 今日新增 CU：${result.cu}
- 今日新增明日负担：${result.debt}
- 主欲望：${entry.primaryDesire || "未填写"}
- 今日主线动作：${actionItems(entry).join("；")}
- 状态：可用 ${entry.availableMinutes} 分钟，精力 ${entry.energy}/10，压力/焦虑 ${entry.anxiety}/10，酸痛 ${entry.soreness}/10，食欲 ${entry.appetite}/10
- 运动营养/健身：睡眠 ${entry.sleepHours} 小时，训练 ${entry.trainingMinutes} 分钟，热量 ${entry.calories} kcal，蔬菜 ${entry.vegetables}g，水果 ${entry.fruit}g，坚果 ${entry.nuts}g，断食日 ${entry.fastingDay ? "是" : "否"}，主观饮食感受 ${entry.mealQuality}/10，蛋白质底线 ${entry.proteinHit ? "完成" : "未完成"}
- 教练教学/工作沉淀：工作 ${entry.workHours} 小时，高质量专注 ${entry.deepWorkHours} 小时，日程自主感 ${entry.scheduleControl}/10，学员/客户跟进 ${entry.clientsChecked}，方案更新 ${entry.programsUpdated}，教练模板 ${entry.coachTemplate ? "已沉淀" : "未沉淀"}，课堂反馈/案例 ${entry.coachAsset || "无"}
- 阅读与英文：阅读 ${entry.readingMinutes} 分钟，英文阅读 ${entry.englishMinutes} 分钟
- AI：烧了 ${entry.aiTokens} Tokens，产出 AI 资产 ${entry.aiAssets} 个，Prompt/SOP ${entry.promptAssets} 个
- 娱乐恢复：${entry.recoveryMinutes} 分钟，同时想做的大事 ${entry.desireCount} 个
- 今日资产沉淀：${entry.assetText || "无"}
- 明日唯一复利动作：${entry.tomorrowMove || "未填写"}

请按这个格式输出：

## 1. 事实
只列今天已经发生的客观数据。

## 2. Naval 判断
判断资产/消耗、杠杆类型、特定知识信号、日历自由度、欲望成本。

## 3. 学科视角
从营养健康、训练恢复、行为科学、知识管理、健身教练工作流、AI 协作六个角度，各给一个最关键判断。

## 4. 资产化建议
告诉我今天最应该沉淀成什么：概念卡、SOP、案例、prompt、数据库、网页功能或客户交付模板。

## 5. 明日唯一复利动作
只给 1 个动作，低摩擦、能完成、能复利。

## 6. 笔记库入库草稿
生成一段可以直接粘贴进 Obsidian、Notion 或任意 Markdown 笔记软件的内容。`;
}

function renderBars(result) {
  ui.barList.innerHTML = result.parts.map((part) => {
    const width = Math.round((part.value / part.max) * 100);
    return `<div class="bar-row">
      <span>${part.key}</span>
      <div class="bar-track"><div class="bar-fill" style="--width:${width}%;--bar-color:${part.color}"></div></div>
      <span>${Math.round(part.value)}/${part.max}</span>
    </div>`;
  }).join("");
}

function renderList(target, items) {
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderKnowledge() {
  ui.knowledgeList.innerHTML = knowledgeLinks.map((item) => `<article class="knowledge-item">
    <strong>${item.title}</strong>
    <p>${item.note}</p>
    <p>${item.source}</p>
  </article>`).join("");
}

function entries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setEntries(nextEntries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries.slice(0, 20)));
}

function renderHistory() {
  const saved = entries();
  if (!saved.length) {
    ui.historyList.innerHTML = `<article class="history-item"><strong>暂无记录</strong><p>保存今日后会显示在这里。</p><span></span></article>`;
    return;
  }
  ui.historyList.innerHTML = saved.map((item) => `<article class="history-item">
    <strong>${item.date}</strong>
    <p>${modeLabels[item.mode] || "稳态日"} / CU ${item.cu} / 负担 ${item.debt}<br>${item.primaryDesire || "未填写主线"}<br>${item.assetText || item.coachAsset || "无资产沉淀"}</p>
    <span class="mini-score">${item.score}</span>
  </article>`).join("");
}

function render() {
  ui.mealQualityOutput.textContent = fields.mealQuality.value;
  ui.energyOutput.textContent = fields.energy.value;
  ui.anxietyOutput.textContent = fields.anxiety.value;
  ui.sorenessOutput.textContent = fields.soreness.value;
  ui.appetiteOutput.textContent = fields.appetite.value;
  ui.controlOutput.textContent = fields.scheduleControl.value;

  const entry = currentEntry();
  const result = calculate(entry);
  const judgement = navalJudgement(entry, result);
  const [letter, title, copy] = judgement.grade;

  ui.todayLabel.textContent = entry.date;
  ui.scoreLabel.textContent = result.total;
  ui.scoreBig.textContent = result.total;
  ui.scoreRing.style.setProperty("--score", result.total);
  ui.scoreTitle.textContent = title;
  ui.scoreCopy.textContent = copy;
  ui.gradeLabel.textContent = `${letter}  ${title}`;
  ui.cuLabel.textContent = result.cu;
  ui.debtLabel.textContent = result.debt;
  ui.modeLabel.textContent = modeLabels[entry.mode];
  ui.assetJudgement.textContent = judgement.assetJudgement;
  ui.leverageJudgement.textContent = judgement.leverageJudgement;
  ui.specificJudgement.textContent = judgement.specificJudgement;
  ui.freedomJudgement.textContent = judgement.freedomJudgement;
  ui.todayActionsList.innerHTML = actionItems(entry).map((item) => `<li>${item}</li>`).join("");
  ui.promptOutput.value = promptFor(entry, result);

  renderBars(result);
  renderList(ui.actionList, nextActions(entry, result));
  renderList(ui.constraintList, constraints(entry));
}

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add("show");
  window.setTimeout(() => ui.toast.classList.remove("show"), 1800);
}

async function copyText(text, okMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(okMessage);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    showToast(okMessage);
  }
}

document.querySelector("#dailyForm").addEventListener("input", render);

document.querySelector("#dailyForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const entry = currentEntry();
  const result = calculate(entry);
  const nextEntries = [
    { ...entry, score: result.total, cu: result.cu, debt: result.debt, savedAt: new Date().toISOString() },
    ...entries().filter((item) => item.date !== entry.date)
  ];
  setEntries(nextEntries);
  renderHistory();
  showToast("今日已保存到浏览器本地记录");
});

document.querySelector("#resetButton").addEventListener("click", () => {
  document.querySelector("#dailyForm").reset();
  fields.date.value = todayIso;
  document.querySelector("input[name='dayMode'][value='steady']").checked = true;
  fields.availableMinutes.value = 180;
  fields.energy.value = 6;
  fields.anxiety.value = 4;
  fields.soreness.value = 4;
  fields.appetite.value = 5;
  fields.mealQuality.value = 6;
  fields.trainingMinutes.value = 45;
  fields.sleepHours.value = 7;
  fields.calories.value = 2200;
  fields.vegetables.value = 350;
  fields.fruit.value = 350;
  fields.nuts.value = 0;
  fields.fastingDay.checked = false;
  fields.workHours.value = 6;
  fields.deepWorkHours.value = 2;
  fields.scheduleControl.value = 6;
  fields.clientsChecked.value = 0;
  fields.programsUpdated.value = 0;
  fields.readingMinutes.value = 30;
  fields.englishMinutes.value = 20;
  fields.aiTokens.value = 6000;
  fields.aiAssets.value = 1;
  fields.promptAssets.value = 1;
  fields.recoveryMinutes.value = 45;
  fields.desireCount.value = 2;
  fields.manualCu.value = 0;
  fields.debtUnits.value = 0;
  render();
});

document.querySelector("#copyPromptButton").addEventListener("click", () => {
  copyText(ui.promptOutput.value, "Prompt 已复制");
});

document.querySelector("#copyMarkdownButton").addEventListener("click", () => {
  const entry = currentEntry();
  copyText(markdownFor(entry, calculate(entry)), "Markdown 已复制");
});

document.querySelector("#copyPathsButton").addEventListener("click", () => {
  copyText(knowledgeLinks.map((item) => `${item.title}\n${item.source}\n${item.note}`).join("\n\n"), "方法说明已复制");
});

document.querySelector("#clearHistoryButton").addEventListener("click", () => {
  setEntries([]);
  renderHistory();
  showToast("本页记录已清空");
});

renderKnowledge();
renderHistory();
render();
