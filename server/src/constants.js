
const dbName = "XploreNow"

const httpOnlyCookie = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    // Remove domain or make it dynamic
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
}
export {
    dbName,
    httpOnlyCookie
}