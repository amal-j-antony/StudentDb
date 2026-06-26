import axios from "axios"

const axiosConfig = (httpMethod ,url ,reqBody) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody
    }

    const response = axios(reqConfig).then(res => {return res})
                                    .catch(err => {return err})
    
    return response
}

export default axiosConfig