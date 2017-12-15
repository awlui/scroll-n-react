import {ScrollRx} from './scroll';
import {shallow} from 'enzyme';
import * as React from 'react';



describe("Dimensions of Scroll Component determined by props.", () => {
  const wrapper = shallow(<ScrollRx width={100} height={100}/>);
  it("Height determined by props.height", () => {
    expect(wrapper.getElement().props.style.height).toEqual(100);
  });
  it("Width determined by props.width", () => {
    expect(wrapper.getElement().props.style.width).toEqual(100);
  });
});
