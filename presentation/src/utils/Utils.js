const Utils = {
    timestampToDate: (timestamp) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
    },
    apiUrl: (path) => {
        return process.env.REACT_APP_API_URL + path
    }
}

export default Utils;