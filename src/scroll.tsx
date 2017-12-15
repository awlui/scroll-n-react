import * as React from 'react';
import {iScrollProps} from './interfaces/scroll.interface';
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
        <div style={{height, width}}>Scroll</div>
      )
    }
}
