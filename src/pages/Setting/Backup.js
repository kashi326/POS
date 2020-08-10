import React, { useEffect } from 'react'
import * as Database from '../../services/datastore2';
import { Redirect } from 'react-router-dom';
function Backup() {
  async function initDB() {
    const db = await Database.get();
      await db.dump()
        .then(json => handleSaveToPC(json));
  }
  const handleSaveToPC = data =>{
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'backup.json';
    link.href = url;
    link.click();
  }
  useEffect(() => {
    initDB();
  })
  if (true) {
    return <Redirect to='/home' />
  }

  return (
    <div></div>
  )
}

export default Backup
