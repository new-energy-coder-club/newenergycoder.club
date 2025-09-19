---
title: 集成指南
description: 第三方服务集成和系统对接指南
author: 新能源编程俱乐部
tags: ["集成", "第三方服务", "部署"]
difficulty: advanced
lastModified: 2024-12-19
---

# 集成指南

## 概述

本文档详细介绍新能源编程俱乐部平台与各种第三方服务的集成方案，包括认证服务、支付系统、云存储、监控服务等。

## 认证服务集成

### Supabase 认证

#### 配置步骤

1. **创建 Supabase 项目**
```bash
# 访问 https://supabase.com
# 创建新项目并获取配置信息
```

2. **环境变量配置**
```bash
# .env.local
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. **客户端配置**
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// 认证状态监听
export const onAuthStateChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
};
```

4. **数据库策略配置**
```sql
-- 用户表权限策略
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 学习记录权限策略
CREATE POLICY "Users can view own learning records" ON learning_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning records" ON learning_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 社交登录集成

#### GitHub OAuth
```typescript
// GitHub 登录配置
const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes: 'read:user user:email',
    },
  });
  
  if (error) {
    console.error('GitHub login error:', error);
    throw error;
  }
  
  return data;
};
```

#### Google OAuth
```typescript
// Google 登录配置
const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  
  if (error) throw error;
  return data;
};
```

## 支付系统集成

### Stripe 集成

#### 环境配置
```bash
# .env.local
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 客户端集成
```typescript
// src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export const getStripe = () => stripePromise;

// 支付组件
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';

const PaymentPage = () => {
  const stripe = getStripe();
  
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};
```

#### 支付表单
```typescript
// src/components/CheckoutForm.tsx
import { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 创建支付意图
      const { data } = await api.payments.createPaymentIntent({
        amount: 2999, // 29.99 USD in cents
        currency: 'usd',
        metadata: {
          courseId: 'premium-course',
        },
      });
      
      // 确认支付
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });
      
      if (paymentError) {
        setError(paymentError.message || '支付失败');
      }
    } catch (err) {
      setError('支付处理失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? '处理中...' : '支付'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

### 微信支付集成

#### 配置
```typescript
// 微信支付配置
const wechatPayConfig = {
  appId: process.env.REACT_APP_WECHAT_APP_ID!,
  mchId: process.env.WECHAT_MCH_ID!,
  apiKey: process.env.WECHAT_API_KEY!,
  notifyUrl: `${process.env.API_BASE_URL}/webhooks/wechat-pay`,
};

// 发起微信支付
const initiateWechatPay = async (orderData: OrderData) => {
  const response = await api.payments.wechat.create({
    body: orderData.description,
    out_trade_no: orderData.orderId,
    total_fee: orderData.amount,
    spbill_create_ip: getClientIP(),
    notify_url: wechatPayConfig.notifyUrl,
    trade_type: 'JSAPI',
    openid: orderData.openid,
  });
  
  return response.data;
};
```

## 云存储集成

### AWS S3 集成

#### 配置
```typescript
// src/lib/aws.ts
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

const s3 = new AWS.S3();

// 文件上传
export const uploadFile = async (file: File, key: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  };
  
  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
};

// 生成预签名URL
export const getSignedUrl = (key: string, expires: number = 3600) => {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Expires: expires,
  });
};
```

### 阿里云 OSS 集成

```typescript
// src/lib/oss.ts
import OSS from 'ali-oss';

const client = new OSS({
  region: process.env.ALIYUN_OSS_REGION!,
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID!,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET!,
  bucket: process.env.ALIYUN_OSS_BUCKET!,
});

// 文件上传
export const uploadToOSS = async (file: File, path: string) => {
  try {
    const result = await client.put(path, file);
    return result.url;
  } catch (error) {
    console.error('OSS upload error:', error);
    throw error;
  }
};

