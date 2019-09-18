
export async function v1Api(params: any) {
    const baseEndpoint = 'http://localhost:8000/'

    const path =
        isNaN(params.id) && params.id !== undefined
            ? `${baseEndpoint}${params.path}/${params.id}` // id is a slug
            : parseInt(params.id, 10) > 0
            ? `${baseEndpoint}${params.path}/${parseInt(params.id, 10)}`
            : `${baseEndpoint}${params.path}/`


    const url =
        params.filter !== undefined && params.filter !== 'undefined'
            ? `${path}?${params.filter}`
            : `${path}`
    const method = params.method ? params.method : 'get'
    const body = params.body
    const res = await fetch(url, {
        method,
        body
    })
    return await res.json()
}