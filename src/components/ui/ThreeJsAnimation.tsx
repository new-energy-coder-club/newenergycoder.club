import React from 'react';
import homeGifUrl from '../../NEC-home.gif';

// 替换后的动画展示：使用 GIF 代替 Canvas
export default function ThreeJsAnimation() {
  return (
    <div className="container_distortion-T_UT23 w-full">
      <div className="content-rrUxd3">
        <div className="h-full overflow-hidden mx-auto w-full max-w-[1600px]">
          <div className="w-full h-[200px] rounded-lg">
            <img
              src={homeGifUrl}
              alt="NEC 动画展示"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}