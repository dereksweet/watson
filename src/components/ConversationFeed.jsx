import { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Chunk } from './Chunk.jsx'

export function ConversationFeed({ conversation = { chunks: [] } }) {
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [conversation]) // Scrolls when conversation updates

  return (
    <div className='conversation-feed' ref={feedRef}>
      <div className='messages'>
        {conversation?.chunks?.map((chunk) => (
          <Fragment key={chunk._id}>
            <Chunk {...chunk} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

ConversationFeed.propTypes = {
  conversation: PropTypes.object,
}
