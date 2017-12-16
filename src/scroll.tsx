import * as React from 'react';
import {IScrollProps, IState, IScrollRx} from './interfaces/scroll.interface';
import * as _ from 'lodash';
let styles = require('./styles/scss/scroll.scss');


/**
Notes
scrollHeight: length of entire scrollable area;
scrollTop: length of top of scroll window to top of scrollable area;
*/

/**
  ScrollRx React Component
*/
export class ScrollRx extends React.Component<IScrollProps, IState> {
    // Holds the component instance
    private main: any;

    /* React Lifecycle Methods */
    constructor(props: IScrollProps) {
      super(props);
      this.state = {
        paddingTop: 0,
        height: props.height || 0,
        width: props.width || 0,
        anchorBottom: props.anchorBottom,
        anchorTop: props.anchorTop
      }
    }

    componentDidMount() {
      this.setState({
        paddingTop: (this.props.height > this.main.scrollHeight) ? (this.props.height - this.main.scrollHeight) : 0
      });
      let {anchorBottom, anchorTop, threshold = 0} = this.props;
      if (!!anchorTop && !!anchorBottom) {
        throw new Error('Choose only one: anchorBottom or anchorTop');
      } else if (!!anchorBottom) {
      this.main.scrollTop = this.main.scrollHeight - this.props.height;
      this.setState({
        threshold
      });
    } else {
      this.main.scrollTop = 0;
      this.setState({
        threshold: (this.main.scrollHeight - this.props.height) - threshold
      });
    }
    }
    componentDidUpdate() {
      let {height, width, shouldReset} = this.props;
      let {anchorBottom, anchorTop} = this.state;
      if (shouldReset === true && anchorBottom) {
          this.main.scrollTop = this.main.scrollHeight - this.state.height;
      } else if (shouldReset === true && anchorTop){
        this.main.scrollTop = 0;
      }
    }
    render() {

      let {width = 0, height = 0, component, dataArray=[], getMore=this._defaultGetMore} = this.props;
      let Zcomponent = component;
      return (
      <div
        ref={(main) => {this.main = main;}}
        onScroll={this._onScroll}
        className={styles.scroll}
        style={{paddingTop: this.state.paddingTop, maxHeight: height, width, overflowY: 'scroll', }}>
        {Zcomponent ? dataArray.map((data: (string | number), i: number) => (
          <Zcomponent key={i} data={data}/>
        )) : <div>Error Add a component prop</div>
        }
      </div>
      )
    }

    /* Exclusive Library Methods */

    private _onScroll = (): void => {
      if (this.state.anchorBottom) {
        if (this.main.scrollTop <= this.state.threshold) {
          console.log('hit')
        }
      } else {
        if (this.main.scrollTop >= this.state.threshold) {
          console.log('hit')
        }
      }
    }
    /**
    * @returns This is the default function for the getMore Prop.
    */
    private _defaultGetMore = (): void => {
      console.log('Add Your Own Get More Function!');
    }
}
