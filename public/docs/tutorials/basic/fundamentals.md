---
title: 编程基础核心概念
description: 深入理解编程的核心概念，掌握现代编程语言的基础知识和最佳实践
tags: [编程基础, 变量类型, 函数设计, 控制结构, 数据结构, 算法思维]
style: modern
theme: energy
difficulty: beginner
estimated_time: 45分钟
prerequisites: [新能源编程入门]
---

<div class="hero-section bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white p-8 rounded-xl mb-8">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">
      <span class="inline-block animate-pulse">💎</span>
      编程基础核心概念
      <span class="inline-block animate-pulse">🚀</span>
    </h1>
    <p class="text-xl md:text-2xl mb-6 text-green-100">
      构建坚实的编程基础，掌握现代软件开发的核心技能
    </p>
    <div class="flex flex-wrap justify-center gap-4 text-sm">
      <span class="bg-white/20 px-3 py-1 rounded-full">⏱️ 预计学习时间: 45分钟</span>
      <span class="bg-white/20 px-3 py-1 rounded-full">📊 难度等级: 初级</span>
      <span class="bg-white/20 px-3 py-1 rounded-full">🎯 实践导向</span>
    </div>
  </div>
</div>

<div class="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
  <h2 class="text-xl font-semibold mb-4 flex items-center text-blue-700 dark:text-blue-300">
    <span class="mr-2">🎯</span>学习目标
  </h2>
  <div class="grid md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <div class="flex items-center text-sm">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        理解变量和数据类型的本质
      </div>
      <div class="flex items-center text-sm">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        掌握函数设计和模块化编程
      </div>
      <div class="flex items-center text-sm">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        熟练运用控制结构和逻辑思维
      </div>
    </div>
    <div class="space-y-2">
      <div class="flex items-center text-sm">
        <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        学会数据结构的选择和应用
      </div>
      <div class="flex items-center text-sm">
        <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        培养算法思维和问题解决能力
      </div>
      <div class="flex items-center text-sm">
        <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        建立良好的编程习惯和代码风格
      </div>
    </div>
  </div>
</div>

<div class="glass-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 flex items-center">
    <span class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
      <span class="text-white font-bold">📦</span>
    </span>
    <span class="gradient-text bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      变量和数据类型
    </span>
  </h2>
  
  <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 rounded-lg mb-6">
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      变量是程序的基础构建块，就像能源系统中的储能设备一样，用来存储和管理数据。
      理解不同数据类型的特性，是编写高效程序的关键。
    </p>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center">
        <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        基础数据类型
      </h3>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 class="font-medium text-green-600 dark:text-green-400 mb-2">🔢 整数类型 (Integer)</h4>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-green-400"><code># Python - 能源数据处理
battery_capacity = 5000  # 电池容量(Wh)
solar_panels = 24        # 太阳能板数量
power_output = 8500      # 功率输出(W)</code></pre>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 class="font-medium text-blue-600 dark:text-blue-400 mb-2">🌊 浮点数类型 (Float)</h4>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-blue-400"><code># Python - 精确测量
voltage = 220.5          # 电压(V)
efficiency = 0.95        # 转换效率
temperature = 25.8       # 环境温度(°C)</code></pre>
        </div>
      </div>
    </div>
    
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center">
        <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        高级数据类型
      </h3>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 class="font-medium text-purple-600 dark:text-purple-400 mb-2">📝 字符串类型 (String)</h4>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-purple-400"><code># Python - 设备信息
device_name = "Tesla Powerwall"
status_message = "系统运行正常"
serial_number = "TW-2024-001"</code></pre>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 class="font-medium text-red-600 dark:text-red-400 mb-2">⚡ 布尔类型 (Boolean)</h4>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-red-400"><code># Python - 状态控制
is_charging = True       # 充电状态
is_grid_connected = False # 并网状态
alarm_active = False     # 告警状态</code></pre>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="glass-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 flex items-center">
    <span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
      <span class="text-white font-bold">⚙️</span>
    </span>
    <span class="gradient-text bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      函数与模块化设计
    </span>
  </h2>
  
  <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg mb-6">
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      函数是程序的核心组件，就像能源系统中的功能模块一样，每个函数都有特定的职责和接口。
      良好的函数设计是构建可维护、可扩展系统的基础。
    </p>
  </div>

  <div class="space-y-6">
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Python 能源监控函数
        </h3>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-green-400"><code>def monitor_solar_system(panels_data):
    """
    监控太阳能系统性能
    Args: panels_data - 面板数据列表
    Returns: 系统状态报告
    """
    total_power = sum(panel['power'] for panel in panels_data)
    efficiency = calculate_efficiency(total_power)
    
    return {
        'total_power': total_power,
        'efficiency': efficiency,
        'status': 'optimal' if efficiency > 0.85 else 'warning'
    }

