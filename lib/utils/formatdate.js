// using dayjs, format date to relative time
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const convertToRelativeTime = (time) => {
  return dayjs().to(dayjs(time))
}
