import {ScrollRx} from './scroll';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {IScrollRx} from './interfaces/scroll.interface';


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

describe("Height and width props to State", () => {

  const wrapper = shallow(<ScrollRx width={200} height={200} component={null} />, { disableLifecycleMethods: true });
  let inst = wrapper.instance()
  it("Height is in the component state", () => {

    expect(wrapper.instance().state.height).toEqual(200);
  });
  it("Width is in the component state", () => {
    expect(wrapper.instance().state.width).toEqual(200);
  });
});

describe("component prop to be rendered by ScrollRx", () => {
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




describe("anchorTop and anchorBottom props", () => {

  it("Adding both anchorTop and anchorBottom to ScrollRx triggers Error", () => {
    expect(mount.bind(this, <ScrollRx width={75} anchorTop anchorBottom height={75} component={null}/>)).toThrow('Choose only one: anchorBottom or anchorTop');
  });
  it("Adding anchor bottom positions ScrollRx scrollbar to the bottom on mounting", () => {
    let wrapper = shallow(<ScrollRx width={75} anchorBottom height={75} component={null}/>, { disableLifecycleMethods: true});
    let inst = wrapper.instance() as IScrollRx;
    inst.main = {
      scrollHeight: 100
    };
    inst.componentDidMount();
    expect(inst.main.scrollTop).toEqual(25);
  });
  it("Adding anchor Top positions ScrollRx scrollbar to the top on mounting", () => {
    let wrapper = mount(<ScrollRx width={75} anchorTop height={75} component={null}/>);
    let inst = wrapper.instance() as IScrollRx;
    expect(inst.main.scrollTop).toEqual(0);
  });
  it("Prop shouldReset should trigger anchorTop or anchorBottom action", () => {
    let wrapper = mount(<ScrollRx width={75} anchorTop height={75} component={null}/>);
    let inst = wrapper.instance() as IScrollRx;
    expect(inst.main.scrollTop).toEqual(0);
    inst.main.scrollTop = 10;
    expect(inst.main.scrollTop).toEqual(10);
    wrapper.setProps({
      shouldReset: true,
      anchorTop: true
    });
    expect(inst.main.scrollTop).toEqual(0);
  });
});

describe("Threshold prop", () => {
  it("The threshold will be equal to the value passed in when the anchorBottom prop is passed in", () => {
    let wrapper = shallow(<ScrollRx width={75} anchorBottom height={75} threshold={0} component={null}/>, { disableLifecycleMethods: true});
    let inst = wrapper.instance() as IScrollRx;
    inst.main = {
      scrollHeight: 100
    };
    inst.componentDidMount();
    expect(inst.state['threshold']).toEqual(0);
  });
  it("The threshold will default to zero", () => {
    let wrapper = shallow(<ScrollRx width={75} anchorBottom height={75} component={null}/>, { disableLifecycleMethods: true});
    let inst = wrapper.instance() as IScrollRx;
    inst.main = {
      scrollHeight: 100
    };
    inst.componentDidMount();
    expect(inst.state['threshold']).toEqual(0);
  });
  it("The threshold will be equal to the value passed in plus, the scrollHeight minus the height, when the anchorTop prop is passed in", () => {
    let wrapper = shallow(<ScrollRx width={75} anchorTop height={75} threshold={1} component={null}/>, { disableLifecycleMethods: true});
    let inst = wrapper.instance() as IScrollRx;
    inst.main = {
      scrollHeight: 100
    };
    inst.componentDidMount();
    expect(inst.state['threshold']).toEqual(24);
  });
})

describe("Scrolling Event", () => {
  it("Scrolling Event should trigger _onScroll callback", () => {
    let wrapper = mount(<ScrollRx width={75} anchorTop height={75} component={null}/>);
    let inst = wrapper.instance() as IScrollRx;
    let mockCallback = jest.fn();
    inst._onScroll = mockCallback();
    wrapper.simulate('scroll');
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
  it("Scrolling to threshold will trigger the _defaultGetMore callback", () => {
    let wrapper = mount(<ScrollRx width={75} anchorTop height={75} threshold={0} component={null}/>);
  })
});
