import * as React from 'react';
import {IScrollProps, IState, IScrollRx, IgetMoreData} from './interfaces/scroll.interface';

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
      } else if (!this.props.width || !this.props.height){
        throw new Error('Must include height and width');
      }
      this.state = {
        paddingTop: 0,
      }
    }
    componentDidMount() {
      let {onRef} = this.props;
      if (onRef) {
        onRef(this);
      }
      this.setState({
        paddingTop: 0
      })
      let {anchorBottom, anchorTop=(anchorBottom ? false : true), threshold = 0} = this.props;
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
    componentWillUnmount() {
      let {onRef} = this.props;
      if (onRef) {
        onRef(undefined);
      }
      this.props.onRef(undefined);
    }
    reset() {
      let {anchorBottom, anchorTop, height} = this.props;
      if (anchorBottom) {
        this.main.scrollTop = this.main.scrollHeight - height;
      } else {
        this.main.scrollTop = 0;
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      return (nextProps !== this.props) || nextState.realHeight !== this.state.realHeight || (this.state.paddingTop !== nextState.paddingTop)
    }
    componentDidUpdate(prevProps) {
      if (prevProps.dataArray.length === 0 && this.props.anchorBottom) {
          this.main.scrollTop = this.main.scrollHeight - this.props.height
      }
      let {height, width, fetching} = this.props;
      let {scrollHeight} = this.main;
      let {paddingTop} = this.state;
      let realHeight = scrollHeight-paddingTop;
      if (height > realHeight) {
        this.setState({
          paddingTop: (height - realHeight),
          realHeight
        })
      } else {
        this.setState({
          paddingTop: 0
        })
      }
      let {anchorBottom, anchorTop=(anchorBottom ? false : true)} = this.props;
      if (this.placeholder && !fetching && anchorBottom && height < scrollHeight) {
        if (this.main.scrollTop < (this.placeholder.offsetTop - this.main.offsetTop)) {
          this.main.scrollTop = (this.placeholder.offsetTop - this.main.offsetTop)
        }
      }
    }
    componentWillUpdate() {
      let {dataArray, anchorBottom} = this.props;
      if (!!anchorBottom && dataArray && dataArray[0]) {
        this.placeholderID = dataArray[0].id;
      }
    }
    render() {
      let {width,
        height,
        component,
        dataArray=[],
        getMore=this._defaultGetMore,
        fetching,
        loader=((props) => (<div {...props}>Loading...</div>)),
        className,
        anchorBottom,
        anchorTop=(anchorBottom ? false : true)
        } = this.props;
      let Zcomponent = component;
      let Loader = loader
      let lastIndex = dataArray.length - 1;
      return (
      <div
        ref={(main) => {this.main = main;}}
        onScroll={this._onScroll.bind(this, getMore)}
        className={className}
        style={{paddingTop: this.state.paddingTop,
                maxHeight: height,
                width,
                overflowY: 'scroll',
                wordWrap: 'break-word'
              }}>
        {
          fetching && anchorBottom ? <Loader className='loader'/> : null
        }
        {
          Zcomponent ? dataArray.map((data: IgetMoreData, i: number) => {
          return (data.id === this.placeholderID ?
            (<div className='placeholder' key={data.id} ref={(placeholder) => {this.placeholder = placeholder;}}><Zcomponent data={data}/></div>)
             : <Zcomponent key={data.id} data={data}/>)
        })
        : <div>Error Add a component prop</div>
        }
        {
          fetching && anchorTop ? <Loader className='loader'/> : null
        }
      </div>
      )
    }

    /* Exclusive Library Methods */

    _onScroll = (cb: Function) => {
      let {fetching=false, threshold=0, anchorBottom} = this.props;
      if (anchorBottom) {
        if ((this.main.scrollTop <= threshold) && !fetching) {
          cb();
        }
      } else {
        if ((this.main.scrollTop >= threshold) && !fetching) {
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
