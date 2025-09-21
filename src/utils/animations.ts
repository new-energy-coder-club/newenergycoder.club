// 轻量级动画工具，替代framer-motion
// 提供常用的动画效果和组件

import React, { useEffect, useState, useRef } from 'react';

// 动画配置类型
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
}

// 默认动画配置
const defaultConfig: AnimationConfig = {
  duration: 300,
  delay: 0,
  easing: 'ease-out',
  fillMode: 'forwards'
};

// 动画类名映