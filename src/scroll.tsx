import * as React from 'react';
import {iScrollProps} from './interfaces/scroll.interface';
import * as _ from 'lodash';
let styles = require('./styles/scss/scroll.scss');
export interface IState {
  paddingTop: number,
  height: number,
  width: number
}

/**
scrollHeight: length of entire scrollable area;
scrollTop: length of top of scroll window to top of scrollable area;
*/

/**
  ScrollRx React Component
*/
export class ScrollRx extends React.Component<iScrollProps, IState> {
    private main: any;
    /**
    * @param props Props passed from Application to ScrollRx Stateless Component
    */
    constructor(props: iScrollProps) {
      super(props);
      this.state = {
        paddingTop: 0,
        height: this.props.height || 0,
        width: this.props.width || 0

      }
    }
    componentWillMount() {
    }
    componentDidMount() {
      this.setState({
        paddingTop: (this.props.height > this.main.scrollHeight) ? (this.props.height - this.main.scrollHeight) : 0
      });
      this.main.scrollTop = this.main.scrollHeight - this.props.height;
    }
    componentDidUpdate() {
      let {height, width, shouldReset} = this.props;
      if (shouldReset !== false) {
        this.main.scrollTop = this.main.scrollHeight - this.state.height;
      }
    }
    render() {
      let {width = 0, height = 0, component, dataArray=[]} = this.props;
      let Zcomponent = component;
      return (
      <div
        ref={(main) => {this.main = main;}}
        onScroll={() => console.log('scrolling...', this.main.scrollTop, this.main.scrollHeight, this.state.height)}
        className={styles.scroll}
        style={{paddingTop: this.state.paddingTop, maxHeight: height, width, overflowY: 'scroll', }}>
        {Zcomponent ? dataArray.map((data: (string | number), i: number) => (
          <Zcomponent key={i} data={data}/>
        )) : <div>Error Add a component prop</div>
        }
      </div>
      )
    }
    private _onScroll = () => {

    }
}
