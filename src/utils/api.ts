
export async function v1Api(params: any) {
    // const lang = params.locale
    //     ? LANGUAGE.find(l => l.locale.toLowerCase() === params.locale.toLowerCase())
    //     : undefined
    //
    // const localePath = lang ? lang.locale.toLowerCase() : locale ? locale.toLowerCase() : 'en-us'

    // const baseEndpoint =
    //     localePath && localePath !== 'en-us' && localePath !== 'en_us'
    //         ? `https://test.cookly.me/${localePath}/api/v4/`
    //         : 'https://test.cookly.me/api/v4/'
    const baseEndpoint = 'http://localhost:8080/api'

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