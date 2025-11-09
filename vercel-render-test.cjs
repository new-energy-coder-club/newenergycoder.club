const https = require('https');
const http = require('http');
const { URL } = require('url');

// Vercel部署URL（根据项目名称推测）
const VERCEL_URL = 'https://newenergycoder-club.vercel.app';

// 测试结果存储
const testResults = {
  mainPage: null,
  resources: [],
  performance: {},
  errors: [],
  summary: {}
};

// HTTP请求函数
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const startTime = Date.now();
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...options.headers
      },
      timeout: 10000
    }, (res) => {
      const endTime = Date.now();
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          responseTime: endTime - startTime,
          contentLength: data.length
        });
      });
    });
    
    req.on('error', (err) => {
      reject({
        error: err.message,
        code: err.code,
        responseTime: Date.now() - startTime
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        code: 'TIMEOUT',
        responseTime: Date.now() - startTime
      });
    });
    
    req.end();
  });
}

// 检测主页面
async function testMainPage() {
  console.log('🔍 检测主页面...');
  
  try {
    const result = await makeRequest(VERCEL_URL);
    
    testResults.mainPage = {
      url: VERCEL_URL,
      statusCode: result.statusCode,
      responseTime: result.responseTime,
      contentLength: result.contentLength,
      success: result.statusCode === 200,
      hasContent: result.data.length > 0,
      contentType: result.headers['content-type'] || 'unknown'
    };
    
    // 检查HTML内容
    if (result.data) {
      testResults.mainPage.hasTitle = result.data.includes('<title>');
      testResults.mainPage.hasReact = result.data.includes('react') || result.data.includes('React');
      testResults.mainPage.hasVite = result.data.includes('vite') || result.data.includes('Vite');
      testResults.mainPage.hasAssets = result.data.includes('/assets/');
    }
    
    console.log(`✅ 主页面状态: ${result.statusCode}, 响应时间: ${result.responseTime}ms`);
    
  } catch (error) {
    testResults.mainPage = {
      url: VERCEL_URL,
      success: false,
      error: error.error || error.message,
      code: error.code,
      responseTime: error.responseTime
    };
    
    testResults.errors.push(`主页面加载失败: ${error.error || error.message}`);
    console.log(`❌ 主页面加载失败: ${error.error || error.message}`);
  }
}

// 检测关键资源
async function testResources() {
  console.log('🔍 检测关键资源...');
  
  const resourceUrls = [
    `${VERCEL_URL}/assets/index.css`,
    `${VERCEL_URL}/assets/index.js`,
    `${VERCEL_URL}/favicon.ico`,
    `${VERCEL_URL}/og-image.svg`
  ];
  
  for (const url of resourceUrls) {
    try {
      const result = await makeRequest(url);
      
      const resourceTest = {
        url: url,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        contentLength: result.contentLength,
        success: result.statusCode === 200,
        contentType: result.headers['content-type'] || 'unknown'
      };
      
      testResults.resources.push(resourceTest);
      
      const status = result.statusCode === 200 ? '✅' : '❌';
      console.log(`${status} ${url.split('/').pop()}: ${result.statusCode}, ${result.responseTime}ms`);
      
    } catch (error) {
      const resourceTest = {
        url: url,
        success: false,
        error: error.error || error.message,
        code: error.code,
        responseTime: error.responseTime
      };
      
      testResults.resources.push(resourceTest);
      testResults.errors.push(`资源加载失败 ${url}: ${error.error || error.message}`);
      console.log(`❌ ${url.split('/').pop()}: ${error.error || error.message}`);
    }
  }
}

// 性能测试
async function performanceTest() {
  console.log('🔍 性能测试...');
  
  const tests = [];
  const testCount = 3;
  
  for (let i = 0; i < testCount; i++) {
    try {
      const result = await makeRequest(VERCEL_URL);
      tests.push(result.responseTime);
    } catch (error) {
      tests.push(null);
    }
  }
  
  const validTests = tests.filter(t => t !== null);
  
  if (validTests.length > 0) {
    testResults.performance = {
      averageResponseTime: Math.round(validTests.reduce((a, b) => a + b, 0) / validTests.length),
      minResponseTime: Math.min(...validTests),
      maxResponseTime: Math.max(...validTests),
      successRate: (validTests.length / testCount) * 100
    };
    
    console.log(`✅ 平均响应时间: ${testResults.performance.averageResponseTime}ms`);
    console.log(`✅ 成功率: ${testResults.performance.successRate}%`);
  } else {
    testResults.performance = {
      error: '所有性能测试都失败了',
      successRate: 0
    };
    console.log('❌ 性能测试失败');
  }
}

