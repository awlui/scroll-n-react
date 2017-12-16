import {ScrollRx} from './scroll';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';



// The idea behind this component is that the first round of props will be set
// in the backing instance of the Scroll Component.
describe("Dimensions of Scroll Component determined by props.", () => {
  let dummyComponent = () => (<div className=".dummy">yo</div>);
  const wrapper = shallow(<ScrollRx width={100} height={100} component={dummyComponent}/>, {disableLifecycleMethods: true});


  it("Height determined by props.height", () => {
    expect(wrapper.getElement().props.style.maxHeight).toEqual(100);

  });
  it("Width determined by props.width", () => {
    expect(wrapper.getElement().props.style.width).toEqual(100);
  });
});

describe("Height and width will be registered in the state of the component", () => {

  const wrapper = shallow(<ScrollRx width={200} height={200} component={null} />, { disableLifecycleMethods: true });
  let inst = wrapper.instance()
  it("Height is in the component state", () => {

    expect(wrapper.instance().state.height).toEqual(200);
  });
  it("Width is in the component state", () => {
    expect(wrapper.instance().state.width).toEqual(200);
  });
});

describe("Scroll component should render component passed to it", () => {
  let dummyComponent = () => (<div className=".dummy">yo</div>);
  const badWrapper = mount(<ScrollRx width={200} height={200} component={null}/>);
  describe("Contains the right number of dummy Components passed to it", () => {
    it("Contains 1 dummy component if passed into it", () => {
      const wrapper = mount(<ScrollRx width={200} height={200} component={dummyComponent} dataArray={['example1']}/>);
      expect(wrapper.find(dummyComponent)).toHaveLength(1);
    });
    it("Contains 2 dummy components if passed into it", () => {
      const wrapper = mount(<ScrollRx width={200} height={200} component={dummyComponent} dataArray={['example1', 'example2']}/>);
      expect(wrapper.find(dummyComponent)).toHaveLength(2);
    })
  })
  it("Does not contain dummy component if not passed into it", () => {
    expect(badWrapper.find(dummyComponent)).toHaveLength(0);
  })
});
