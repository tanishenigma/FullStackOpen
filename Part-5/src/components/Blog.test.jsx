// import { screen, render } from '@testing-library/react'
// import Blog from './Blog'
// import userEvent from '@testing-library/user-event'

// //Searching Content in a Component
// test('renders content', () => {
//   const blog = {
//     title: 'Harry Potter',
//     author: 'JK Rowling',
//     url: 'www.harrypotter.com',
//   }
//   //A-> render(<Blog blog={blog} />)
//   const { container } = render(<Blog blog={blog} />)

//   //A1 const element = screen.getByText('Harry Potter')
//   /* In case we have our text being rendered as a dynamic variable getByText would not work so we use the following methods.
//    */

//   //A2 const element = screen.getByText('Harry Potter', { exact: false })

//   //A3 const element = screen.findByText('Harry Potter') //--> Returns a Promise.

//   //A expect(element).toBeDefined()

//   // const div = container.querySelector('.blog')
//   // expect(div).toHaveTextContent('Potter') //can use CSS query Selectors but it is better to use the ones mentioned above.
// })

// test('Does not render this', () => {
//   const blog = {
//     title: 'Harry Potter',
//     author: 'JK Rowling',
//     url: 'www.harrypotter.com',
//   }
//   render(<Blog blog={blog} />)

//   const element = screen.queryByText('do not want this thing to be rendered')
//   expect(element).toBeNull()
// })

// //Debugging Tests
// test('renders content', async () => {
//   const blog = {
//     title: 'Harry Potter',
//     author: 'JK Rowling',
//     url: 'www.harrypotter.com',
//   }
//   render(<Blog blog={blog} />)

//   const element = await screen.findByText('Harry Potter')
//   screen.debug(element)
//   expect(element).toBeDefined()
// })
