import { screen, render } from '@testing-library/react'
import Blog from './Blog'

test('Blog rendering title and author only', () => {
  const blog = {
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'www.harrypotter.com',
    likes: '0',
  }

  render(<Blog blog={blog} />)
  const element1 = screen.getByText('Harry Potter')
  const element2 = screen.queryByText('www.harrypotter.com')
  expect(element1).toBeDefined()
  expect(element2).toBeNull()
})
