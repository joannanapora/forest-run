import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import SignIn from '../../pages/login/sign-in/sign-in.container';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('SignIn', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'sample text',
        });

        store.dispatch = jest.fn();

        component = render(
            <Provider store={store}>
                <SignIn />
            </Provider>
        );

    });

    test('test', () => {


        expect(true).toBeTruthy();
    })
});