# 调用示例
panels = [{'power': 300}, {'power': 280}, {'power': 295}]
report = monitor_solar_system(panels)
print(f"系统功率: {report['total_power']}W")</code></pre>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          JavaScript 智能控制函数
        </h3>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-blue-400"><code>// 智能电网负载均衡
function balanceGridLoad(currentLoad, maxCapacity) {
    /**
     * 智能负载均衡算法
     * @param {number} currentLoad - 当前负载
     * @param {number} maxCapacity - 最大容量
     * @returns {Object} 控制策略
     */
    const loadRatio = currentLoad / maxCapacity;
    
    if (loadRatio > 0.9) {
        return {
            action: 'reduce_load',
            priority: 'high',
            message: '负载过高，启动削峰策略'
        };
    }
    
    return {
        action: 'maintain',
        priority: 'normal',
        message: '系统运行正常'
    };
}

// 实时调用
const strategy = balanceGridLoad(8500, 10000);
console.log(strategy.message);</code></pre>
        </div>
      </div>
    </div>
    
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center">
        <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        函数设计最佳实践
      </h3>
      <div class="grid md:grid-cols-3 gap-4 text-sm">
        <div class="flex items-start space-x-2">
          <span class="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
          <div>
            <strong class="text-green-600 dark:text-green-400">单一职责</strong>
            <p class="text-gray-600 dark:text-gray-400">每个函数只做一件事</p>
          </div>
        </div>
        <div class="flex items-start space-x-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
          <div>
            <strong class="text-blue-600 dark:text-blue-400">清晰命名</strong>
            <p class="text-gray-600 dark:text-gray-400">函数名要表达其功能</p>
          </div>
        </div>
        <div class="flex items-start space-x-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></span>
          <div>
            <strong class="text-purple-600 dark:text-purple-400">文档注释</strong>
            <p class="text-gray-600 dark:text-gray-400">详细说明参数和返回值</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="glass-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 flex items-center">
    <span class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
      <span class="text-white font-bold">🔀</span>
    </span>
    <span class="gradient-text bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
      控制结构与逻辑流程
    </span>
  </h2>
  
  <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 p-4 rounded-lg mb-6">
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      控制结构是程序的决策中心，就像能源管理系统的智能调度一样，
      根据不同条件和状态，做出相应的控制决策。
    </p>
  </div>

  <div class="space-y-6">
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          条件判断 - 智能决策
        </h3>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-green-400"><code># Python - 电池管理系统
def manage_battery_charging(battery_level, grid_price):
    """
    智能电池充电策略
    """
    if battery_level < 20:
        # 电量低，紧急充电
        return {
            'action': 'emergency_charge',
            'power': 'max',
            'message': '电量过低，启动紧急充电'
        }
    elif battery_level < 50 and grid_price < 0.1:
        # 电价便宜时充电
        return {
            'action': 'smart_charge',
            'power': 'optimal',
            'message': '电价优惠，智能充电中'
        }
    elif battery_level > 90:
        # 电量充足，停止充电
        return {
            'action': 'stop_charge',
            'power': 0,
            'message': '电量充足，停止充电'
        }
    else:
        # 维持当前状态
        return {
            'action': 'maintain',
            'power': 'current',
            'message': '维持当前充电状态'
        }

# 实际应用
strategy = manage_battery_charging(35, 0.08)
print(strategy['message'])</code></pre>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          多重条件 - 分级控制
        </h3>
        <div class="bg-gray-900 rounded-md p-3 text-sm">
          <pre class="text-blue-400"><code>// JavaScript - 太阳能发电分级管理
function classifySolarOutput(powerOutput) {
    /**
     * 根据发电量进行分级管理
     * @param {number} powerOutput - 当前发电量(kW)
     */
    let status, action, priority;
    
    if (powerOutput >= 8.0) {
        status = '优秀发电';
        action = 'export_excess';
        priority = 'high';
    } else if (powerOutput >= 6.0) {
        status = '良好发电';
        action = 'balance_load';
        priority = 'medium';
    } else if (powerOutput >= 3.0) {
        status = '一般发电';
        action = 'supplement_grid';
        priority = 'medium';
    } else if (powerOutput >= 1.0) {
        status = '低效发电';
        action = 'grid_priority';
        priority = 'low';
    } else {
        status = '发电异常';
        action = 'maintenance_check';
        priority = 'urgent';
    }
    
    return {
        status,
        action,
        priority,
        recommendation: getRecommendation(action)
    };
}

