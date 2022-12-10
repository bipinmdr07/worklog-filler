import { baseParse } from 'org-file-parser-with-js'

import { getFormattedLog } from '~utils/formatOrgParsedLogs'

const defaultWorkLog = {
  meeting: { tasks: ['- N/A'], time: 0 },
  coding: { tasks: ['- N/A'], time: 0 },
  others: { tasks: ['- N/A'], time: 0 }
}

const fetchData = async () => {
  const data = await fetch('http://localhost:8488/todo.org', {
    headers: { responseType: 'text' }
  })

  const fileContent = await data.text()
  const orgJson = baseParse(fileContent)

  return getFormattedLog(orgJson)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'refetch') {
    ;(async () => {
      const allResp = await fetchData()
      sendResponse(allResp[request.date] || defaultWorkLog)
    })()

    return true
  }
})
