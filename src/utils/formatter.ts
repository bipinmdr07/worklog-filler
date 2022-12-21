import dayjs from 'dayjs'

import { DATE_FORMAT } from '~constants/constant'
import { ORG_TIME_STAMP } from '~constants/regex'

type tagType = 'MEETING' | 'CODING' | 'OTHER'

export type formattedTaskType = {
  content: string
  tag?: tagType
  times?: number[]
}

/**
 * The functions defined in this file (every function) is expected to take list of records and
 * return the task in the specific format.
 *
 * {
 *    "YYYY-MM-DD": [
 *      {
 *        content: string, // task
 *        tag: string, // type of task usually MEETING | OTHER | CODING | OTHERS
 *        times: array of number // Array of times taken in minutes.
 *      }
 *    ]
 * }
 *
 * @example {
 *    "2022-12-20": [
 *      {
 *        content: '- Work on add content.tsx',
 *        tag: 'CODING',
 *        times: [30]
 *      },
 *      {
 *        content: '- Meeting with team to discuss architecture',
 *        tag: 'MEETING',
 *        times: [30, 60] // => 30 mins and 60 mins with break in between
 *      },
 *    ]
 * }
 */
export const formatOrgLogs = (allTasks: any[]) => {
  let obj: Record<string, formattedTaskType[]> = {}
  let currentHeading: string = ''

  allTasks.forEach((task: any) => {
    const { title: { content = '' } = {}, level, properties, tags } = task

    if (level === 1 && ORG_TIME_STAMP.test(content)) {
      currentHeading = dayjs(new Date(content)).format(DATE_FORMAT)
      obj[currentHeading] = []
    } else if (level === 2 && currentHeading && content) {
      const taskObj: formattedTaskType = {
        content: `- ${content.replace(/^\[.\]\s/, '')}`, // removing the checkbox from title, [X] [ ] [-] [?]
        tag: tags[0],
        times: properties
          ?.filter(({ name }) => name === 'CLOCK') // Assuming that the org-clock-in and org-clock-out was done when tracking the task time.
          ?.map(
            ({ value }) =>
              value
                ?.split(' => ')[1] // getting the total duration time e.g.  CLOCK: [2022-12-09 Fri 11:00]--[2022-12-09 Fri 11:30] =>  0:30 -----> 0:30
                ?.split(':') // splitting HOUR and MIN
                ?.reverse()
                ?.reduce(
                  (acc: number, t: number, i: number) =>
                    acc + t * Math.pow(60, i),
                  0
                ) // changing total effort to minutes e.g. 1:30 => 90 minutes
          )
      }

      obj[currentHeading].push(taskObj)
    }
  })

  return obj
}
