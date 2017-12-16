import {ScrollRx} from './scroll';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';
const K = ({data}: any) => (<div>{data}</div>)
ReactDOM.render(<ScrollRx height={250} threshold={20} width={200} anchorTop component={K} shouldReset={true} dataArray={_.range(30)}/>, document.getElementById('root'));


// export {
//   ScrollRx
// }
