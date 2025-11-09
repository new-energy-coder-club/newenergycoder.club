import React from 'react';
import homeGifUrl from '../../NEC-home.gif';

// 替换后的动画展示：使用 GIF 代替 Canvas
export default function ThreeJsAnimation() {
  return (
    <div className="container_distortion-T_UT23 w-full">
      <div className="content-rrUxd3">
        <div className="mx-auto w-full max-w-[1600px]">
          <img
            src={homeGifUrl}
            alt="NEC 动画展示"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}