import React, { useState } from 'react'

import type { PlasmoContentScript, PlasmoGetStyle } from "plasmo"
import dayjs from 'dayjs'
import { fireEvents } from '~utils/fireEvents'
import { DATE_FORMAT, validTags } from '~constants/constant'

import contentStyle from 'data-text:./style.css';

export const config: PlasmoContentScript = {
  matches: ["https://vyaguta.lftechnology.com/attendance/worklogs/*"],
}

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = contentStyle;
  return style;
}

const WorklogFiller = () => {
  const today = dayjs().format(DATE_FORMAT)
  const [date, setDate] = useState(today)

  const handleCopyToClipboard = () => {
    chrome.runtime.sendMessage({ action: 'refetch', date }, (data) => {
      const tasks = Object.values(data)?.reduce((acc: any, { tasks }) => {
        return [...acc, ...tasks]
      }, []) as string[] || []

      navigator.clipboard.writeText(tasks.map((txt) => txt.replace(/^\-/, ':point_right:')).join("\n"))
      alert('Tasks copied to clipboard')
    })
  }

  // NOTE: This class names might change over time.
  const handleAutoFillClick = () => {
    chrome.runtime.sendMessage({ action: 'refetch', date }, (data) => {
      const elem = document.getElementsByClassName('worklog__timesheet-view') // NOTE: className
      // only for one project
      const elemOfInterest = elem[0]
      const worklogTasks = elemOfInterest.getElementsByClassName('worklog__tasks')[0] // NOTE: className
      const fillingItems = worklogTasks.querySelectorAll(':scope > .d-flex.align-items-start') // NOTE: className

      if (fillingItems.length !== 3) {
        alert('select 3 fields for Meeting, Coding and Others')
        return;
      }

      // start filling
      for (let i = 0; i < fillingItems.length; i++) {
        const tag = fillingItems[i].querySelector('.worklog__task-dropdown .worklog-select__single-value').innerHTML.toString().toUpperCase()

        if (!validTags.includes(tag)) {
          alert('select 3 fields for Meeting, Coding and Others')
          return;
        }

        const timeElement = fillingItems[i].querySelector('.worklog__task-time input:not(:disabled)') as HTMLInputElement
        const timeVal = (data[tag.toLocaleLowerCase()]?.time || 0).toFixed(2)
        if (timeElement) {
          timeElement.value = timeVal
          fireEvents(timeElement);
        }

        const logElement = fillingItems[i].querySelector('.worklog__task-note textarea:not(:disabled)') as HTMLTextAreaElement
        const logVal = (data[tag.toLocaleLowerCase()]?.tasks || []).join("\n")
        if (logElement) {
          logElement.value = logVal
          fireEvents(logElement)
        }
      }
    })

  }

  return (
    <div className="mr-8 p-fixed d-flex" style={{ top: 10, left: 10 }} >
      <div className="mr-8">
        <input type="date" name="" max={today} value={date} onChange={(e) => {
          setDate(e.target.value)
        }} />
      </div>
      <button onClick={handleAutoFillClick} className="mr-8 cursor-pointer" title="Auto fill timesheet" >Auto Fill</button>
      <button onClick={handleCopyToClipboard} className="cursor-pointer" title="Copy to clipboard">&copy;</button>
    </div >
  )
}

export default WorklogFiller;
