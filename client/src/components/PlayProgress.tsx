import React from 'react'

interface PlayProgressProps {
  left: number // current play time
  right: number // 100
  onChange: () => void
}

export default function PlayProgress({
  left,
  right,
  onChange,
}: PlayProgressProps) {
  return (
    <div className="flex">
      <input
        type="range"
        min={left}
        max={right}
        value={left} // as left will be changed, right is fixed
        onChange={onChange}
      />
      <div>
        {left} / {right}
      </div>
    </div>
  )
}
