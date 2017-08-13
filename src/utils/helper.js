export const urls2UploadStyle = urls => {
    return urls.map(url => ({
        uid: url,
        url,
        response: {
            url,
        }
    }))
}
