import React from 'react'

export default function SongInfo() {
  return (
    <table className="text-slate-900 p-5 w-[100%]">
      <tbody className="flex flex-col gap-5">
        <tr className="flex gap-5">
          <td className="w-1/6">Title</td>
          <td className="w-full border-2"></td>
        </tr>
        <tr className="flex gap-5">
          <td className="w-1/6">Artist</td>
          <td className="w-full border-2"></td>
        </tr>
        <tr className="flex gap-5">
          <td className="w-1/6">Genre</td>
          <td className="w-full border-2"></td>
        </tr>
      </tbody>
    </table>
  )
}
