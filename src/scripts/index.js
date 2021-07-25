let script = (() => {
    let host = "http://localhost:5000"

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

    let getData = (url) => {
        return fetch(host + url)
            .then((data) => {
                return data.json()
            })

    }

    return { postData, getData }
})()

export default script