import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Chunk } from './Chunk.jsx'

export function ConversationFeed({ conversation = { chunks: [] } }) {
  // console.log('Converation: ' + JSON.stringify(conversation))
  return (
    <div className='conversationFeed'>
      <span>
        <u>Conversation Feed</u>
      </span>
      {conversation?.chunks?.map((chunk) => (
        <Fragment key={chunk._id}>
          <Chunk {...chunk} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

ConversationFeed.propTypes = {
  conversation: PropTypes.object,
}
