import axios from "axios"

export const filterPaginationData = async ({ createNewArr = false, state, data, page, countRoute, dataToSend = {} }) => {
    let obj

    if (state != null && !createNewArr) {
        obj = { ...state, results: [...state.results, ...data], page }
    } else {
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, dataToSend)
        .then(({ data: { totalDocs } }) => {
            obj = { results: data, page: 1, totalDocs}
        })
        .catch(err => {
            console.log(err);
        })
    }

    return obj
}