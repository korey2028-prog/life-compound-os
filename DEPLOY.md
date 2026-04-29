# 公开 MVP 部署说明

这是一个纯静态网站，不需要后端、不需要数据库、不需要登录系统。

## 推荐部署方式

### Cloudflare Pages

1. 新建一个 GitHub 仓库。
2. 上传本项目文件。
3. 在 Cloudflare Pages 选择该仓库。
4. Build command 留空。
5. Output directory 填 `/`。

### Vercel

1. 新建一个 GitHub 仓库。
2. 上传本项目文件。
3. 在 Vercel 导入仓库。
4. Framework Preset 选择 `Other`。
5. Build command 留空。
6. Output directory 留空或填 `.`。

### GitHub Pages

1. 新建一个公开 GitHub 仓库。
2. 上传本项目文件。
3. 在 Settings -> Pages 选择 `Deploy from a branch`。
4. Branch 选择 `main`，目录选择 `/root`。

## 隐私说明

当前版本不会把用户数据上传到服务器。所有记录只保存在用户自己的浏览器里。

如果后续加入账号、云同步、AI 生成周报或数据分析，需要重新加入：

- 隐私政策。
- 数据删除机制。
- 用户导出机制。
- 健康免责声明。
- 数据加密和权限设计。
