import axios from "axios"

export const filterPaginationData = async ({ createNewArr = false, state, data, page, countRoute, dataToSend = {}, user = undefined }) => {
    let obj

    let headers = {}

    if (user) {
        headers.headers = {
            Authorization: `Bearer ${ user }`
        }
    }

    if (state != null && !createNewArr) {
        obj = { ...state, results: [...state.results, ...data], page }
    } else {
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, dataToSend, headers)
        .then(({ data: { totalDocs } }) => {
            obj = { results: data, page: 1, totalDocs}
        })
        .catch(err => {
            console.log(err);
        })
    }

    return obj
}