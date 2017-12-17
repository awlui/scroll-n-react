import * as React from 'react';
import {IScrollProps, IState, IScrollRx, IgetMoreData} from './interfaces/scroll.interface';
import * as _ from 'lodash';
let styles = require('./styles/scss/scroll.scss');
import {
  FadingCircle,
  Wave
} from 'better-react-spinkit';

/**
Notes
scrollHeight: length of entire scrollable area;
scrollTop: length of top of scroll window to top of scrollable area;
*/

/**
  ScrollRx React Component
*/
export class ScrollRx extends React.Component<IScrollProps, IState> {
    /**
    * Holds the underlying div DOM Element
    */
    private main: HTMLElement;
    /**
    * Part of the anchorBottom strategy ofkeeping the scrollbar in placeholder
    * on a getMore call. This holds the ref of the top element from the last set of data.
    */
    private placeholder: HTMLElement;
    /**
    * Holds the id of the placeholder.
    */
    private placeholderID: number;
    /* React Lifecycle Methods */
    constructor(props: IScrollProps) {
      super(props);
      let {anchorTop, anchorBottom} = props;
      if (!!anchorTop && !!anchorBottom) {
        throw new Error('Choose only one: anchorBottom or anchorTop');
      }
      if (!anchorTop && !anchorBottom) {
        anchorTop = true;
      }
      this.state = {
        paddingTop: 0,
        height: props.height || 0,
        width: props.width || 0,
        anchorBottom: anchorBottom,
        anchorTop: anchorTop,
        Loader: props.loader || ((props) => (<div {...props}>Loading...</div>))
      }
    }

    componentDidMount() {
      this.setState({
        paddingTop: (this.props.height > this.main.scrollHeight) ? (this.props.height - this.main.scrollHeight) : 0
      });
      let {anchorBottom, anchorTop, threshold = 0} = this.props;
      if (!!anchorBottom) {
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
      let {height, width, shouldReset, fetching} = this.props;
      let {anchorBottom, anchorTop} = this.state;
      if (shouldReset === true && anchorBottom) {
          this.main.scrollTop = this.main.scrollHeight - this.state.height;
      } else if (shouldReset === true && anchorTop){
        this.main.scrollTop = 0;
      } else if (this.placeholder && !fetching) {
        if (this.main.scrollTop < (this.placeholder.offsetTop - this.main.offsetTop)) {
          this.main.scrollTop = (this.placeholder.offsetTop - this.main.offsetTop)
        }
      }
    }
    componentWillUpdate() {
      let {dataArray, anchorBottom} = this.props;
      if (!!anchorBottom && dataArray) {
        this.placeholderID = dataArray[0].id;
      }
    }
    render() {
      let {width = 0, height = 0, component, dataArray=[], getMore=this._defaultGetMore, fetching} = this.props;
      let {anchorTop, anchorBottom, Loader} = this.state;
      let Zcomponent = component;
      let lastIndex = dataArray.length - 1;

      return (
      <div
        ref={(main) => {this.main = main;}}
        onScroll={this._onScroll.bind(this, getMore)}
        className={styles.scroll}
        style={{paddingTop: this.state.paddingTop, maxHeight: height, width, overflowY: 'scroll', }}>
        {
          fetching && anchorBottom ? <Loader className="loader"/> : null
        }
        {
          Zcomponent ? dataArray.map((data: IgetMoreData, i: number) => {
          return (data.id === this.placeholderID ?
            (<div className='placeholder' key={data.id} ref={(placeholder) => this.placeholder = placeholder}><Zcomponent data={data}/></div>)
             : <Zcomponent key={data.id} data={data}/>)
        })
        : <div>Error Add a component prop</div>
        }
        {
          fetching && anchorTop ? <Loader className="loader"/> : null
        }
      </div>
      )
    }

    /* Exclusive Library Methods */

    _onScroll = (cb: Function) => {
      let {fetching} = this.props;
      if (this.state.anchorBottom) {
        if ((this.main.scrollTop <= this.state.threshold) && !fetching) {
          cb();
        }
      } else {
        if ((this.main.scrollTop >= this.state.threshold) && !fetching) {
          cb();
        }
      }
    }
    /**
    * @returns This is the default function for the getMore Prop.
    */
    _defaultGetMore = () => {
      console.log('Add Your Own Get More Function!');
    }
}
