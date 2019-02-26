import axios from 'axios'

const APIService = {
    apiUrl: (path) => {
        return process.env.REACT_APP_API_URL + path
    },
    createContact: (name, email, message) => {
        const data = {
            name: name,
            email: email,
            message: message
        }
        return axios.post(APIService.apiUrl('/contacts'), data)
    },
    getContacts: () => {
        return axios.get(APIService.apiUrl('/contacts'));
    }
};

export default APIService