// 动态调用
const result = classifySolarOutput(7.2);
console.log(`状态: ${result.status}`);</code></pre>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="glass-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 flex items-center">
    <span class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
      <span class="text-white font-bold">🔄</span>
    </span>
    <span class="gradient-text bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      循环结构与迭代处理
    </span>
  </h2>
  
  <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 rounded-lg mb-6">
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      循环结构让程序能够重复执行任务，就像能源系统的周期性监控和数据采集一样，
      高效处理大量重复性工作。
    </p>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div class="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3 flex items-center">
        <span class="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
        For 循环 - 数据采集
      </h3>
      <div class="bg-gray-900 rounded-md p-3 text-sm">
        <pre class="text-cyan-400"><code># Python - 太阳能板数据采集
def collect_solar_data(panel_count=10):
    """
    采集所有太阳能板的实时数据
    """
    total_power = 0
    panel_data = []
    
    for panel_id in range(1, panel_count + 1):
        # 模拟读取每个面板的数据
        voltage = 24.5 + (panel_id * 0.1)
        current = 8.2 - (panel_id * 0.05)
        power = voltage * current
        
        panel_info = {
            'id': f'SP-{panel_id:03d}',
            'voltage': round(voltage, 2),
            'current': round(current, 2),
            'power': round(power, 2),
            'status': 'active' if power > 150 else 'low'
        }
        
        panel_data.append(panel_info)
        total_power += power
        
        print(f"面板 {panel_info['id']}: {power:.1f}W")
    
    return {
        'panels': panel_data,
        'total_power': round(total_power, 2),
        'average_power': round(total_power / panel_count, 2)
    }

# 执行数据采集
result = collect_solar_data(5)
print(f"总功率: {result['total_power']}W")</code></pre>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center">
        <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        While 循环 - 状态监控
      </h3>
      <div class="bg-gray-900 rounded-md p-3 text-sm">
        <pre class="text-purple-400"><code>// JavaScript - 电池充电监控
function monitorBatteryCharging(targetLevel = 90) {
    /**
     * 监控电池充电过程直到达到目标电量
     */
    let currentLevel = 20; // 初始电量
    let chargingTime = 0;
    let chargingLog = [];
    
    console.log('开始充电监控...');
    
    while (currentLevel < targetLevel) {
        // 模拟充电过程
        const chargeRate = currentLevel < 80 ? 2.5 : 1.2;
        currentLevel += chargeRate;
        chargingTime += 15; // 每15分钟检查一次
        
        // 确保不超过100%
        if (currentLevel > 100) currentLevel = 100;
        
        const logEntry = {
            time: chargingTime,
            level: Math.round(currentLevel * 10) / 10,
            rate: chargeRate,
            status: currentLevel >= targetLevel ? 'completed' : 'charging'
        };
        
        chargingLog.push(logEntry);
        
        console.log(
            `时间: ${chargingTime}分钟 | ` +
            `电量: ${logEntry.level}% | ` +
            `状态: ${logEntry.status}`
        );
        
        // 安全检查：防止无限循环
        if (chargingTime > 480) break; // 最多8小时
    }
    
    return {
        finalLevel: Math.round(currentLevel * 10) / 10,
        totalTime: chargingTime,
        log: chargingLog
    };
}

// 开始监控
const result = monitorBatteryCharging(85);</code></pre>
      </div>
    </div>
  </div>
</div>

<div class="glass-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 flex items-center">
    <span class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
      <span class="text-white font-bold">🧮</span>
    </span>
    <span class="gradient-text bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
      运算符与数据处理
    </span>
  </h2>
  
  <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-lg mb-6">
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      运算符是数据处理的基础工具，在能源计算中用于功率计算、效率分析、成本核算等关键运算。
    </p>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        算术运算 - 能源计算
      </h3>
      <div class="bg-gray-900 rounded-md p-3 text-sm">
        <pre class="text-green-400"><code># Python - 太阳能系统功率计算
