import { screen, render } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// test('TEST 1: Blog rendering title and author only', () => {
//   const blog = {
//     title: 'Harry Potter',
//     author: 'JK Rowling',
//     url: 'www.harrypotter.com',
//     likes: '0',
//   }

//   render(<Blog blog={blog} />)
//   const element1 = screen.getByText('Harry Potter', { exact: false })
//   const element2 = screen.queryByText('www.harrypotter.com')
//   const element3 = screen.queryByText('0')
//   expect(element1).toBeDefined()
//   expect(element2).toBeNull()
//   expect(element3).toBeNull()
// })

// test('TEST 2: ', async () => {
//   const blog = {
//     title: 'Harry Potter',
//     author: 'JK Rowling',
//     url: 'www.harrypotter.com',
//     likes: '5',
//   }
//   render(<Blog blog={blog} />)
//   const user = userEvent.setup()
//   const button = screen.getByText('View')
//   await user.click(button)

//   const urlElement = screen.getByText('www.harrypotter.com', { exact: false })
//   const likesElement = screen.getByText('5', { exact: false })

//   expect(urlElement).toBeInTheDocument()
//   expect(likesElement).toBeInTheDocument()
// })

test('TEST 3: ', async () => {
  const blog = {
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'www.harrypotter.com',
    likes: '5',
  }
  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const urlElement = screen.getByText('www.harrypotter.com', { exact: false })
  const likesElement = screen.getByText('5', { exact: false })

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})
