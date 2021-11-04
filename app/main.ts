import axios from 'axios'

const SERVER_URL = 'https://zloi.space/restaurant/api'

interface State {
    token?: string,
    points?: any[],
    menu?: any[]
}

const state: State = {}

async function flow() {
    state.token = await auth()
    state.menu = await requestMenu()
    const content = generateOrderContent(state.menu as any[])
    console.log(content)
    const order = await makeOrder(content, state.token as string)
    console.log(order)
}


async function auth() {
    await axios.post(`${SERVER_URL}/auth/phone`, { phone: '+79999999999' })
    const res = await axios.post(`${SERVER_URL}/auth/code`, { phone: '+79999999999', code: '9674' })
    return res.data.token
}

async function requestMenu() {
    const res = await axios.get(`${SERVER_URL}/menu/`, {
        params: {
            expand: 'additions_category,additions_category.additions'
        }
    })
    return res.data.data
}

function generateOrderContent(menu: any[]) {
    const count = Math.ceil(Math.random() * 10)
    const content = new Array()
    for (let i = 0; i < count; i++) {
        content.push({
            id: menu[Math.floor((Math.random() * 10) % menu.length)]['id'],
            count: Math.round(Math.random() * 10)
        })
    }
    return content
}

async function makeOrder(content: any[], token: string) {
    const order = {
        menu: content,
        comment: '',
        test: true
    }
    const res = await axios.post(`${SERVER_URL}/orders/`, order, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data
}

flow()
    .then(data => {

    })
    .catch(err => {
        console.log(err.message)
    })


setTimeout(() => {
    console.log('It\'s work!')
}, 1 * 60 * 60 * 1000)