import { useState } from 'react';

import { useStorage } from '@plasmohq/storage/hook'

const OptionsMenu = () => {
  const [fileURL, setFileURL] = useStorage<any>('fileURL')
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 20 }}>
      <h1>Select your preferred file type</h1>
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <input type="text" className="w-100" onChange={(e) => setText(e.target.value)} style={{ width: '100%' }} placeholder={fileURL || "Your todo file path"} value={text} accept=".txt,.org" />
      </div>
      <button onClick={() => setFileURL(text)}>Save</button>
    </div>
  )
}

export default OptionsMenu
