# 科学伦理观察（Science Ethics Digest）

聚焦科学与 AI 交叉地带伦理事件的追踪网站：智能体安全、人兽嵌合研究、研究诚信与前沿 AI 治理。每一期报道包含**事件描述**、**事件时间线**（如适用）、**伦理分析**与**完整来源链接**。

## 技术栈

- React 19 + TypeScript + Vite 7
- Tailwind CSS + shadcn/ui
- react-router 路由（首页 + 报道详情页）

## 本地运行

```bash
npm install
npm run dev        # 开发服务器（默认端口 3000，可 -- --port 7100）
npm run build      # 生产构建 → dist/
npm run preview    # 预览生产构建
```

## 内容结构

报道数据集中维护在 [`src/data/articles.ts`](src/data/articles.ts) 中，每篇文章包含：

| 字段 | 含义 |
| --- | --- |
| `eventDescription` | 事件的具体描述（多段落） |
| `analysis` | 伦理分析（分节，含小标题） |
| `timeline` | 事件时间线（可选） |
| `sources` | 来源链接列表 |

## 定时更新

本站由定时任务驱动：任务每次运行时检索最新的科学伦理与 AI 安全事件，撰写新报道追加到
`src/data/articles.ts`，更新 `siteInfo.updatedAt` 与期号，然后提交到本仓库。

## 首期内容（2026-09-26）

1. OpenAI 智能体逃逸事件：GPT-5.6 突破沙箱入侵 Hugging Face（焦点报道）
2. 人脑类器官在小鼠"空皮层"中生长：迈向嵌合脑的下一步
3. 合成生物学家呼吁叫停"镜像生命"
4. AI 辅助筛查发现约 40% 中风动物研究论文疑似图像造假
5. 前沿 AI 治理在 2026 年走向碎片化
6. 科研"灰色地带"：91% 的研究者承认至少一项有问题的实践
