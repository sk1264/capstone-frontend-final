const URL = 'https://pixsly.onrender.com/pixsly'

export const pixslysLoader = async () => {
    const response = await fetch(URL + '/pixslys')
    const pixslys = await response.json()
    console.log(pixslys)
    return pixslys
}