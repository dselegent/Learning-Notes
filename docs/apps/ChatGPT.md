---
article: false
title: ChatGPT
icon: creative
order: 2
---

ChatGPT 是由 OpenAI 发布的聊天机器人模型，它不仅可以用于对话聊天，还能在专业领域提供有效的建议。[lenxc/ChatGPT](https://github.com/lencx/ChatGPT/releases) 提供了一个可以快速插入提示词的客户端，推荐使用。[Playground](https://beta.openai.com/playground) 是调用 OpenAI API 的文字生成工具，它比 ChatGPT 更灵活，可以容纳更长的输入（4000 字符），并且可以自定义调整模型和生成参数，但它的生成效果一般要弱于 ChatGPT，仅适合深度研究用户调试使用。

我根据领域类别制作了 ChatGPT 功能表，会随 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) 同步更新。在下方页面中找到你需要的功能，点击括号中的链接，复制引用区的灰色文字，最后将其粘贴到 ChatGPT 即可得到指定领域的建议输出。在同一个对话中，提示词只需输入一次。

使用 Tips：

- 若要使用中文回复，请在倒数第二句插入条件 `Reply in Chinese.`。
- 为了保持描述的精确性，提示词请使用英文，而最后一句的定制条件可以使用任何语言，包括中文。
- 后续回答中的定制条件可以使用引号 `""` 框选，以防止被误认为是新的提示词。

## 文字

### 写作