// 批量上传
export const uploadMultipleFiles = async (files: File[], basePath: string) => {
  const uploadPromises = files.map((file, index) => {
    const path = `${basePath}/${Date.now()}-${index}-${file.name}`;
    return uploadToOSS(file, path);
  });
  
  return Promise.all(uploadPromises);
};
```

## 邮件服务集成

### SendGrid 集成

```typescript
// 邮件服务配置
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// 发送欢迎邮件
export const sendWelcomeEmail = async (to: string, userName: string) => {
  const msg = {
    to,
    from: 'noreply@newenergycoder.club',
    templateId: 'd-welcome-template-id',
    dynamicTemplateData: {
      userName,
      loginUrl: `${process.env.FRONTEND_URL}/login`,
      supportEmail: 'support@newenergycoder.club',
    },
  };
  
  try {
    await sgMail.send(msg);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// 发送课程完成通知
export const sendCourseCompletionEmail = async (
  to: string, 
  courseTitle: string,
  certificateUrl: string
) => {
  const msg = {
    to,
    from: 'courses@newenergycoder.club',
    templateId: 'd-course-completion-template-id',
    dynamicTemplateData: {
      courseTitle,
      certificateUrl,
      nextCoursesUrl: `${process.env.FRONTEND_URL}/courses`,
    },
  };
  
  await sgMail.send(msg);
};
```

### 腾讯云邮件服务

```typescript
// 腾讯云邮件服务
import { SesClient } from 'tencentcloud-sdk-nodejs';

const client = SesClient({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID!,
    secretKey: process.env.TENCENT_SECRET_KEY!,
  },
  region: 'ap-beijing',
});

export const sendEmailViaTencent = async (
  to: string[],
  subject: string,
  content: string
) => {
  const params = {
    Source: 'noreply@newenergycoder.club',
    Template: {
      TemplateName: 'default-template',
      TemplateData: JSON.stringify({
        subject,
        content,
      }),
    },
    Destination: to,
  };
  
  try {
    const result = await client.SendEmail(params);
    return result;
  } catch (error) {
    console.error('Tencent email error:', error);
    throw error;
  }
};
```

## 监控和分析集成

### Google Analytics 4

```typescript
// src/lib/analytics.ts
import { gtag } from 'ga-gtag';

// 初始化 GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID!, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// 页面浏览事件
export const trackPageView = (path: string, title?: string) => {
  gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID!, {
    page_path: path,
    page_title: title,
  });
};

// 自定义事件
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// 学习进度事件
export const trackLearningProgress = (
  courseId: string,
  lessonId: string,
  progress: number
) => {
  trackEvent('learning_progress', 'education', `${courseId}-${lessonId}`, progress);
};
```

### Sentry 错误监控

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// 初始化 Sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/api\.newenergycoder\.club/,
      ],
    }),
  ],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  beforeSend(event) {
    // 过滤敏感信息
    if (event.request?.headers) {
      delete event.request.headers.Authorization;
    }
    return event;
  },
});

// 错误边界组件
export const SentryErrorBoundary = Sentry.withErrorBoundary(
  ({ children }: { children: React.ReactNode }) => children,
  {
    fallback: ({ error, resetError }) => (
      <div className="error-fallback">
        <h2>出现了错误</h2>
        <p>{error.message}</p>
        <button onClick={resetError}>重试</button>
      </div>
    ),
  }
);
```

## 搜索服务集成

### Algolia 搜索

```typescript
// src/lib/algolia.ts
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID!,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY!
);

const coursesIndex = client.initIndex('courses');
const articlesIndex = client.initIndex('articles');

// 搜索课程
export const searchCourses = async (query: string, filters?: string) => {
  try {
    const { hits } = await coursesIndex.search(query, {
      filters,
      hitsPerPage: 20,
      attributesToRetrieve: [
        'title',
        'description',
        'instructor',
        'difficulty',
        'tags',
        'thumbnail',
      ],
    });
    return hits;
  } catch (error) {
    console.error('Algolia search error:', error);
    throw error;
  }
};

// 搜索建议
export const getSearchSuggestions = async (query: string) => {
  const { hits } = await coursesIndex.search(query, {
    hitsPerPage: 5,
    attributesToRetrieve: ['title'],
  });
  
  return hits.map(hit => hit.title);
};
```

### Elasticsearch 集成

