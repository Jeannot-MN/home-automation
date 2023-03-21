import React from "react";
import { shallow } from "enzyme";
import { Layout } from "./Layout.jsx";
import SideDrawer from '../../containers/SideDrawer/SideDrawer.jsx';

describe("<Layout />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper).toBeTruthy();
  });

  it("should have a SideDrawer with open prop if 'isSideDrawerOpen' is passed true", () => {
    const wrapper = shallow(<Layout isSideDrawerOpen={true} />);
    const sideDrawer = wrapper.find(SideDrawer);
    expect(sideDrawer.props().isOpen).toBe(true);
  });
});
