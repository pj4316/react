import { Chip } from '@mui/material';
import { Component } from 'react';

const colors = [
  'default',
  'info',
  'success',
  'error',
  'warning',
  'primary',
  'secondary',
];

type ChipProps = {
  size?: 'medium' | 'small',
  variant?: 'filled' | 'outlined'
}

type Element = {
  name: string,
  color?: 'default' | 'info' | 'success' | 'error' | 'warning' | 'primary' | 'secondary'
};

/**
 * 타입을 색이 구분되는 Chip Component 형태로 노출하고 싶을 때에 사용하면 됩니다.
 * @param list = 구분이 필요한 리스트. ex) Object.values(TestType).map(it => ({ name: it, color: ...}))
 * @param chipProp = Chip props
 * @constructor
 */
export const ColorChips = (
  list: string[],
  chipProp?: ChipProps): Map<string, any> => {
  const map = new Map();
  const props = {
    size: chipProp?.size ?? 'small',
    variant: chipProp?.variant ?? 'contained',
  };

  list.forEach((item, index) => {
    // @ts-ignore
    map.set(item, <Chip label={item} color={colors[index % colors.length]} {...props} />);
  });
  return map;
};

export const ColorChipsWithColor = (
  list: Element[],
  chipProp?: ChipProps,
): Map<string, Component> => {
  const map = new Map();
  const props = {
    size: chipProp?.size ?? 'small',
    variant: chipProp?.variant ?? 'contained',
  };

  list.forEach((item, index) => {
    // @ts-ignore
    map.set(item.name, <Chip label={item.name} color={item.color ?? colors[index % colors.length]} {...props} />);
  });
  return map;
};
