import dayjs from 'dayjs'

import { DATE_FORMAT } from '~constants/constant'
import { ORG_TIME_STAMP } from '~constants/regex'

export const getFormattedLog = (orgParsedLog: any) => {
  const allTasks = orgParsedLog.children

  // only take the tasks that have time stamp as the h1 level heading
  const validTasks = allTasks
    .map((rec: any, indx: number) => ({ ...rec, indx }))
    .filter(
      ({ title: { content = '' } = {}, level }) =>
        ORG_TIME_STAMP.test(content) && level === 1
    )

  // Include all the H2 level tasks as a children of H1 level task.
  const tasksWithChildTask = validTasks.reduce(
    (acc: object, { indx, title: { content } }, index: number) => {
      const formattedTasks = allTasks
        .slice(indx + 1, validTasks[index + 1]?.indx || -1)
        .filter(({ level }) => level === 2)
        .map(({ properties, tags, title: { content } }) => ({
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
        }))

      // categorizing tasks according to tags especially MEETING, CODING and OTHERS
      const meeting = { tasks: [], time: 0 }
      const coding = { tasks: [], time: 0 }
      const others = { tasks: [], time: 0 }

      formattedTasks.forEach((task: any) => {
        const { tag, content, times } = task
        switch (tag) {
          case 'MEETING':
            meeting.tasks.push(content)
            meeting.time += times.reduce(
              (acc: number, time: number) => acc + +(time / 60.0).toFixed(2),
              0
            )
            break
          case 'CODING':
            coding.tasks.push(content)
            coding.time += times.reduce(
              (acc: number, time: number) => acc + +(time / 60.0).toFixed(2),
              0
            )
            break
          default:
            others.tasks.push(content)
            others.time += times.reduce(
              (acc: number, time: number) => acc + +(time / 60.0).toFixed(2),
              0
            )
            break
        }
      })

      return {
        ...acc,
        [dayjs(new Date(content)).format(DATE_FORMAT)]: {
          meeting,
          coding,
          others
        }
      }
    },
    {}
  )

  return tasksWithChildTask
}
