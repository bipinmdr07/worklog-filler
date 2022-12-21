import { formatOrgLogs, formattedTaskType } from './formatter'

const populateTaggedTask = (tagObj: any, task: formattedTaskType) => {
  const { content, times = [] } = task

  tagObj.tasks.push(content)
  tagObj.time += times.reduce(
    (acc: number, time: number) => acc + +(time / 60.0).toFixed(2),
    0
  )
}

/**
 * Regroup the tasks inside each date as `meeting`, `coding` and `others`
 *
 * @example
 * # Input
 * {
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
 *
 * # Output
 * {
 *    "2022-12-20": [
 *      coding: {
 *        tasks: ['- Work on add content.tsx']
 *        time: 0.5
 *      },
 *      meeting: {
 *        tasks: ['- Meeting with team to discuss architecture']
 *        time: 1.5
 *      },
 *    ]
 * }
 */
const regroupFormattedTasksByTag = (
  formattedTasks: Record<string, formattedTaskType[]>
) => {
  const regroupedResult = Object.keys(formattedTasks).reduce((acc, date) => {
    const tasks: formattedTaskType[] = formattedTasks?.[date]
    const meeting = { tasks: [], time: 0 }
    const coding = { tasks: [], time: 0 }
    const others = { tasks: [], time: 0 }

    tasks.forEach((task: any) => {
      const { tag } = task
      switch (tag) {
        case 'MEETING':
          populateTaggedTask(meeting, task)
          break
        case 'CODING':
          populateTaggedTask(coding, task)
          break
        default:
          populateTaggedTask(others, task)
          break
      }
    })

    return {
      ...acc,
      [date]: {
        meeting,
        coding,
        others
      }
    }
  }, {})

  return regroupedResult
}

export const getFormattedOrgLogs = (orgParsedLog: any) => {
  const allTasks = orgParsedLog.children

  const formattedTasks = formatOrgLogs(allTasks)
  return regroupFormattedTasksByTag(formattedTasks)
}
