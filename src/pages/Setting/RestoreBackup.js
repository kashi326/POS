import React from 'react'
import { Paper, Button, TextareaAutosize, Container, } from '@material-ui/core'
import { useState } from 'react'
import * as Database from '../../services/datastore2';
import TitleHead from '../../component/TitleHead';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
export default function RestoreBackup({ from }) {
  const [value, setvalue] = useState();
  const [error, seterror] = useState(false);
  let history = useHistory();
  if (error && from) {
    history.push('/home');
  }
  async function restoreBackup() {
    const db = await Database.get();
    // console.log(JSON.parse(value));
    await db.importDump(JSON.parse(value)).then(() =>
      seterror(true)
    );
  }
  return (
    <Container>
      <Paper>
        <TitleHead name="Restore Backup" />
        <ul>
          <li>To restore backup. Open the backup file i.e backup.json</li>
          <li>Copy all content of backup.json file and paste below</li>
          <li>Click restore. Congrats backup restored</li>
        </ul>
        {error ?
          <Alert severity="success">Backup Restored</Alert> : ''
        }

        <TextareaAutosize rowsMin={5} rowsMax={5} name="restoreBackup" value={value} onChange={(e) => setvalue(e.target.value)} style={{ width: '95%', margin: '10px' }} />
        <Button variant="outlined" color="primary" onClick={restoreBackup} style={{ margin: "20px" }}>Restore</Button>
      </Paper>
    </Container>
  )
}