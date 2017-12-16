import {ScrollRx} from './scroll';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';
const K = ({data}: any) => (<div>{data}</div>)
ReactDOM.render(<ScrollRx height={250} threshold={0} width={200} anchorBottom component={K} dataArray={_.range(30)}/>, document.getElementById('root'));


// export {
//   ScrollRx
// }
