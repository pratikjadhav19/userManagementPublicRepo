


const methodEnums = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
}

export const NetWorkMiddleware = (
    url,
    method = methodEnums.get,
    data = null,
    headers = {}


) => {


    const getTokenFromCookie = () => {

    }


    const response = await axiosInstance({
        url,
        method,
        data,
        headers
    });

    return Response;

};