// 生成测试报告
function generateReport() {
  console.log('\n📊 生成测试报告...');
  
  // 计算总体状态
  const mainPageOk = testResults.mainPage && testResults.mainPage.success;
  const resourcesOk = testResults.resources.filter(r => r.success).length;
  const totalResources = testResults.resources.length;
  const performanceOk = testResults.performance.successRate > 80;
  
  testResults.summary = {
    overallStatus: mainPageOk && (resourcesOk / totalResources > 0.7) && performanceOk ? 'PASS' : 'FAIL',
    mainPageStatus: mainPageOk ? 'PASS' : 'FAIL',
    resourcesStatus: `${resourcesOk}/${totalResources} 成功`,
    performanceStatus: performanceOk ? 'PASS' : 'FAIL',
    totalErrors: testResults.errors.length,
    timestamp: new Date().toISOString()
  };
  
  // 输出报告
  console.log('\n' + '='.repeat(60));
  console.log('📋 VERCEL 渲染检测报告');
  console.log('='.repeat(60));
  console.log(`🌐 测试URL: ${VERCEL_URL}`);
  console.log(`⏰ 测试时间: ${new Date().toLocaleString('zh-CN')}`);
  console.log(`📊 总体状态: ${testResults.summary.overallStatus}`);
  console.log('');
  
  // 主页面状态
  console.log('🏠 主页面检测:');
  if (testResults.mainPage) {
    console.log(`   状态码: ${testResults.mainPage.statusCode || 'N/A'}`);
    console.log(`   响应时间: ${testResults.mainPage.responseTime || 'N/A'}ms`);
    console.log(`   内容长度: ${testResults.mainPage.contentLength || 'N/A'} bytes`);
    console.log(`   包含标题: ${testResults.mainPage.hasTitle ? '是' : '否'}`);
    console.log(`   包含React: ${testResults.mainPage.hasReact ? '是' : '否'}`);
    console.log(`   包含资源: ${testResults.mainPage.hasAssets ? '是' : '否'}`);
  }
  console.log('');
  
  // 资源状态
  console.log('📦 资源检测:');
  testResults.resources.forEach(resource => {
    const status = resource.success ? '✅' : '❌';
    const name = resource.url.split('/').pop();
    console.log(`   ${status} ${name}: ${resource.statusCode || resource.error}`);
  });
  console.log('');
  
  // 性能状态
  console.log('⚡ 性能检测:');
  if (testResults.performance.averageResponseTime) {
    console.log(`   平均响应时间: ${testResults.performance.averageResponseTime}ms`);
    console.log(`   最快响应时间: ${testResults.performance.minResponseTime}ms`);
    console.log(`   最慢响应时间: ${testResults.performance.maxResponseTime}ms`);
    console.log(`   成功率: ${testResults.performance.successRate}%`);
  } else {
    console.log(`   ❌ ${testResults.performance.error || '性能测试失败'}`);
  }
  console.log('');
  
  // 错误信息
  if (testResults.errors.length > 0) {
    console.log('🚨 发现的问题:');
    testResults.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
    console.log('');
  }
  
  // 建议
  console.log('💡 建议:');
  if (!mainPageOk) {
    console.log('   - 检查Vercel部署状态和域名配置');
    console.log('   - 确认构建过程是否成功完成');
  }
  if (resourcesOk < totalResources) {
    console.log('   - 检查静态资源路径配置');
    console.log('   - 确认vite.config.ts中的base路径设置');
  }
  if (!performanceOk) {
    console.log('   - 考虑优化资源大小和加载策略');
    console.log('   - 检查CDN和缓存配置');
  }
  
  console.log('='.repeat(60));
  
  return testResults;
}

// 主函数
async function main() {
  console.log('🚀 开始Vercel渲染检测...');
  console.log(`🌐 目标URL: ${VERCEL_URL}`);
  console.log('');
  
  try {
    await testMainPage();
    await testResources();
    await performanceTest();
    
    const report = generateReport();
    
    // 保存报告到文件
    const fs = require('fs');
    fs.writeFileSync('vercel-render-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 详细报告已保存到: vercel-render-report.json');
    
    // 返回退出码
    process.exit(report.summary.overallStatus === 'PASS' ? 0 : 1);
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 运行测试
if (require.main === module) {
  main();
}

module.exports = { main, testResults };