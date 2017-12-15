import * as Enzyme from 'enzyme';
let {shallow, render, mount} = Enzyme;
import * as Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
