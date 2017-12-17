import {ScrollRx} from './scroll';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';
import {
  Wave
} from 'better-react-spinkit'
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
      <ScrollRx height={250} threshold={0} width={200} loader={Wave} anchorTop component={K} fetching={this.state.fetching} dataArray={this.state.dataArray}/>
      <button onClick={() => {console.log(count, 'count', this.state);
      this.setState({
        fetching: true
      })
      setTimeout(() => {
        this.setState({
          dataArray: [...this.state.dataArray, {id: count, val: count++}],
          fetching: false
        })
      }, 2000)}}>Click</button>
      </div>
    )
  }
}

ReactDOM.render(<TestRig />, document.getElementById('root'));


// export {
//   ScrollRx
// }
