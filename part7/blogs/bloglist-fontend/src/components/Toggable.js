import { useState, forwardRef, useImperativeHandle } from "react"

const Toggable = forwardRef((props, ref) => { 
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    
    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
    })
    
    return (
        <>
            {visible? props.children: null}
            <button className='btn-primary' onClick={() => {setVisible(!visible)}}>{visible? 'cancel': props.label}</button>
        </>
        
    )
})

Toggable.displayName = 'Togglable'
  
export default Toggable