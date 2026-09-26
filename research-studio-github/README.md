# 研析台 Research Studio

一个本地优先的中文研究分析工作台，面向调研比赛、学术汇报和答辩准备。应用只有一个前端 HTML 文件，使用原生 JavaScript 和 CDN 库完成数据导入、统计分析、可视化、项目管理与成果导出。

当前版本：`0.5.0`

## 快速开始

### 本地打开

直接打开 `research-studio.html`，或打开仓库入口 `index.html`。首次使用建议先点击“载入演示数据”，确认流程和图表都能正常运行。

### GitHub Pages

1. 将仓库推送到 GitHub。
2. 在仓库的 **Settings → Pages** 中选择 `Deploy from a branch`。
3. 选择默认分支和 `/ (root)` 目录并保存。
4. 访问 GitHub Pages 地址，入口会自动打开 `research-studio.html`。

应用依赖 CDN，因此首次加载需要联网。导入的数据、分析结果和项目配置仍只保存在当前浏览器的 `localStorage` 中，不会上传到本项目或任何业务服务器。

## 功能范围

- 多项目：创建、切换、搜索、状态筛选、备注、负责人、标签、克隆、项目对比、项目 JSON 备份。
- 全局学习资料库：上传 PDF / PPTX，提取报告结构、分析方法、结论模板、PPT 布局和配色，并在项目间共享。
- 11 步流程：选题、数据上传、数据清洗、描述统计、假设检验、量表质量、多元建模、文本挖掘、竞品分析、报告生成、PPT 与答辩。
- 数据分析：缺失与异常诊断、质量评分、频数、均值、标准差、偏度、峰度、t 检验、ANOVA、卡方、Pearson / Spearman、Cronbach's α、KMO / Bartlett、EFA 快速筛查、OLS、K-means、PCA、RFM。
- 文本与竞品：高频词、词典情感、主题线索、雷达图、定位图、加权竞争力、SWOT 和策略建议。
- 成果输出：CSV、XLSX、DOCX、PDF、PPTX、PNG、JSON、过程说明书、数据字典、团队日志、答辩准备包 ZIP。
- 协作与追溯：步骤备注、状态、操作人、团队贡献日志、数据版本快照和回退。
- 可靠性：数据健康分、导入前提诊断、统计前提检查、回归 VIF / 残差诊断、项目只读锁和日志筛选。
- 安全与离线：IndexedDB 镜像、容量提示、AES-GCM 加密备份、PWA Service Worker 缓存和依赖自检。
- 问卷与报告：量表库、APA 引用、跳题规则、反向计分、比赛/学术/商业报告模板、摘要关键词、局限与参考文献。

## 依赖与兼容性

当前版本通过 CDN 引入以下库：PapaParse、jStat、Chart.js、simple-statistics、jsPDF、docx、PptxGenJS、pdf.js、JSZip、pdf-lib、FileSaver、QRCode、html2canvas、Lucide。

建议使用最新版 Chrome、Edge 或 Firefox。浏览器需要允许 JavaScript、文件读取和下载。PDF / PPTX 学习、DOCX / PDF / PPTX 导出和网页抓取属于浏览器能力，受网络、CORS、文件大小和第三方网站条款影响。

## 合规边界

- 网页抓取仅针对合法公开且允许跨域访问的内容。
- 不绕过登录、验证码、付费墙、robots.txt 或平台反爬机制。
- 不上传个人信息或问卷原始数据到第三方服务器。
- 情感、主题、EFA 和 SEM 相关功能是前端辅助分析或快速筛查，不替代正式统计软件、人工编码和研究者判断。
- 结论应结合抽样设计、变量操作化、效应量和研究边界解释，不应把横截面相关直接表述为因果。

## 数据持久化

应用使用两个本地存储键：

- `researchStudioAppData`：项目、知识库、日志、版本和当前项目。
- `researchStudioState`：兼容早期单项目版本的迁移备份。

IndexedDB 使用数据库 `ResearchStudioDB` 保存 `latest` 镜像，用于 localStorage 容量不足或恢复场景。加密备份使用浏览器 Web Crypto 的 PBKDF2 + AES-GCM，密码不会写入任何存储。

清理浏览器站点数据会删除本地项目。正式演示或更换设备前，请从“项目管理”和“全局学习资料库”导出 JSON 备份。

## 开发与验证

这是一个无构建步骤的单文件应用。修改后可直接在浏览器打开，也可以使用任意静态服务器预览：

```bash
python -m http.server 8000
```

发布前建议检查：

- 首次引导和演示数据流程。
- 新建两个项目后分别修改数据，确认互不串数据。
- 导入 CSV / XLSX、运行清洗和统计分析。
- 导出 DOCX、PDF、PPTX、XLSX 和答辩准备包。
- 清空 localStorage 后重新打开，确认首次引导出现。
- 390px 移动端无横向溢出。
- `npm run check` 静态检查和 `npm run test:smoke` 浏览器 smoke test。

## 许可

本项目采用 MIT License。第三方 CDN 库依照各自许可证使用。
