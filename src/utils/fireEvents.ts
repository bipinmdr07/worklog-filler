export const fireEvents = (element: HTMLElement) => {
  ;['input', 'click', 'change', 'blur'].forEach((event: any) => {
    const changeEvent = new Event(event, { bubbles: true })
    element.dispatchEvent(changeEvent)
  })
}