def calculate_solar_metrics(voltage, current, panels_count, hours):
    """
    计算太阳能系统的各项指标
    """
    # 基础功率计算
    power_per_panel = voltage * current  # 单板功率 (W)
    total_power = power_per_panel * panels_count  # 总功率 (W)
    
    # 日发电量计算
    daily_energy = (total_power * hours) / 1000  # kWh
    
    # 效率计算 (假设标准测试条件下额定功率为300W)
    rated_power = 300 * panels_count
    efficiency = (total_power / rated_power) * 100  # 百分比
    
    # 年发电量估算
    annual_energy = daily_energy * 365  # kWh/年
    
    # 碳减排计算 (每kWh减排0.785kg CO2)
    co2_reduction = annual_energy * 0.785  # kg CO2/年
    
    return {
        'power_per_panel': round(power_per_panel, 2),
        'total_power': round(total_power, 2),
        'daily_energy': round(daily_energy, 2),
        'efficiency': round(efficiency, 1),
        'annual_energy': round(annual_energy, 0),
        'co2_reduction': round(co2_reduction, 0)
    }

# 实际计算示例
metrics = calculate_solar_metrics(
    voltage=24.5,    # 电压
    current=12.2,    # 电流
    panels_count=20, # 面板数量
    hours=8.5        # 日照时间
)

print(f"系统总功率: {metrics['total_power']}W")
print(f"日发电量: {metrics['daily_energy']}kWh")
print(f"系统效率: {metrics['efficiency']}%")</code></pre>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
        <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        比较运算 - 状态判断
      </h3>
      <div class="bg-gray-900 rounded-md p-3 text-sm">
        <pre class="text-blue-400"><code>// JavaScript - 电网状态智能判断
function analyzeGridStatus(voltage, frequency, load) {
    /**
     * 分析电网运行状态
     * @param {number} voltage - 电压 (V)
     * @param {number} frequency - 频率 (Hz)
     * @param {number} load - 负载 (%)
     */
    
    // 电压状态判断
    const voltageStatus = {
        normal: voltage >= 220 && voltage <= 240,
        high: voltage > 240,
        low: voltage < 220,
        critical: voltage < 200 || voltage > 250
    };
    
    // 频率状态判断
    const frequencyStatus = {
        stable: frequency >= 49.8 && frequency <= 50.2,
        deviation: frequency < 49.8 || frequency > 50.2,
        critical: frequency < 49.5 || frequency > 50.5
    };
    
    // 负载状态判断
    const loadStatus = {
        light: load < 30,
        normal: load >= 30 && load <= 70,
        heavy: load > 70 && load <= 90,
        overload: load > 90
    };
    
    // 综合状态评估
    let overallStatus = 'normal';
    let alerts = [];
    
    if (voltageStatus.critical || frequencyStatus.critical) {
        overallStatus = 'critical';
        alerts.push('系统参数严重偏离正常范围');
    } else if (!voltageStatus.normal || !frequencyStatus.stable) {
        overallStatus = 'warning';
        alerts.push('系统参数偏离正常范围');
    }
    
    if (loadStatus.overload) {
        overallStatus = 'critical';
        alerts.push('系统负载过高');
    } else if (loadStatus.heavy) {
        alerts.push('系统负载较高，需要关注');
    }
    
    return {
        voltage: voltageStatus,
        frequency: frequencyStatus,
        load: loadStatus,
        overall: overallStatus,
        alerts: alerts,
        timestamp: new Date().toISOString()
    };
}

// 实时状态分析
const status = analyzeGridStatus(235.2, 50.1, 75);
console.log(`电网状态: ${status.overall}`);
status.alerts.forEach(alert => console.log(`⚠️ ${alert}`));</code></pre>
      </div>
    </div>
  </div>
</div>

  <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center">
      <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
      逻辑运算 - 智能决策
    </h3>
    <div class="bg-gray-900 rounded-md p-3 text-sm">
      <pre class="text-orange-400"><code>// JavaScript - 智能能源管理决策系统
class SmartEnergyDecision {
    /**
     * 智能能源管理决策引擎
     */
    constructor() {
        this.thresholds = {
            batteryLow: 20,
            batteryHigh: 90,
            solarEfficient: 300,
            gridPeakHour: { start: 18, end: 22 },
            emergencyReserve: 15
        };
    }
    
