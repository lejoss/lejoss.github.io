import React from 'react';
// import { render, waitForElement } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
// import { Page } from './Page';
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  mockedAxios.get.mockClear();
});

function mockPostsCall() {
  mockedAxios.get.mockResolvedValue({
    data: {
      posts: [
        {
          userId: 1,
          id: 1,
          title: "sunt aut",
          body: "body message"
        },
        {
          userId: 1,
          id: 2,
          title: "old post",
          body: "body message two"
        },
      ]
    }
  });
}

test('show loader when its fetching data, then render posts', async () => {
  mockPostsCall();
})

test('read and write from local storage', () => {})

