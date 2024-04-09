import React from "react";

interface PlayProgressProps {
  left: number; // current play time
  right: number; // 100
  classNameLeftRight: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function PlayProgress({
  left,
  right,
  classNameLeftRight,
  onChange,
}: PlayProgressProps) {
  return (
    <div className="flex gap-2">
      <input
        data-cy="duration-value"
        type="range"
        min={0}
        max={right}
        value={left} // as left will be changed, right is fixed
        onChange={onChange}
      />
      <div className={`text-sm ${classNameLeftRight}`}>
        {left} / {right}
      </div>
    </div>
  );
}
