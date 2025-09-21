// 测试脚本：验证项目图片URL的可访问性
const mockProjects = [
  {
    id: '1',
    title: '20250319流体工作站',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: '2', 
    title: '20250426星闪手柄',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: '3',
    title: '20241201人形机器人主线', 
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: '4',
    title: '20241115飞控通讯',
    image: 'https://camo.githubusercontent.com/f28cc104ea4a3debc18eb8132e9e6e4d925d08a51a9af332119c642db75c2499/68747470733a2f2f64726f6e65636f64652e6f72672f77702d636f6e74656e742f75706c6f6164732f73697465732f32342f323032302f30382f64726f6e65636f64655f6c6f676f5f64656661756c742d312e706e67'
  },
  {
    id: '5',
    title: 'NEC 横向项目',
    image: 'https://picsum.photos/800/600?random=5'
  },
  {
    id: '6',
    title: '人形机器人UMI低成本灵巧手',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: '7',
    title: 'MICA混合关键系统验证',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: '8',
    title: '3D打印成型SIG',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center'
  }
];

async function testImageUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function testAllImages() {
  console.log('开始测试项目图片URL...');
  
  for (const project of mockProjects) {
    console.log(`\n测试项目: ${project.title}`);
    const result = await testImageUrl(project.image);
    
    if (result.ok) {
      console.log(`✅ 图片可访问 - 状态: ${result.status}`);
    } else {
      console.log(`❌ 图片不可访问 - 状态: ${result.status || result.error}`);
      console.log(`   URL: ${result.url}`);
    }
  }
  
  console.log('\n图片URL测试完成!');
}

// 运行测试
testAllImages().catch(console.error);