
const dbName = "XploreNow"

const httpOnlyCookie = {
  httpOnly: true,
  secure: true, // Always true in production
  sameSite: 'none'
  // Remove domain completely
}
export {
    dbName,
    httpOnlyCookie
}