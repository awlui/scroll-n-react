import * as React from 'react';
import {ScrollRx} from '../scroll';
interface IScrollRx extends React.Component {
  main: any,
  _onScroll: Function,
  _defaultGetMore: Function,
  reset: Function
}
interface IState {
  paddingTop: number,
  threshold?: number
}

interface IScrollProps extends React.Props<ScrollRx> {
  /**
  * Width of the entire prop component
  */
  width: number,
  /**
  * Height of the entire prop component
  */
  height: number,
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
  fetching?: boolean,
  /**
  * Loader for fetching data
  */
  loader?: React.StatelessComponent<any>,
  /**
  * Class name for the top level scroll component
  */
  className?: string,
  onRef?: Function
}
interface IgetMoreData {
  id: number
}
export {
  IState, IScrollProps, IScrollRx, IgetMoreData
}
