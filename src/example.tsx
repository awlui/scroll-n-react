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
  private child: any;
  constructor(props) {
    super(props);

    this.state = {
      dataArray: generateDataArray(30)
    }
  }
  componentDidUpdate() {
    console.log('update')
  }
  Foo = () => {
    if (this.state.fetching) {
      return;
    }
  this.setState({
    fetching: true,
    shouldReset: false
  })
  setTimeout(() => {
    this.setState({
      dataArray: [{id: count, val: count++}, ...this.state.dataArray],
      fetching: false,
      shouldReset: false
    })
  }, 1000)
  }
  render() {
    return(
      <div>
      <ScrollRx onRef={ref => {this.child = ref}} height={250} threshold={10} width={200} getMore={this.Foo} anchorBottom component={K} fetching={this.state.fetching} dataArray={this.state.dataArray}/>

      <button onClick={() => {
        this.child.reset();
      }}>Click2</button>
      </div>
    )
  }
}

ReactDOM.render(<TestRig />, document.getElementById('root'));
console.log('yo')

// export {
//   ScrollRx
// }