    makeEnergyDecision(currentData) {
        const {
            batteryLevel,
            solarOutput,
            gridLoad,
            currentHour,
            weatherForecast
        } = currentData;
        
        // 复合逻辑判断
        const isBatteryLow = batteryLevel <= this.thresholds.batteryLow;
        const isBatteryHigh = batteryLevel >= this.thresholds.batteryHigh;
        const isSolarEfficient = solarOutput >= this.thresholds.solarEfficient;
        const isPeakHour = currentHour >= this.thresholds.gridPeakHour.start && 
                          currentHour <= this.thresholds.gridPeakHour.end;
        const isWeatherGood = weatherForecast === 'sunny' || weatherForecast === 'partly_cloudy';
        const isEmergencyLevel = batteryLevel <= this.thresholds.emergencyReserve;
        
        let decision = {
            action: 'monitor',
            priority: 'normal',
            reasons: [],
            recommendations: []
        };
        
        // 紧急情况处理 (最高优先级)
        if (isEmergencyLevel) {
            decision.action = 'emergency_charge';
            decision.priority = 'critical';
            decision.reasons.push('电池电量极低，进入紧急充电模式');
            decision.recommendations.push('立即从电网充电');
            decision.recommendations.push('关闭非必要负载');
        }
        // 智能充电决策
        else if (isBatteryLow && isSolarEfficient && isWeatherGood) {
            decision.action = 'solar_charge';
            decision.priority = 'high';
            decision.reasons.push('电池电量低且太阳能充足');
            decision.recommendations.push('优先使用太阳能充电');
        }
        // 峰时放电决策
        else if (isBatteryHigh && isPeakHour && gridLoad > 70) {
            decision.action = 'discharge_to_grid';
            decision.priority = 'high';
            decision.reasons.push('电网峰时且电池电量充足');
            decision.recommendations.push('向电网放电获得收益');
        }
        // 储能优化决策
        else if (!isPeakHour && isSolarEfficient && !isBatteryHigh) {
            decision.action = 'store_energy';
            decision.priority = 'medium';
            decision.reasons.push('非峰时太阳能充足，适合储能');
            decision.recommendations.push('储存太阳能为峰时使用');
        }
        
        // 添加时间戳和系统状态
        decision.timestamp = new Date().toISOString();
        decision.systemStatus = {
            battery: isBatteryLow ? 'low' : isBatteryHigh ? 'high' : 'normal',
            solar: isSolarEfficient ? 'efficient' : 'low',
            grid: isPeakHour ? 'peak' : 'off_peak',
            weather: isWeatherGood ? 'favorable' : 'unfavorable'
        };
        
        return decision;
    }
}

// 实际决策示例
const decisionEngine = new SmartEnergyDecision();
const currentData = {
    batteryLevel: 25,
    solarOutput: 450,
    gridLoad: 85,
    currentHour: 14,
    weatherForecast: 'sunny'
};

const decision = decisionEngine.makeEnergyDecision(currentData);
console.log(`决策: ${decision.action}`);
console.log(`优先级: ${decision.priority}`);
decision.reasons.forEach(reason => console.log(`原因: ${reason}`));</code></pre>
    </div>
  </div>
</div>

<div class="glass-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 flex items-center">
    <span class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
      <span class="text-white font-bold">🚀</span>
    </span>
    <span class="gradient-text bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
      实战练习与项目应用
    </span>
  </h2>
  
  <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 p-4 rounded-lg mb-6">
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
      通过实际的能源项目练习，巩固编程基础知识，培养解决实际问题的能力。
      每个练习都结合新能源领域的真实场景，让学习更有意义。
    </p>
  </div>

  <div class="space-y-8">
    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
        <span class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
          <span class="text-white text-sm font-bold">1</span>
        </span>
        太阳能板效率计算器
      </h3>
      
      <div class="mb-4">
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          <strong>任务目标：</strong> 创建一个太阳能板效率计算程序，计算发电量和投资回报。
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">变量定义</span>
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">算术运算</span>
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">数据输出</span>
        </div>
      </div>
      
      <div class="bg-gray-900 rounded-md p-4">
        <pre class="text-cyan-400 text-sm"><code>// JavaScript - 太阳能板效率计算器
