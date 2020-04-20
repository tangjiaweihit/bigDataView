import router from '@/router/index.js'
export default function quit() {
    localStorage.removeItem('username')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    sessionStorage.clear()
    router.replace(`/login`)
}

