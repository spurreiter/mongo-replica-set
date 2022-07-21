/**
 * initiates the replica-set for the first time.
 */

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_RS
} = process.env

const rsConfig = {
  _id: MONGO_RS, // replica set name
  members: [
    { _id: 0, host: 'mongo1:27017', priority: 3 },
    { _id: 1, host: "mongo2:27018", priority: 2},
    { _id: 2, host: "mongo3:27019", priority: 0, arbiterOnly: true },
  ]
}

console.log(rsConfig)

try {
  disableTelemetry()
  db.getSiblingDB('admin')

  try {
    // check if replica set is up
    const status = rs.status()
    console.log(status)
  } catch (err) {
    // switch to admin database
    rs.initiate(rsConfig, { force: true })
    console.log('replicaset initialized')
    sleep(3000) // wait that instance gets primary
  }
} catch (err) {
  console.error(err)
}

console.log('INFO: exiting init-rs')