function calculateSolarEfficiency() {
    // 太阳能板基础参数
    const panelPower = 400;        // 单板额定功率 (W)
    const panelCount = 24;         // 面板数量
    const systemVoltage = 24.5;    // 系统电压 (V)
    const systemCurrent = 16.3;    // 系统电流 (A)
    const sunlightHours = 8.5;     // 日均日照时间 (小时)
    const electricityPrice = 0.65; // 电价 (元/kWh)
    
    // 计算实际功率和效率
    const actualPower = systemVoltage * systemCurrent; // 实际功率
    const ratedPower = panelPower * panelCount;         // 额定功率
    const efficiency = (actualPower / ratedPower) * 100; // 效率百分比
    
    // 计算发电量和收益
    const dailyGeneration = (actualPower * sunlightHours) / 1000; // 日发电量 (kWh)
    const monthlyGeneration = dailyGeneration * 30;                // 月发电量
    const annualGeneration = dailyGeneration * 365;               // 年发电量
    
    // 计算经济效益
    const dailyIncome = dailyGeneration * electricityPrice;       // 日收入
    const monthlyIncome = monthlyGeneration * electricityPrice;   // 月收入
    const annualIncome = annualGeneration * electricityPrice;     // 年收入
    
    // 输出计算结果
    console.log('=== 太阳能系统效率报告 ===');
    console.log(`系统规模: ${panelCount}块 × ${panelPower}W = ${ratedPower}W`);
    console.log(`实际功率: ${actualPower}W`);
    console.log(`系统效率: ${efficiency.toFixed(1)}%`);
    console.log('');
    console.log('=== 发电量统计 ===');
    console.log(`日发电量: ${dailyGeneration.toFixed(2)} kWh`);
    console.log(`月发电量: ${monthlyGeneration.toFixed(2)} kWh`);
    console.log(`年发电量: ${annualGeneration.toFixed(0)} kWh`);
    console.log('');
    console.log('=== 经济效益 ===');
    console.log(`日收入: ¥${dailyIncome.toFixed(2)}`);
    console.log(`月收入: ¥${monthlyIncome.toFixed(2)}`);
    console.log(`年收入: ¥${annualIncome.toFixed(0)}`);
    
    return {
        efficiency: efficiency.toFixed(1),
        dailyGeneration: dailyGeneration.toFixed(2),
        annualIncome: annualIncome.toFixed(0)
    };
}

// 执行计算
const result = calculateSolarEfficiency();</code></pre>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center">
        <span class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
          <span class="text-white text-sm font-bold">2</span>
        </span>
        智能电池管理系统
      </h3>
      
      <div class="mb-4">
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          <strong>任务目标：</strong> 开发电池状态监控程序，根据电量和环境条件做出充放电决策。
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">条件判断</span>
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">逻辑运算</span>
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">状态管理</span>
        </div>
      </div>
      
      <div class="bg-gray-900 rounded-md p-4">
        <pre class="text-purple-400 text-sm"><code># Python - 智能电池管理系统
def smart_battery_manager(battery_level, solar_power, grid_load, time_hour):
    """
    智能电池管理决策系统
    
    参数:
    - battery_level: 电池电量百分比 (0-100)
    - solar_power: 太阳能发电功率 (W)
    - grid_load: 电网负载百分比 (0-100)
    - time_hour: 当前时间 (0-23)
    """
    
    # 定义关键阈值
    BATTERY_LOW = 20
    BATTERY_HIGH = 85
    BATTERY_CRITICAL = 10
    SOLAR_EFFICIENT = 300
    PEAK_HOURS = (18, 22)  # 用电高峰时段
    
    # 状态判断
    is_battery_critical = battery_level <= BATTERY_CRITICAL
    is_battery_low = battery_level <= BATTERY_LOW
    is_battery_high = battery_level >= BATTERY_HIGH
    is_solar_efficient = solar_power >= SOLAR_EFFICIENT
    is_peak_hour = PEAK_HOURS[0] <= time_hour <= PEAK_HOURS[1]
    is_grid_overload = grid_load > 80
    
    # 决策逻辑
    decision = {
        'action': 'monitor',
        'priority': 'normal',
        'reason': '',
        'recommendations': []
    }
    
    # 紧急情况：电池电量极低
    if is_battery_critical:
        decision['action'] = 'emergency_charge'
        decision['priority'] = 'critical'
        decision['reason'] = f'电池电量仅{battery_level}%，进入紧急充电模式'
        decision['recommendations'] = [
            '立即从电网或太阳能充电',
            '关闭非必要负载',
            '启动备用电源（如有）'
        ]
    
    # 智能充电：电量低且太阳能充足
    elif is_battery_low and is_solar_efficient:
        decision['action'] = 'solar_charge'
        decision['priority'] = 'high'
        decision['reason'] = f'电池电量{battery_level}%，太阳能发电{solar_power}W，适合充电'
        decision['recommendations'] = [
            '优先使用太阳能充电',
            '减少不必要的电力消耗'
        ]
    
    # 峰时放电：电量充足且处于用电高峰
    elif is_battery_high and is_peak_hour and is_grid_overload:
        decision['action'] = 'discharge_to_grid'
        decision['priority'] = 'high'
        decision['reason'] = f'电池电量{battery_level}%，峰时电网负载{grid_load}%'
        decision['recommendations'] = [
            '向电网放电，缓解电网压力',
            '获得峰时电价收益'
        ]
    
    # 储能模式：非峰时且太阳能充足
    elif not is_peak_hour and is_solar_efficient and not is_battery_high:
        decision['action'] = 'store_energy'
        decision['priority'] = 'medium'
        decision['reason'] = f'非峰时太阳能发电{solar_power}W，适合储能'
        decision['recommendations'] = [
            '储存太阳能为峰时使用',
            '优化能源利用效率'
        ]
    
    # 正常监控
    else:
        decision['reason'] = '系统运行正常，继续监控'
        decision['recommendations'] = ['保持当前状态']
    
    # 输出决策结果
    print(f"\n=== 电池管理决策 ({time_hour}:00) ===")
    print(f"电池电量: {battery_level}%")
    print(f"太阳能功率: {solar_power}W")
    print(f"电网负载: {grid_load}%")
    print(f"决策: {decision['action']}")
    print(f"优先级: {decision['priority']}")
    print(f"原因: {decision['reason']}")
    print("建议:")
    for i, rec in enumerate(decision['recommendations'], 1):
        print(f"  {i}. {rec}")
    
    return decision

