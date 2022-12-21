import { baseParse } from 'org-file-parser-with-js'

import { getFormattedOrgLogs } from '~utils/formatLogs'

const defaultWorkLog = {
  meeting: { tasks: ['- N/A'], time: 0 },
  coding: { tasks: ['- N/A'], time: 0 },
  others: { tasks: ['- N/A'], time: 0 }
}

const fetchData = async (fileURL: string) => {
  try {
    const url = fileURL || 'file:///home/lf-00002065/Dropbox/org/todo.org'
    const data = await fetch(url)

    const fileContent = await data.text()
    const fileExtension = url.split('.').pop()

    if (fileExtension === 'org') {
      const orgJson = baseParse(fileContent)
      return getFormattedOrgLogs(orgJson)
    } else if (fileExtension === 'txt') {
      // TODO: Implement Formatter for txt file type.
      // return getFormattedTxtLogs(fileContent)
    }

    throw new Error('Invalid File provided')
  } catch (err) {
    console.error({ err })
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'refetch') {
    ;(async () => {
      const allResp = await fetchData(request.fileURL)
      console.log({ allResp })
      sendResponse(allResp[request.date] || defaultWorkLog)
    })()

    return true
  }
})
