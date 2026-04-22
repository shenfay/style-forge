import type { StyleConfig } from '../types/config'

/**
 * 间距配置映射
 */
export const getSpacingValues = (config: StyleConfig) => {
  const paddingMap = {
    compact: { px: '6px', py: '8px' },
    medium: { px: '12px', py: '12px' },
    relaxed: { px: '16px', py: '16px' },
  }
  
  const cardGapMap = {
    small: '8px',
    medium: '12px',
    large: '16px',
  }
  
  const sectionGapMap = {
    small: '16px',
    medium: '24px',
    large: '32px',
  }
  
  const elementGapMap = {
    compact: '8px',
    medium: '12px',
    relaxed: '16px',
  }
  
  return {
    padding: paddingMap[config.padding],
    cardGap: cardGapMap[config.cardGap],
    sectionGap: sectionGapMap[config.sectionGap],
    elementGap: elementGapMap[config.elementGap],
  }
}

/**
 * 文字排版配置映射
 */
export const getTypographyValues = (config: StyleConfig) => {
  const titleSizeMap = {
    small: '16px',
    medium: '18px',
    large: '20px',
  }
  
  const bodySizeMap = {
    small: '12px',
    medium: '14px',
    large: '16px',
  }
  
  const lineHeightMap = {
    compact: '1.3',
    medium: '1.5',
    relaxed: '1.8',
  }
  
  const titleWeightMap = {
    normal: '400',
    medium: '500',
    bold: '700',
  }
  
  return {
    titleSize: titleSizeMap[config.titleSize],
    bodySize: bodySizeMap[config.bodySize],
    lineHeight: lineHeightMap[config.lineHeight],
    titleWeight: titleWeightMap[config.titleWeight],
  }
}