# 测试不同场景
scenarios = [
    (15, 450, 85, 20),  # 电量低，太阳能充足，峰时
    (90, 200, 90, 19),  # 电量高，太阳能一般，峰时
    (8, 100, 60, 14),   # 电量极低，太阳能不足，非峰时
]

for i, (battery, solar, grid, hour) in enumerate(scenarios, 1):
    print(f"\n{'='*50}")
    print(f"场景 {i}:")
    smart_battery_manager(battery, solar, grid, hour)</code></pre>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
        <span class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
          <span class="text-white text-sm font-bold">3</span>
        </span>
        风力发电数据分析
      </h3>
      
      <div class="mb-4">
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          <strong>任务目标：</strong> 使用循环处理风力发电数据，计算平均风速、发电量统计和效率分析。
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">循环遍历</span>
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">数据处理</span>
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">统计分析</span>
        </div>
      </div>
      
      <div class="bg-gray-900 rounded-md p-4">
        <pre class="text-green-400 text-sm"><code>// JavaScript - 风力发电数据分析系统
function analyzeWindPowerData() {
    // 模拟24小时风力发电数据
    const windData = [
        { hour: 0, windSpeed: 3.2, power: 120 },
        { hour: 1, windSpeed: 2.8, power: 95 },
        { hour: 2, windSpeed: 2.5, power: 80 },
        { hour: 3, windSpeed: 3.0, power: 110 },
        { hour: 4, windSpeed: 4.1, power: 180 },
        { hour: 5, windSpeed: 5.2, power: 280 },
        { hour: 6, windSpeed: 6.8, power: 420 },
        { hour: 7, windSpeed: 7.5, power: 520 },
        { hour: 8, windSpeed: 8.2, power: 650 },
        { hour: 9, windSpeed: 9.1, power: 780 },
        { hour: 10, windSpeed: 8.8, power: 720 },
        { hour: 11, windSpeed: 9.5, power: 850 },
        { hour: 12, windSpeed: 10.2, power: 950 },
        { hour: 13, windSpeed: 11.0, power: 1100 },
        { hour: 14, windSpeed: 10.8, power: 1050 },
        { hour: 15, windSpeed: 9.8, power: 880 },
        { hour: 16, windSpeed: 8.5, power: 680 },
        { hour: 17, windSpeed: 7.2, power: 480 },
        { hour: 18, windSpeed: 6.0, power: 350 },
        { hour: 19, windSpeed: 5.5, power: 300 },
        { hour: 20, windSpeed: 4.8, power: 220 },
        { hour: 21, windSpeed: 4.2, power: 190 },
        { hour: 22, windSpeed: 3.8, power: 150 },
        { hour: 23, windSpeed: 3.5, power: 130 }
    ];
    
    // 初始化统计变量
    let totalWindSpeed = 0;
    let totalPower = 0;
    let maxPower = 0;
    let minPower = Infinity;
    let maxWindSpeed = 0;
    let peakHours = [];
    let lowWindHours = [];
    
    console.log('=== 风力发电24小时数据分析 ===\n');
    
    // 遍历数据进行分析
    for (let i = 0; i < windData.length; i++) {
        const data = windData[i];
        const { hour, windSpeed, power } = data;
        
        // 累计统计
        totalWindSpeed += windSpeed;
        totalPower += power;
        
        // 寻找最大最小值
        if (power > maxPower) {
            maxPower = power;
        }
        if (power < minPower) {
            minPower = power;
        }
        if (windSpeed > maxWindSpeed) {
            maxWindSpeed = windSpeed;
        }
        
        // 识别高产时段 (功率 > 500W)
        if (power > 500) {
            peakHours.push(hour);
        }
        
        // 识别低风速时段 (风速 < 4 m/s)
        if (windSpeed < 4) {
            lowWindHours.push(hour);
        }
        
        // 输出每小时数据
        console.log(`${hour.toString().padStart(2, '0')}:00 - ` +
                   `风速: ${windSpeed.toFixed(1)}m/s, ` +
                   `功率: ${power.toString().padStart(4)}W`);
    }
    
    // 计算平均值和统计数据
    const avgWindSpeed = totalWindSpeed / windData.length;
    const avgPower = totalPower / windData.length;
    const dailyGeneration = totalPower / 1000; // 转换为 kWh
    const capacity = 1200; // 假设风机额定功率 1200W
    const capacityFactor = (avgPower / capacity) * 100;
    
    // 输出统计结果
    console.log('\n=== 统计分析结果 ===');
    console.log(`平均风速: ${avgWindSpeed.toFixed(2)} m/s`);
    console.log(`平均功率: ${avgPower.toFixed(0)} W`);
    console.log(`最大功率: ${maxPower} W`);
    console.log(`最小功率: ${minPower} W`);
    console.log(`最大风速: ${maxWindSpeed} m/s`);
    console.log(`日发电量: ${dailyGeneration.toFixed(2)} kWh`);
    console.log(`容量因子: ${capacityFactor.toFixed(1)}%`);
    
    console.log('\n=== 时段分析 ===');
    console.log(`高产时段 (>500W): ${peakHours.length}小时`);
    console.log(`高产时间: ${peakHours.join('时, ')}时`);
    console.log(`低风时段 (<4m/s): ${lowWindHours.length}小时`);
    console.log(`低风时间: ${lowWindHours.join('时, ')}时`);
    
    // 计算经济效益 (假设电价 0.65元/kWh)
    const electricityPrice = 0.65;
    const dailyIncome = dailyGeneration * electricityPrice;
    const monthlyIncome = dailyIncome * 30;
    const annualIncome = dailyIncome * 365;
    
    console.log('\n=== 经济效益分析 ===');
    console.log(`日收入: ¥${dailyIncome.toFixed(2)}`);
    console.log(`月收入: ¥${monthlyIncome.toFixed(2)}`);
    console.log(`年收入: ¥${annualIncome.toFixed(0)}`);
    
    return {
        avgWindSpeed: avgWindSpeed.toFixed(2),
        dailyGeneration: dailyGeneration.toFixed(2),
        capacityFactor: capacityFactor.toFixed(1),
        annualIncome: annualIncome.toFixed(0)
    };
}

