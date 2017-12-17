import {ScrollRx} from './scroll';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';

const K = ({data}: any) => (<div>{data.val}</div>)
function generateDataArray(amt) {
  return _.range(amt).map((num) => {
    return {
      id: num,
      val: num
    }
  });
}
let count = 30;
class TestRig extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      dataArray: generateDataArray(30)
    }
  }
  componentDidUpdate() {
    console.log('update')
  }
  render() {
    return(
      <div>
      <ScrollRx height={250} threshold={0} width={200} anchorBottom component={K} shouldReset={this.state.shouldReset} fetching={this.state.fetching} dataArray={this.state.dataArray}/>
      <button onClick={() => {

      this.setState({
        fetching: true,
      })
      setTimeout(() => {
        this.setState({
          dataArray: [...this.state.dataArray, {id: count, val: count++}],
          fetching: false
        })
      }, 2000)}}>Click</button>
      <button onClick={() => {

      this.setState({
        shouldReset: true,
      })
      }}>Click2</button>
      </div>
    )
  }
}

ReactDOM.render(<TestRig />, document.getElementById('root'));


// export {
//   ScrollRx
// }