```typescript
// 后端 Elasticsearch 客户端
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: process.env.ELASTICSEARCH_URL!,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME!,
    password: process.env.ELASTICSEARCH_PASSWORD!,
  },
});

// 索引文档
export const indexDocument = async (index: string, document: any) => {
  try {
    const response = await client.index({
      index,
      body: document,
    });
    return response;
  } catch (error) {
    console.error('Elasticsearch indexing error:', error);
    throw error;
  }
};

// 搜索文档
export const searchDocuments = async (
  index: string,
  query: string,
  filters: any = {}
) => {
  const searchBody = {
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query,
              fields: ['title^2', 'description', 'content'],
              type: 'best_fields',
            },
          },
        ],
        filter: Object.entries(filters).map(([key, value]) => ({
          term: { [key]: value },
        })),
      },
    },
    highlight: {
      fields: {
        title: {},
        description: {},
        content: {},
      },
    },
  };
  
  const response = await client.search({
    index,
    body: searchBody,
  });
  
  return response.body.hits;
};
```

## 消息队列集成

### Redis 队列

```typescript
// src/lib/queue.ts
import Bull from 'bull';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

// 邮件队列
const emailQueue = new Bull('email', {
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD,
  },
});

// 处理邮件任务
emailQueue.process('send-welcome', async (job) => {
  const { email, userName } = job.data;
  await sendWelcomeEmail(email, userName);
});

// 添加邮件任务
export const queueWelcomeEmail = async (email: string, userName: string) => {
  await emailQueue.add('send-welcome', { email, userName }, {
    delay: 5000, // 5秒延迟
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  });
};

// 学习进度更新队列
const progressQueue = new Bull('progress', { redis });

progressQueue.process('update-progress', async (job) => {
  const { userId, courseId, lessonId, progress } = job.data;
  
  // 更新数据库
  await updateLearningProgress(userId, courseId, lessonId, progress);
  
  // 检查是否完成课程
  if (progress === 100) {
    await queueCertificateGeneration(userId, courseId);
  }
});
```

## CDN 集成

### Cloudflare CDN

```typescript
// Cloudflare 配置
const cloudflareConfig = {
  zoneId: process.env.CLOUDFLARE_ZONE_ID!,
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
};

// 清除缓存
export const purgeCloudflareCache = async (urls?: string[]) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${cloudflareConfig.zoneId}/purge_cache`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: urls || ['https://newenergycoder.club/*'],
      }),
    }
  );
  
  return response.json();
};
```

## 部署配置

### Vercel 部署

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_SUPABASE_URL": "@supabase-url",
    "REACT_APP_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Netlify 部署

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "https://api.newenergycoder.club/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  REACT_APP_ENV = "production"

[context.deploy-preview.environment]
  REACT_APP_ENV = "preview"
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass https://api.newenergycoder.club/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 环境变量管理

### 开发环境
```bash
# .env.development
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SUPABASE_URL=https://your-dev-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-dev-anon-key
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 生产环境
```bash
# .env.production
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.newenergycoder.club/v1
REACT_APP_SUPABASE_URL=https://your-prod-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-prod-anon-key
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...
REACT_APP_GA_MEASUREMENT_ID=G-YYYYYYYYYY
```

### 环境变量验证
```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  REACT_APP_ENV: z.enum(['development', 'production', 'test']),
  REACT_APP_API_URL: z.string().url(),
  REACT_APP_SUPABASE_URL: z.string().url(),
  REACT_APP_SUPABASE_ANON_KEY: z.string().min(1),
  REACT_APP_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
});

export const env = envSchema.parse({
  REACT_APP_ENV: process.env.REACT_APP_ENV,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
  REACT_APP_STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
});
```

## 故障排除

### 常见问题

#### 1. CORS 错误
```typescript
// 解决方案：配置代理或后端CORS
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

#### 2. 环境变量未加载
```typescript
// 检查环境变量前缀
// React 应用中必须以 REACT_APP_ 开头
console.log('API URL:', process.env.REACT_APP_API_URL);

// 检查 .env 文件位置和格式
// 确保文件在项目根目录
// 确保没有空格和引号问题
```

#### 3. 构建失败
```bash
# 清理缓存
npm run clean
rm -rf node_modules package-lock.json
npm install

# 检查 TypeScript 错误
npm run type-check

# 检查 ESLint 错误
npm run lint
```

---

*本集成指南涵盖了主要的第三方服务集成方案，具体实施时请根据项目需求选择合适的服务。*