import * as React from 'react';
import {iScrollProps} from './interfaces/scroll.interface';
import * as _ from 'lodash';
let styles = require('./styles/scss/scroll.scss');
interface IState {}
/**
  ScrollRx React Component
*/
export class ScrollRx extends React.Component<iScrollProps, IState> {
    /**
    * @param props Props passed from Application to ScrollRx Stateless Component
    */
    constructor(props: iScrollProps) {
      super(props);
    }
    componentWillMount() {
      console.log('mounting')
    }
    render() {
      let {width, height} = this.props;
      return (
        <div onScroll={() => console.log('scrolling...')} className={styles.scroll} style={{height, width, overflowY: 'scroll', }}>
          {
            _.range(10).map(() => (
              <div>Hello</div>
            ))
          }
        </div>
      )
    }
}
