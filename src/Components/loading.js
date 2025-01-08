import React from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loading = (props) => {
  const { progress, setProgress } = props;
  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        style={{height:"1.5px"}}
      />
    </div>
  )
}
export default Loading;