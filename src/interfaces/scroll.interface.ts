import * as React from 'react';
import {ScrollRx} from '../scroll';
export interface iScrollProps extends React.Props<ScrollRx> {
  width: number,
  height: number,
  shouldReset?: boolean,
  component: React.StatelessComponent<{data: any}>,
  dataArray?: any[],
  threshold?: number,
  getMore?: Function
}
