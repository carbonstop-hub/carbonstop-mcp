# carbonstop-mcp

MCP (Model Context Protocol) server for Carbonstop — 碳阻迹碳足迹核算 MCP 服务。

AI 对话中自动调用碳云 API，完成碳足迹建模、产品查询、核算分析。

## Install

```bash
npm install -g @carbonstopper/mcp
```

Or run directly:

```bash
npx @carbonstopper/mcp
```

## Quick Start

1. 前往 [碳云平台](https://ccloud.carbonstop.com/) 注册登录，创建 API Key（PAT）
2. 设置环境变量：

```bash
export CARBONSTOP_API_KEY="csk_xxx.yyy"
# 自编译需额外设置网关地址：
# export CARBONSTOP_BASE_URL="<gateway-url>"
```

3. 启动 MCP Server：

```bash
npx @carbonstopper/mcp
```

## MCP Client Config

### Claude Code / Claude Desktop

```json
{
  "mcpServers": {
    "carbonstop": {
      "command": "npx",
      "args": ["@carbonstopper/mcp"],
      "env": {
        "CARBONSTOP_API_KEY": "csk_xxx.yyy"
      }
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "carbonstop": {
      "command": "npx",
      "args": ["@carbonstopper/mcp"],
      "env": {
        "CARBONSTOP_API_KEY": "csk_xxx.yyy"
      }
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `ping` | 网关探活 |
| `whoami` | 查看身份信息 |
| `products` | 产品列表（支持分页、名称搜索） |
| `product_info` | 产品详情 |
| `accounts` | 产品核算列表 |
| `account_view` | 核算详情（含生命周期各阶段排放） |
| `ai_model` | 一键 AI 碳足迹建模 |

## Security

- 网关地址构建时注入，源码及配置中均不可见
- 认证通过 API Key（PAT），由 MCP 客户端通过环境变量传入
- 接口调用需有效凭证，网关层鉴权

## Related

- [carbonstop-cli](https://github.com/carbonstop-hub/carbonstop-cli) — 命令行工具

## License

MIT
