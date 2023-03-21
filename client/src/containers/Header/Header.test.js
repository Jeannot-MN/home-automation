import React from "react";
import { shallow } from "enzyme";
import { Header } from "./Header.jsx";

describe("<Header />", () => {
  
  it("renders without crashing", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toBeTruthy();
  });
});
