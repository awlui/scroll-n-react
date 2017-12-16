import * as React from 'react';
import {ScrollRx} from '../scroll';
interface IScrollRx extends React.Component {
  main: any,
  _onScroll: Function,
  _defaultGetMore: Function
}
interface IState {
  paddingTop: number,
  height: number,
  width: number,
  anchorBottom?: boolean,
  anchorTop?: boolean,
  threshold?: number,
  fetching?: boolean
}

interface IScrollProps extends React.Props<ScrollRx> {
  /**
  * Width of the entire prop component
  */
  width?: number,
  /**
  * Height of the entire prop component
  */
  height?: number,
  /**
  * Boolean that determines whether, in conjunction with anchor(Top|Bottom), the scrollbar is
  * scrolled to the top or bottom when the component updates.
  */
  shouldReset?: boolean,
  /**
  * The component that is to be mapped to a data set and fill the scroll component.
  */
  component?: React.StatelessComponent<{data: any}>,
  /**
  *  An array of data that may come initially or upon subsequent getMore requests.
  */
  dataArray?: any[],
  /**
  * Determines how many pixels from the bottom or top that the getMore function should fire.
  */
  threshold?: number,
  /**
  *  The function that will fire when the threshold is reached. Popular use case: Ajax hook.
  */
  getMore?: Function,
  /**
  *  On start up and subsequent resets, pulls the scrollbar up.
  */
  anchorTop?: boolean,
  /**
  * on start up and subsequent resets, pulls the scrollbar down.
  */
  anchorBottom?: boolean,
  /**
  * Fetching prop that enclosing app will be responsible for passing down.
  */
  fetching?: boolean
}
interface IgetMoreData {
  id: number
}
export {
  IState, IScrollProps, IScrollRx, IgetMoreData
}
