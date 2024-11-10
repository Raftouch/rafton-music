export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export function formatDate(date: any): string {
  let parsedDate: Date

  if (typeof date === 'string') {
    parsedDate = new Date(date)
  } else if (date instanceof Date) {
    parsedDate = date
  } else {
    throw new Error('Invalid date format')
  }

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date')
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
