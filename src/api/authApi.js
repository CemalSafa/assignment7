const DEMO_USERNAME = '240408026@st.biruni.edu.tr' // kendi öğrenci e-postanı yaz
const DEMO_PASSWORD = 'demo123456'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        resolve({ username })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}
