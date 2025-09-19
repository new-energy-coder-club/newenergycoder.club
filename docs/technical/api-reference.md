---
title: API参考
description: 新能源编程俱乐部平台API接口文档
author: 新能源编程俱乐部
tags: ["API", "接口文档", "开发者"]
difficulty: intermediate
lastModified: 2024-12-19
---

# API参考

## 概述

新能源编程俱乐部平台提供了丰富的API接口，支持用户管理、学习资源、项目展示等功能。本文档详细介绍了所有可用的API接口。

## 基础信息

### 基础URL
```
https://api.newenergycoder.club/v1
```

### 认证方式
所有API请求都需要在请求头中包含认证信息：
```http
Authorization: Bearer <your-token>
Content-Type: application/json
```

### 响应格式
所有API响应都遵循统一的格式：
```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "timestamp": "2024-12-19T10:00:00Z"
}
```

## 用户管理API

### 用户注册

**接口地址：** `POST /auth/register`

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| email | string | 是 | 用户邮箱 |
| password | string | 是 | 用户密码（8-20位） |
| name | string | 是 | 用户姓名 |
| phone | string | 否 | 手机号码 |
| university | string | 否 | 所在学校 |
| major | string | 否 | 专业方向 |

**请求示例：**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "张三",
  "phone": "13800138000",
  "university": "清华大学",
  "major": "计算机科学与技术"
}
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "userId": "user_123456",
    "email": "user@example.com",
    "name": "张三",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "注册成功"
}
```

### 用户登录

**接口地址：** `POST /auth/login`

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| email | string | 是 | 用户邮箱 |
| password | string | 是 | 用户密码 |

**请求示例：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 获取用户信息

**接口地址：** `GET /users/profile`

**响应示例：**
```json
{
  "success": true,
  "data": {
    "userId": "user_123456",
    "email": "user@example.com",
    "name": "张三",
    "avatar": "https://example.com/avatar.jpg",
    "university": "清华大学",
    "major": "计算机科学与技术",
    "joinDate": "2024-01-15T08:00:00Z",
    "learningProgress": {
      "completedCourses": 5,
      "totalHours": 120,
      "currentLevel": "中级"
    }
  }
}
```

## 学习资源API

### 获取技术路线列表

**接口地址：** `GET /learning/tech-routes`

**查询参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| category | string | 否 | 技术分类（embedded, mechanical, gui等） |
| difficulty | string | 否 | 难度级别（beginner, intermediate, advanced） |
| page | number | 否 | 页码，默认1 |
| limit | number | 否 | 每页数量，默认20 |

**响应示例：**
```json
{
  "success": true,
  "data": {
    "routes": [
      {
        "id": "embedded-basics",
        "title": "嵌入式开发基础",
        "description": "从零开始学习嵌入式开发",
        "category": "embedded",
        "difficulty": "beginner",
        "estimatedHours": 40,
        "prerequisites": ["C语言基础"],
        "skills": ["STM32开发", "传感器应用", "通信协议"],
        "resources": [
          {
            "id": "stm32-tutorial",
            "title": "STM32入门教程",
            "type": "video",
            "url": "https://example.com/tutorial",
            "duration": "2小时"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 获取学习进度

**接口地址：** `GET /learning/progress`

**响应示例：**
```json
{
  "success": true,
  "data": {
    "userId": "user_123456",
    "overallProgress": 65,
    "routes": [
      {
        "routeId": "embedded-basics",
        "progress": 80,
        "completedResources": 8,
        "totalResources": 10,
        "lastAccessed": "2024-12-18T15:30:00Z"
      }
    ],
    "achievements": [
      {
        "id": "first-project",
        "title": "第一个项目",
        "description": "完成第一个嵌入式项目",
        "earnedDate": "2024-12-10T10:00:00Z"
      }
    ]
  }
}
```

## 项目展示API

### 获取项目列表

**接口地址：** `GET /projects`

**查询参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| category | string | 否 | 项目分类 |
| status | string | 否 | 项目状态（active, completed, archived） |
| author | string | 否 | 作者ID |
| page | number | 否 | 页码 |
| limit | number | 否 | 每页数量 |

**响应示例：**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "project_001",
        "title": "智能温控系统",
        "description": "基于STM32的智能温度控制系统",
        "category": "embedded",
        "status": "completed",
        "author": {
          "id": "user_123456",
          "name": "张三",
          "avatar": "https://example.com/avatar.jpg"
        },
        "techStack": ["STM32", "C语言", "传感器"],
        "githubUrl": "https://github.com/user/project",
        "demoUrl": "https://demo.example.com",
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "createdAt": "2024-11-15T10:00:00Z",
        "updatedAt": "2024-12-01T14:30:00Z",
        "likes": 25,
        "views": 150
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5
    }
  }
}
```

### 创建项目

**接口地址：** `POST /projects`

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| title | string | 是 | 项目标题 |
| description | string | 是 | 项目描述 |
| category | string | 是 | 项目分类 |
| techStack | array | 是 | 技术栈 |
| githubUrl | string | 否 | GitHub链接 |
| demoUrl | string | 否 | 演示链接 |
| images | array | 否 | 项目图片 |

## 活动管理API

### 获取活动列表

**接口地址：** `GET /events`

**查询参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| type | string | 否 | 活动类型（workshop, competition, meetup） |
| status | string | 否 | 活动状态（upcoming, ongoing, completed） |
| page | number | 否 | 页码 |
| limit | number | 否 | 每页数量 |

**响应示例：**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "event_001",
        "title": "嵌入式开发工作坊",
        "description": "学习STM32开发基础知识",
        "type": "workshop",
        "status": "upcoming",
        "startTime": "2024-12-25T14:00:00Z",
        "endTime": "2024-12-25T17:00:00Z",
        "location": "线上",
        "maxParticipants": 50,
        "currentParticipants": 32,
        "organizer": {
          "id": "user_admin",
          "name": "管理员"
        },
        "tags": ["嵌入式", "STM32", "工作坊"],
        "registrationDeadline": "2024-12-24T23:59:59Z"
      }
    ]
  }
}
```

## 错误码说明

| 错误码 | 描述 | 解决方案 |
|--------|------|----------|
| 400 | 请求参数错误 | 检查请求参数格式和必填字段 |
| 401 | 未授权访问 | 检查认证token是否有效 |
| 403 | 权限不足 | 联系管理员获取相应权限 |
| 404 | 资源不存在 | 检查请求的资源ID是否正确 |
| 429 | 请求频率过高 | 降低请求频率，遵守限流规则 |
| 500 | 服务器内部错误 | 联系技术支持 |

## 限流规则

- 普通用户：每分钟最多100次请求
- 认证用户：每分钟最多500次请求
- 管理员：每分钟最多1000次请求

## SDK和示例代码

### JavaScript SDK

```javascript
// 安装SDK
npm install @newenergycoder/api-client

// 使用示例
import { NewEnergyAPI } from '@newenergycoder/api-client';

const api = new NewEnergyAPI({
  baseURL: 'https://api.newenergycoder.club/v1',
  token: 'your-auth-token'
});

// 获取用户信息
const userInfo = await api.users.getProfile();
console.log(userInfo);

// 获取技术路线
const routes = await api.learning.getTechRoutes({
  category: 'embedded',
  difficulty: 'beginner'
});
```

### Python SDK

```python
# 安装SDK
pip install newenergy-api-client

# 使用示例
from newenergy_api import NewEnergyAPI

api = NewEnergyAPI(
    base_url='https://api.newenergycoder.club/v1',
    token='your-auth-token'
)

# 获取用户信息
user_info = api.users.get_profile()
print(user_info)

# 创建项目
project = api.projects.create({
    'title': '智能温控系统',
    'description': '基于STM32的温度控制系统',
    'category': 'embedded',
    'tech_stack': ['STM32', 'C语言']
})
```

## 更新日志

### v1.0.0 (2024-12-19)
- 初始版本发布
- 支持用户管理、学习资源、项目展示等基础功能
- 提供JavaScript和Python SDK

## 技术支持

如有API使用问题，请通过以下方式联系我们：

- 邮箱：api-support@newenergycoder.club
- GitHub Issues：https://github.com/Darrenpig/new_energy_coder_club/issues
- 技术交流群：加入我们的微信群或QQ群

---

*本文档持续更新中，最新版本请访问：https://docs.newenergycoder.club/technical/api-reference*