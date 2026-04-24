/**
 * 预览区组件 - 带棋盘格背景
 */

interface PreviewAreaProps {
  imageUrl: string | null
  width: number
  height: number
}

export function PreviewArea({ imageUrl, width, height }: PreviewAreaProps) {
  // 计算预览尺寸（适应容器）
  const maxWidth = 800
  const maxHeight = 600
  const scale = Math.min(maxWidth / width, maxHeight / height, 1)
  const previewWidth = width * scale
  const previewHeight = height * scale

  return (
    <div className="flex-1 flex items-center justify-center p-8 overflow-auto" style={{ backgroundColor: '#FBFBFB' }}>
      <div className="relative">
        {/* 棋盘格背景 */}
        <div
          className="rounded-lg overflow-hidden shadow-lg"
          style={{
            width: previewWidth,
            height: previewHeight,
            backgroundColor: '#f0f0f0',
            backgroundImage: `
              linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
              linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
              linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        >
          {/* 占位图 */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Placeholder"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* 尺寸标注 */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium" style={{ color: '#71717A' }}>
          {width} × {height}
        </div>
      </div>
    </div>
  )
}