// 执行数据分析
const analysis = analyzeWindPowerData();</code></pre>
      </div>
    </div>
  </div>
  
  <div class="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
    <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center">
      <span class="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center mr-2">
        <span class="text-white text-xs">💡</span>
      </span>
      学习建议与下一步
    </h3>
    <div class="grid md:grid-cols-2 gap-4 text-sm">
      <div>
        <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">巩固基础</h4>
        <ul class="space-y-1 text-gray-600 dark:text-gray-400">
          <li>• 多练习变量定义和数据类型转换</li>
          <li>• 熟练掌握各种运算符的使用</li>
          <li>• 理解条件判断的逻辑结构</li>
          <li>• 掌握循环的不同应用场景</li>
        </ul>
      </div>
      <div>
        <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">进阶学习</h4>
        <ul class="space-y-1 text-gray-600 dark:text-gray-400">
          <li>• 学习函数定义和模块化编程</li>
          <li>• 掌握数组和对象的操作方法</li>
          <li>• 了解异步编程和事件处理</li>
          <li>• 学习数据库操作和API调用</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## 小结

通过本章学习，你应该掌握了：

- 变量的声明和使用
- 基本数据类型的特点
- 函数的定义和调用方法
- 条件语句和循环结构的使用
- 各种运算符的应用

这些是编程的基础，熟练掌握后就可以开始更复杂的编程学习了。

## 下一步

建议继续学习：
- 对象和类的概念
- 错误处理机制
- 异步编程基础
- 模块化开发