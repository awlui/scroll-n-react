import {ScrollRx} from './scroll';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {IScrollRx} from './interfaces/scroll.interface';
import * as _ from 'lodash';

function generateDataArray(amt) {
  return _.range(amt).map((num) => {
    return {
      id: num,
      val: num
    }
  });
}
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
  it("Missing Width/Height throws error, respectively", () => {
    expect(mount.bind(this, (<ScrollRx height={null} width={null} component={dummyComponent}/>))).toThrowError('Must include height and width');


  })
});

describe("No Component prop", () => {
  it("Gives an error message in a div", () => {
    const wrapper = mount(<ScrollRx width={100} height={100} component={null}/>);
    expect(wrapper.children().contains(<div>Error Add a component prop</div>)).toEqual(true);
  });
});



describe("component prop to be rendered by ScrollRx", () => {
  let dummyComponent = () => (<div className=".dummy">yo</div>);
  const badWrapper = mount(<ScrollRx width={200} height={200} component={null}/>);
  describe("Contains the right number of dummy Components passed to it", () => {
    it("Contains 1 dummy component if passed into it", () => {
      const wrapper = mount(<ScrollRx width={200} height={200} component={dummyComponent} dataArray={generateDataArray(1)}/>);
      expect(wrapper.find(dummyComponent)).toHaveLength(1);
    });
    it("Contains 2 dummy components if passed into it", () => {
      const wrapper = mount(<ScrollRx width={200} height={200} component={dummyComponent} dataArray={generateDataArray(2)}/>);
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
  it("anchorTop is default, which means the loader appears after content", () => {
    let dummyComponent = () => (<div className=".dummy">yo</div>);
    let wrapper = mount(<ScrollRx width={75} fetching={true} height={75} dataArray={generateDataArray(1)} component={dummyComponent}/>);
    expect(wrapper.children().childAt(1).html()).toEqual('<div class="loader">Loading...</div>')

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
  it("Scrolling to threshold will trigger the getMore callback", () => {
    let dummyComponent = () => (<div className=".dummy">yo</div>);
    let mockCallback = jest.fn();
    let wrapper = mount(<ScrollRx width={75} getMore={mockCallback} anchorBottom height={75} threshold={0} component={dummyComponent}/>);
    expect(mockCallback.mock.calls.length).toEqual(0);
    wrapper.simulate('scroll');
    expect(mockCallback.mock.calls.length).toEqual(1);
  });


});

describe("Placeholder registration", () => {
  let dummyComponent, wrapper;
  beforeEach(() => {
    dummyComponent = ({data}) => (<div className=".dummy">{data.val}</div>);
    wrapper = mount(<ScrollRx width={75} anchorBottom height={75} threshold={0} dataArray={generateDataArray(5)} component={dummyComponent}/>);
    wrapper.setProps({
      dataArray: [{id: 5, val: 5}, ...generateDataArray(5)]
    });
  })
  it("On anchorBottom, the Component will hold on to the previous first Element before a prop update", () => {
    // console.log(wrapper.childAt(0).childAt(2).html())
    expect(wrapper.find('.placeholder').html()).toEqual(wrapper.childAt(0).childAt(1).html());
  });
  it("The placeholder ref will be filled with the correct HTMLElement after a prop update", () => {
    // expect(wrapper.instance().placeholder).toEqual(wrapper.find('.placeholder'))
    expect(wrapper.instance().placeholder.children[0].outerHTML).toEqual(wrapper.childAt(0).childAt(1).childAt(0).html());
  });

});

describe("Loader component", () => {
  it("Will display only when fetching true prop passed in", () => {
    let dummyComponent = ({data}) => (<div className=".dummy">{data.val}</div>);
    let wrapper = mount(<ScrollRx width={75}
       anchorBottom
       height={75}
       loader={(props) => (<div {...props}>LOAD</div>)}
       threshold={0} dataArray={generateDataArray(5)}
       component={dummyComponent}/>);
       expect(wrapper.find('.loader').children()).toHaveLength(0);
  })
  it("Will use what you pass into the loader prop", () => {
    let dummyComponent = ({data}) => (<div className=".dummy">{data.val}</div>);
    let wrapper = mount(<ScrollRx width={75}
       anchorBottom
       height={75}
       loader={(props) => (<div {...props}>LOAD</div>)}
       fetching={true}
       threshold={0} dataArray={generateDataArray(5)}
       component={dummyComponent}/>);
       expect(wrapper.find('.loader').children()).toHaveLength(1);
       expect(wrapper.find('.loader').children().html()).toEqual('<div class="loader">LOAD</div>');
  });
  it("Will use the default loader if no loader is specified", () => {
    let dummyComponent = ({data}) => (<div className=".dummy">{data.val}</div>);
    let wrapper = mount(<ScrollRx width={75}
       anchorBottom
       height={75}
       fetching={true}
       threshold={0} dataArray={generateDataArray(5)}
       component={dummyComponent}/>);
       expect(wrapper.find('.loader').children()).toHaveLength(1);
       expect(wrapper.find('.loader').children().html()).toEqual('<div class="loader">Loading...</div>');

  })
})
