/**
 * creates all initial users in the database
 * will throw if users already exists
 */

const {
  MONGO_DB_NAME,
  MONGO_DB_USER,
  MONGO_DB_USER_PASSWORD,
  MONGO_DB_READONLY,
  MONGO_DB_READONLY_PASSWORD
} = process.env

// database settings
const dbName = MONGO_DB_NAME
const dbUsers = [
  {
    user: MONGO_DB_USER,
    pwd: MONGO_DB_USER_PASSWORD,
    roles: [
      { db: dbName, role: 'read' },
      { db: dbName, role: 'readWrite' },
      { db: dbName, role: 'dbAdmin' }
    ]
  },
  {
    user: MONGO_DB_READONLY,
    pwd: MONGO_DB_READONLY_PASSWORD,
    roles: [
      { db: dbName, role: 'read' }
    ]
  }
]

/**
 * need to loop here as primary might not be fully available
 */
function checkForPrimary () {
  const status = rs.status()
  const hasPrimary = status.members.some(member => member.stateStr === 'PRIMARY')
  console.log(`INFO: checking for primary: ${hasPrimary}`)
  sleep(1000)
  if (!hasPrimary) {
    checkForPrimary()
  }
}

checkForPrimary()

// create all initial users in the database
const mydb = db.getSiblingDB(dbName)
dbUsers.forEach(dbUser => {
  try {
    if (dbUser.pwd) {
      mydb.createUser(dbUser)
      console.log(`INFO: user ${dbUser.user} created`)
    }
  } catch (err) {
    console.error(err)
  }
})

console.log('INFO: exiting init-db')
