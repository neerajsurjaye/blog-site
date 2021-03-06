let script = (() => {
    // let host = "http://localhost:5000"
    let host = "https://consolelogfiveseven.herokuapp.com"

    let postData = (url, data) => {
        return fetch(host + url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json()
            })
    }

    let postAuthData = (url, data, token) => {
        return fetch(host + url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'auth': `token ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json()
            })
    }

    let getData = (url) => {
        return fetch(host + url)
            .then((data) => {
                return data.json()
            })

    }

    let getAuthData = (url, token) => {
        return fetch(host + url, {
            headers: {
                'auth': `token ${token}`
            }
        })
            .then((data) => {
                return data.json()
            })

    }

    let getFullDateAndTime = (date) => {
        date = new Date(date)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}h:${date.getMinutes()}m`;
    }

    return { postData, getData, getFullDateAndTime, postAuthData, getAuthData }
})()

export default script