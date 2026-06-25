import React from 'react'
import ConversationItem from './ConversationItem'
interface ConversationListProps{
    children:React.ReactNode
}
function ConversationList({children}:ConversationListProps) {
  return (
    <div className='flex flex-col gap-2 '>
       {children}
    </div>
  )
}

export default ConversationList
