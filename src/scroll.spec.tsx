import {ScrollRx} from './scroll';
import {shallow} from 'enzyme';
import * as React from 'react';


// The idea behind this component is that the first round of props will be set
// in the backing instance of the Scroll Component.
describe("Dimensions of Scroll Component determined by props.", () => {
  const wrapper = shallow(<ScrollRx width={100} height={100}/>);
  it("Height determined by props.height", () => {
    expect(wrapper.getElement().props.style.maxHeight).toEqual(100);
  });
  it("Width determined by props.width", () => {
    expect(wrapper.getElement().props.style.width).toEqual(100);
  });
});

describe("Height and width will be registered in the state of the component", () => {
  const wrapper = shallow(<ScrollRx width={200} height={200} />);
  it("Height is in the component state", () => {
    expect(wrapper.instance().state.height).toEqual(200);
  });
  it("Width is in the component state", () => {
    expect(wrapper.instance().state.width).toEqual(200);
  });
});

describe("Scroll component should render component passed to it", () => {
  let dummyComponent = (<div />);
  const wrapper = shallow(<ScrollRx width={200} height={200} component={dummyComponent} />);
  const badWrapper = shallow(<ScrollRx width={200} height={200} component={null}/>);
  it("Contains dummy component if passed into it", () => {
    expect(wrapper.contains(dummyComponent)).toEqual(true);
  });
  it("Does not contain dummy component if not passed into it", () => {
    expect(badWrapper.contains(dummyComponent)).toEqual(false);
  })
});
