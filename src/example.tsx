import {ScrollRx} from './scroll';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import  axios from 'axios';
import {
  Wave
} from 'better-react-spinkit';

let Wave2 = () => (<div style={{display: 'flex', justifyContent: 'center'}}><Wave /></div>)
let count = 0;
const K = ({data}: any) => (<div><img style={{display: 'block'}} src={data.picture.thumbnail} height='42' width='42' />{data.email}</div>)

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
    axios.get('https://randomuser.me/api/?results=2').then(({data}) => {
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
      <div className={this.props.className}>
      <ScrollRx onRef={ref => {this.child = ref}} height={300} loader={Wave2} threshold={0} width={250} getMore={this.Foo} anchorBottom component={K} fetching={this.state.fetching} dataArray={this.state.dataArray}/>
      <button onClick={() => {
        axios.get('https://randomuser.me/api/?results=1').then(({data}) => {
          let newstuff = data.results.map((result) => {
            return {
              ...result, id: count++
            }
          })
          this.setState({
            dataArray: [...this.state.dataArray, ...newstuff]
          })
        })
      }}>Add2ToBottom</button>
      <button onClick={() => {
        this.child.reset();
      }}>Reset scrollbar</button>
      <button onClick={() => {
        this.setState({
          dataArray: [...this.state.dataArray.slice(0,-1)],
          fetching: false
        })
      }}>PopOffBottom</button>
      </div>
    )
  }
}

ReactDOM.render(<TestRig className={'test'}/>, document.getElementById('root'));

// export {
//   ScrollRx
// }
