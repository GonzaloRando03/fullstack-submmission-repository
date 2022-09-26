import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import Toggable from '../components/Toggable'

describe('<Togglable />', () => {
    let blog = {
        title:'blog1',
        author:'Gonzalo',
        url: 'https://gonzalo.com',
        likes: 12
    }

    let component
  
    beforeEach(() => {
      component = render(
            <div className='blogs'>
                {blog.title}
                <Toggable label={'show'}>
                    <Blog className='blog'  blog={blog}/>
                </Toggable>
                <br/>
            </div>
      )
    })
  
    test('show only title', () => {
      expect(
        component.container.querySelector('.blogs')
      ).toBeDefined()

      expect(
        component.container.querySelector('.blog')
      ).toBeNull()
    })

  
    test('after clicking the button, children are displayed', () => {
      const button = component.getByText('show')
      fireEvent.click(button)
  
      const toggableBlog = component.container.querySelector('.blog')
      expect(toggableBlog).toBeDefined()
    })


    test('clicking 2 times the button', () => {
        const mockHandler = jest.fn()

        const componentHandler = render(
            <Blog className='blog' blog={blog} toggleImportance={mockHandler}/>
        )

        const buttonShow = componentHandler.getByText('Like')
        fireEvent.click(buttonShow)
        fireEvent.click(buttonShow)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
  
  })