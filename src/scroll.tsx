import * as React from 'react';
import {iScrollProps} from './interfaces/scroll.interface';
import * as _ from 'lodash';
let styles = require('./styles/scss/scroll.scss');
interface IState {
  paddingTop: number,
  component: React.ReactElement<any>
}
/**
  ScrollRx React Component
*/
export class ScrollRx extends React.Component<iScrollProps, IState> {
    private main: any;
    private secondary: any;
    /**
    * @param props Props passed from Application to ScrollRx Stateless Component
    */
    constructor(props: iScrollProps) {
      super(props);
      // this.state = {
      //   paddingTop: 0
      // }
    }
    componentWillMount() {
      console.log('mounting')
    }
    componentDidMount() {
      // console.log(this.props.height, this.main.scrollHeight)
      // this.setState({
      //   paddingTop: (this.props.height > this.main.scrollHeight) ? (this.props.height - this.main.scrollHeight) : 0
      // });
      // this.main.scrollTop = this.main.scrollHeight - this.props.height;
    }

    render() {
      // let {width, height} = this.props;
      return (
        <div>
          Here
        </div>
      )
    }
}
// <div
//   ref={(main) => {this.main = main;}}
//   onScroll={() => console.log('scrolling...', this.main.scrollHeight - height)}
//   className={styles.scroll}
//   style={{paddingTop: this.state.paddingTop, maxHeight: height, width, overflowY: 'scroll', }}>
//   {
//     _.range(20).map(() => (
//       <div>Hello</div>
//     ))
//   }
//   <div ref={(secondary) => {this.secondary = secondary;}} >Secondary</div>
// </div>
