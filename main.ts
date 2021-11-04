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
    generateOrderContent(state.menu as any[])


    //console.log(state)
}


async function auth() {
    try {
        await axios.post(`${SERVER_URL}/auth/phone`, { phone: '+79999999999' })
        const res2 = await axios.post(`${SERVER_URL}/auth/code`, { phone: '+79999999999', code: '9674' })
        return res2.data.token
    } catch (error) {
        console.log(error)
    }
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
    const count = Math.round((Math.random() * 1000) % 10)
    console.log(count)
}

flow()
    .then(data => {

    })
    .catch(err => {

    })