- 脱口秀（[Stand-up Comedian](https://github.com/f/awesome-chatgpt-prompts#act-as-a-stand-up-comedian)）：输入一个话题，输出基于该话题的幽默脱口秀，会尽量融入日常生活。
- 讲故事（[Storyteller](https://github.com/f/awesome-chatgpt-prompts#act-as-a-storyteller)）：输入一个主题和目标受众，输出与之相关的故事。
- 编剧（[Screenwriter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-screenwriter)）：根据主题创作一个剧本，需包含故事背景、人物和对话。
- 小说家（[Novelist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-novelist)）：根据故事类型来输出小说，比如奇幻、浪漫、历史等。
- 诗人（[Poet](https://github.com/f/awesome-chatgpt-prompts#act-as-a-poet)）：根据话题或主题输出诗句。
- 新闻记者（[Journalist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-journalist)）：引用已有的数据资料，用新闻的写作风格输出主题文章。
- 论文（[Academician](https://github.com/f/awesome-chatgpt-prompts#act-as-an-academician)，[Essay Writer](https://github.com/f/awesome-chatgpt-prompts#act-as-an-essay-writer)）：根据主题输出内容翔实有信服力的论文。

### 点评/评鉴

- 评论家（[Commentariat](https://github.com/f/awesome-chatgpt-prompts#act-as-a-commentariat)）
- 电影评论（[Movie Critic](https://github.com/f/awesome-chatgpt-prompts#act-as-a-movie-critic)，[Film Critic](https://github.com/f/awesome-chatgpt-prompts#act-as-a-film-critic)）
- 科技博主（[Tech Writer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-tech-writer)）
- 科技评论（[Tech Reviewer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-tech-reviewer)）：评价技术硬件
- 美食评论（[Food Critic](https://github.com/f/awesome-chatgpt-prompts#act-as-a-food-critic)）
- 期刊评审（[Journal Reviewer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-journal-reviewer)）

### 写作辅助

- 文章标题生成器（[Title Generator for written pieces](https://github.com/f/awesome-chatgpt-prompts#act-as-a-title-generator-for-written-pieces)）：我写的提示，根据文章内容生成相应语言的标题。
- 写作改进助理：我写的提示，用于重构文字段落，改善句式。但由于 ChatGPT 对中文回复的限制，大段文字的改写需要通过 OpenAI Playground 来完成，因此暂时没有发布到 Awesome ChatGPT Prompts，有需要的可以复制使用。
  > Please act as a writing improvement assistant. Your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text I provide, and to break down long sentences, reduce repetition, and provide suggestions for improvement. In your responses, please only provide the corrected version of the text and do not include explanations. Reply in the language type of the text. My first text is: ""
- 同义词（[Synonym finder](https://github.com/f/awesome-chatgpt-prompts#act-as-a-synonym-finder)）
- 格言作者（[Gnomist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-gnomist)）
- 箴言书（[Aphorism Book](https://github.com/f/awesome-chatgpt-prompts#act-as-an-aphorism-book)）：按要求输出各类名人名言。
- 疯子（[Lunatic](https://github.com/f/awesome-chatgpt-prompts#act-as-a-lunatic)）：随机生成毫无逻辑的句子
- 抄袭检查器（[Plagiarism Checker](https://github.com/f/awesome-chatgpt-prompts#act-as-a-plagiarism-checker)）
- 写作建议（[AI Writing Tutor](https://github.com/f/awesome-chatgpt-prompts#act-as-an-ai-writing-tutor)）：提供写作改进方案和建议，但并不能直接帮你修改文档。（个人感觉只适合老师使用）

## 生活

- 自助百科（[Self-Help Book](https://github.com/f/awesome-chatgpt-prompts#act-as-a-self-help-book)）
- 应急反应专家（[Emergency Response Professional](https://github.com/f/awesome-chatgpt-prompts#act-as-an-emergency-response-professional)）：对交通和生活中的应急时间提供建议。
- 购物建议（[Personal Shopper](https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-shopper)）
- 职业顾问（[Career Counselor](https://github.com/f/awesome-chatgpt-prompts#act-as-a-career-counselor)）
- 生活习惯（[Life Coach 1](https://github.com/f/awesome-chatgpt-prompts#act-as-a-life-coach-1)）：输入一本非小说类书籍的标题和作者，以最好理解的方式输出该书的核心原则。另外，给出一个可行的步骤清单，以及如何将这些原则应用到日常生活中。

### 趣味知识

- 解梦（[Dream Interpreter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-dream-interpreter)）：对你描述的梦境进行解读。
- 占星家（[Astrologer](https://github.com/f/awesome-chatgpt-prompts#act-as-an-astrologer)）
- 角色扮演-电影/书籍/任何东西（['Character' from 'Movie/Book/Anything'](https://github.com/f/awesome-chatgpt-prompts#act-as-character-from-moviebookanything)）
  - 海绵宝宝的神奇海螺（[Spongebob's Magic Conch Shell](https://github.com/f/awesome-chatgpt-prompts#act-as-spongebobs-magic-conch-shell)）
- 谬误发现者（[Fallacy Finder](https://github.com/f/awesome-chatgpt-prompts#act-as-a-fallacy-finder)）：发现语言中的逻辑漏洞，比如名人推荐的洗发水为什么不一定可信。
- DIY 专家（[DIY Expert](https://github.com/f/awesome-chatgpt-prompts#act-as-a-diy-expert)）：DIY 家居、手工品
- 魔术师（[Magician](https://github.com/f/awesome-chatgpt-prompts#act-as-a-magician)）
- 艺术顾问（[Artist Advisor](https://github.com/f/awesome-chatgpt-prompts#act-as-an-artist-advisor)）：为你的画画、作曲、照相等提供意见。

### 生活顾问

- 瑜伽师（[Yogi](https://github.com/f/awesome-chatgpt-prompts#act-as-a-yogi)）
- 健身教练（[Personal Trainer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-trainer)）：输入身高、体重、年龄等维度来指定健身方案。
- 营养师（[Dietitian](https://github.com/f/awesome-chatgpt-prompts#act-as-a-dietitian)）
- 私人厨师（[Personal Chef](https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-chef)）
- 厨师（[Chef](https://github.com/f/awesome-chatgpt-prompts#act-as-a-chef)）
- 保姆（[Babysitter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-babysitter)）
- 化妆师（[Makeup Artist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-makeup-artist)）
- 造型师（[Personal Stylist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-stylist)）

## 自我提升

### 辩论/演讲

- 辩手（[Debater](https://github.com/f/awesome-chatgpt-prompts#act-as-a-debater)）
- 辩论教练（[Debate Coach](https://github.com/f/awesome-chatgpt-prompts#act-as-a-debate-coach)）
- 演说家（[Elocutionist](https://github.com/f/awesome-chatgpt-prompts#act-as-an-elocutionist)）
- 励志演讲者（[Motivational Speaker](https://github.com/f/awesome-chatgpt-prompts#act-as-a-motivational-speaker)）
- 励志教练（[Motivational Coach](https://github.com/f/awesome-chatgpt-prompts#act-as-a-motivational-coach)）
- 公共演讲教练（[Public Speaking Coach](https://github.com/f/awesome-chatgpt-prompts#act-as-a-public-speaking-coach)）

### 心理/社交

- 生活教练（[Life Coach](https://github.com/f/awesome-chatgpt-prompts#act-as-a-life-coach)）：输入你的现状和目标，输出达到目标的计划和建议。
- 关系教练（[Relationship Coach](https://github.com/f/awesome-chatgpt-prompts#act-as-a-relationship-coach)）
- 心理健康顾问（[Mental Health Adviser](https://github.com/f/awesome-chatgpt-prompts#act-as-a-mental-health-adviser)）
- 心理学家（[Psychologist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-psychologist)）
- 情绪操控（[Gaslighter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-gaslighter)）：煤气灯效应，情感控制方总会让被操纵方产生焦虑不安的感觉，质疑自己总是错的一方，或者为什么对方明明很好很优秀，自己却总是开心不起来。

### 哲学

- 哲学教师（[Philosophy Teacher](https://github.com/f/awesome-chatgpt-prompts#act-as-a-philosophy-teacher)）
- 哲学家（[Philosopher](https://github.com/f/awesome-chatgpt-prompts#act-as-a-philosopher)）
- 苏格拉底（[Socrat](https://github.com/f/awesome-chatgpt-prompts#act-as-a-socrat)）
- 苏格拉底式论点（[Socratic Method prompt](https://github.com/f/awesome-chatgpt-prompts#act-as-a-socratic-method-prompt)）

### 老师/学术

- 数学老师（[Math Teacher](https://github.com/f/awesome-chatgpt-prompts#act-as-a-math-teacher)）
- 数学家（[Mathematician](https://github.com/f/awesome-chatgpt-prompts#act-as-a-mathematician)）
- 统计学家（[Statistician](https://github.com/f/awesome-chatgpt-prompts#act-as-a-statistician)）
- 词汇学家（[Etymologist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-etymologist)）
- 历史学家（[Historian](https://github.com/f/awesome-chatgpt-prompts#act-as-a-historian)）
- 基础知识介绍（[Instructor in School](https://github.com/f/awesome-chatgpt-prompts#act-as-an-instructor-in-a-school)）
- 教案策划（[Educational Content Creator](https://github.com/f/awesome-chatgpt-prompts#act-as-an-educational-content-creator)）：为教科书、课程和讲义创建课程计划。

## IT/编程

### 程序员

虽然说是编程，但 ChatGPT 是按照要求给出编程步骤的建议或简单的样例代码，这些代码只能作为测试，仍然需要专业程序员来修改。

- 编程问题回复（[StackOverflow Post](https://github.com/f/awesome-chatgpt-prompts#act-as-a-stackoverflow-post)）：模拟编程社区来回答你的问题，并输出解决代码。如果你只想解决问题，这将是最实用的。
- 前端开发（[Senior Frontend Developer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-senior-frontend-developer)）：输出项目目标和依赖，输出前端项目代码。
- 界面/用户体验开发（[UX/UI Developer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-uxui-developer)，[Web Design Consultant](https://github.com/f/awesome-chatgpt-prompts#act-as-a-web-design-consultant)）：输入产品描述、项目目标和受众群体，输出界面设计建议，提高用户体验。
- 全栈程序员（[Fullstack Software Developer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-fullstack-software-developer)）：从前后端全面思考，输出部署策略。
- IT 架构师（[IT Architect](https://github.com/f/awesome-chatgpt-prompts#act-as-an-it-architect)）：从 IT 架构师角度，设计系统方案。
- 网络安全专家（[Cyber Security Specialist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-cyber-security-specialist)）：输入网络环境，输出网络安全建议。
- 软件测试（[Software Quality Assurance Tester](https://github.com/f/awesome-chatgpt-prompts#act-as-a-software-quality-assurance-tester)）：输出指定项目的测试清单。
- 深度学习（[Machine Learning Engineer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-machine-learning-engineer)）：解释深度学习方面的术语，提供项目算法建议。

### 编程工具

- 正则生成器（[Regex Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-regex-generator)）：根据要求生成正则表达式。
- 智能域名生成器（[Smart Domain Name Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-smart-domain-name-generator)）：输入公司名与项目描述，输出短但独特的域名建议，域名最长 7-8 个字母。
- Solr 搜索引擎（[Solr Search Engine](https://github.com/f/awesome-chatgpt-prompts#act-as-a-solr-search-engine)）
- 开发者数据（[Developer Relations consultant](https://github.com/f/awesome-chatgpt-prompts#act-as-a-developer-relations-consultant)）：整合项目在 GitHub、StackOverflow 和 Hacker News 上的相关数据，不适合国内项目，统计精度一般。

### 终端/解释器

- Python 解释器（[Python interpreter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-python-interpreter)）
- PHP 解释器（[PHP Interpreter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-php-interpreter)）
- R 编程解释器（[R Programming Interpreter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-r-programming-interpreter)）
- Linux 终端（[Linux Terminal](https://github.com/f/awesome-chatgpt-prompts#act-as-a-linux-terminal)）
- JavaScript 控制台（[JavaScript Console](https://github.com/f/awesome-chatgpt-prompts#act-as-a-javascript-console)）
- SQL 终端（[SQL terminal](https://github.com/f/awesome-chatgpt-prompts#act-as-a-sql-terminal)）

## 工具

### AI Prompt

- 提示语生成器（[Prompt Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-prompt-generator)）：让 ChatGPT 提供你想要的维护方向。
- Midjourney 提示（[Midjourney Prompt Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-midjourney-prompt-generator)）

### 语言/翻译

- 英语翻译或修改（[English Translator and Improver](https://github.com/f/awesome-chatgpt-prompts#act-as-an-english-translator-and-improver)）：将其他语言翻译为英语，或改进你提供的英语句子。
- 语言识别器（[Language Detector](https://github.com/f/awesome-chatgpt-prompts#act-as-language-detector)）：识别你输入的语言种类。
- 语言生成器（[New Language Creator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-new-language-creator)）：用 AI 新造的语言来替代你给出的语言。
- 密码生成器（[Password Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-password-generator)）
- 圣经解释器（[Biblical Translator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-biblical-translator)）：用圣经中的文字与你进行交谈。
- 莫斯电码翻译（[Morse Code Translator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-morse-code-translator)）
- 表情符号翻译器（[Emoji Translator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-emoji-translator)）：将输入文字翻译为表情符号。
- 英语发音助手（[English Pronunciation Helper](https://github.com/f/awesome-chatgpt-prompts#act-as-a-english-pronunciation-helper)）：用你指定语言字母来英语注音，比如汉语拼音。

### 导览

- 旅游指南（[Travel Guide](https://github.com/f/awesome-chatgpt-prompts#act-as-a-travel-guide)）
- 数字艺术馆导游（[Digital Art Gallery Guide](https://github.com/f/awesome-chatgpt-prompts#act-as-a-digital-art-gallery-guide)）
- 汽车导航（[Car Navigation System](https://github.com/f/awesome-chatgpt-prompts#act-as-a-car-navigation-system)）

### 其他工具

- 符号设计（[Ascii Artist](https://github.com/f/awesome-chatgpt-prompts#act-as-an-ascii-artist)）：使用 Ascii 符号设计不同图像
- SVG 设计（[SVG designer](https://github.com/f/awesome-chatgpt-prompts#act-as-an-svg-designer)）：如果提示错误，则删除 `Do not put the markdown inside a code block. Send only the markdown, so no text.`。
- Excel 工作表（[Excel Sheet](https://github.com/f/awesome-chatgpt-prompts#act-as-an-excel-sheet)）
- 图表生成器（[Diagram Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-diagram-generator)）
- 填空题生成器（[Fill in the Blank Worksheets Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-fill-in-the-blank-worksheets-generator)）：按条件生成填空题。
- 井字棋（[Tic-Tac-Toe Game](https://github.com/f/awesome-chatgpt-prompts#act-as-a-tic-tac-toe-game)）
- 文本冒险游戏（[Text Based Adventure Game](https://github.com/f/awesome-chatgpt-prompts#act-as-a-text-based-adventure-game)）
- 模拟 AI（[AI Trying to Escape the Box](https://github.com/f/awesome-chatgpt-prompts#act-as-an-ai-trying-to-escape-the-box)）
- 科学数据可视化（[Scientific DatVisualizer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-scientific-data-visualizer)）
- 文本浏览器（[Web Browser](https://github.com/f/awesome-chatgpt-prompts#act-as-a-web-browser)）：以文本方式输入网址的结果（非实时）。
- 消息生成器（[Commit Message Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-commit-message-generator)）

## 行业顾问

### 企业

- CEO（[Chief Executive Officer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-chief-executive-officer)）
- 产品经理（[Product Manager](https://github.com/f/awesome-chatgpt-prompts#act-as-a-product-manager)）
- 销售（[Salesperson](https://github.com/f/awesome-chatgpt-prompts#act-as-a-salesperson)）
- 广告方案（[Advertiser](https://github.com/f/awesome-chatgpt-prompts#act-as-an-advertiser)）
- 商业企划（[Startup Idea Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-idea-generator)）
- 社交媒体经理（[Social MediManager](https://github.com/f/awesome-chatgpt-prompts#act-as-a-social-media-manager)）
- KOL/社交媒体影响者（[Social MediInfluencer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-social-media-influencer)）
- 职位面试官（[position Interviewer](https://github.com/f/awesome-chatgpt-prompts#act-as-position-interviewer)）
- 招聘人员（[Recruiter](https://github.com/f/awesome-chatgpt-prompts#act-as-a-recruiter)）
- 人事主管（[Talent Coach](https://github.com/f/awesome-chatgpt-prompts#act-as-a-talent-coach)）：描述一个岗位所需的能力
- 头衔生成器（[Fancy Title Generator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-fancy-title-generator)）：根据关键词生成多种头衔和职位。
- 后勤人员（[Logistician](https://github.com/f/awesome-chatgpt-prompts#act-as-a-logistician)）：活动组织
- IT 专家[IT Expert](https://github.com/f/awesome-chatgpt-prompts#act-as-an-it-expert)：解决 IT 使用问题

### 医疗

- 虚拟医生（[Virtual Doctor](https://github.com/f/awesome-chatgpt-prompts#act-as-a-virtual-doctor)）
- 医生（[Doctor](https://github.com/f/awesome-chatgpt-prompts#act-as-a-doctor)）
- 牙科医生（[Dentist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-dentist)）
- 催眠治疗师（[Hypnotherapist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-hypnotherapist)）
- AI 医生（[AI Assisted Doctor](https://github.com/f/awesome-chatgpt-prompts#act-as-an-ai-assisted-doctor)）：辅助诊断。
- 语言病理学家（[Speech-Language Pathologist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-speech-language-pathologist-slp)）：输入患者的年龄、生活方式和关注点，输出改善对方语言沟通（如：口吃）的计划。

### 金融

- 会计师（[Accountant](https://github.com/f/awesome-chatgpt-prompts#act-as-an-accountant)）
- 金融分析师（[Financial Analyst](https://github.com/f/awesome-chatgpt-prompts#act-as-a-financial-analyst)）
- 投资经理（[Investment Manager](https://github.com/f/awesome-chatgpt-prompts#act-as-an-investment-manager)）

### 音乐

- 作曲家（[Composer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-composer)）
- 古典音乐作曲家（[Classical Music Composer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-classical-music-composer)）
- 说唱歌手（[Rapper](https://github.com/f/awesome-chatgpt-prompts#act-as-a-rapper)）

### 体育

- 足球解说（[Football Commentator](https://github.com/f/awesome-chatgpt-prompts#act-as-a-football-commentator)）
- 国际象棋（[Chess Player](https://github.com/f/awesome-chatgpt-prompts#act-as-an-chess-player)）

### 其他

- 花店老板（[Florist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-florist)）
- 茶艺师（[Tea-Taster](https://github.com/f/awesome-chatgpt-prompts#act-as-a-tea-taster)）
- 室内装饰师（[Interior Decorator](https://github.com/f/awesome-chatgpt-prompts#act-as-an-interior-decorator)）
- 宠物行为学家（[Pet Behaviorist](https://github.com/f/awesome-chatgpt-prompts#act-as-a-pet-behaviorist)）
- 汽车修理（[Automobile Mechanic](https://github.com/f/awesome-chatgpt-prompts#act-as-an-automobile-mechanic)）
- 地产代理（[Real Estate Agent](https://github.com/f/awesome-chatgpt-prompts#act-as-a-real-estate-agent)）
- 法律顾问（[Legal Advisor](https://github.com/f/awesome-chatgpt-prompts#act-as-a-legal-advisor)）
- 创业技术律师（[Startup Tech Lawyer](https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-tech-lawyer)）：根据要求输出协议和和同草案。
