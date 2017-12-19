import {ScrollRx} from './scroll';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import  axios from 'axios';

let count = 0;
const K = ({data}: any) => (<div>{data.email}</div>)

function foo() {

}

class TestRig extends React.Component<any, any> {
  private child: any;
  constructor(props) {
    super(props);

    this.state = {
      dataArray: [
      ]
    }
  }
  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=5').then((stuff) =>
      {
        let newstuff = stuff.data.results.map((result) => {
          return {
            ...result, id: count++
          }
        });
        this.setState({
      dataArray: [...this.state.dataArray, ...newstuff]
      })
      })

  }
  componentDidUpdate() {
  }
  Foo = () => {
    if (this.state.fetching) {
      return;
    }
    axios.get('https://randomuser.me/api/?results=1').then(({data}) => {
      let newstuff = data.results.map((result) => {
        return {
          ...result, id: count++
        }
      })
      setTimeout(() => {
        this.setState({
          dataArray: [...newstuff, ...this.state.dataArray],
          fetching: false
        })
      }, 1000)
    });
  this.setState({
    fetching: true,
  })

  }
  render() {
    return(
      <div>
      <ScrollRx onRef={ref => {this.child = ref}} height={300} threshold={0} width={250} getMore={this.Foo} anchorBottom component={K} fetching={this.state.fetching} dataArray={this.state.dataArray}/>
      <button onClick={() => {
        axios.get('https://randomuser.me/api/?results=1').then(({data}) => {
          let newstuff = data.results.map((result) => {
            return {
              ...result, id: count++
            }
          })
          this.setState({
            dataArray: [...newstuff, ...this.state.dataArray]
          })
        })
      }}>Click</button>
      <button onClick={() => {
        this.child.reset();
      }}>Click2</button>
      <button onClick={() => {
        this.setState({
          dataArray: [...this.state.dataArray.slice(0,-1)]
        })
      }}>Pop</button>
      </div>
    )
  }
}

ReactDOM.render(<TestRig />, document.getElementById('root'));

// export {
//   ScrollRx
// }
