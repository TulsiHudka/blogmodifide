export const APP_URL = process.env.REACT_APP_BASE_URL || ''

export const APIS = {
    BLOG_API: `${APP_URL}/blogs`,
    USER_API: `${APP_URL}/users`,
    PASSWORD_API: `${APP_URL}/password`
}