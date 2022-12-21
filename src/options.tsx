import { useState } from 'react';

import { useStorage } from '@plasmohq/storage/hook'

const OptionsMenu = () => {
  const [fileURL, setFileURL] = useStorage<any>('fileURL')
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 20 }}>
      <h1>Configuration</h1>
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <label>Enter the location of your todo file</label>
        <input type="text" className="w-100" onChange={(e) => setText(e.target.value)} style={{ width: '100%' }} placeholder={fileURL || "file:///*/todo.(txt|org)"} value={text} accept=".txt,.org" />
        <p>
          <b>Hint * : </b>
          Press <b>Ctrl + O</b> in the browser, select your todo file and copy and paste the link from address bar to above input field.
        </p>
      </div>
      <button onClick={() => setFileURL(text)}>Save</button>
    </div>
  )
}

export default OptionsMenu
