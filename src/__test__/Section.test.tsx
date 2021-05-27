import { render, fireEvent } from '@testing-library/react-native';
import Section from "../Section";
import React from "react";

test('test section', () => {
    const {getByText} = render(
        <Section description='description here' title='ahihi'/>
    )

    expect(getByText('ahihi')).toBeTruthy();
})
