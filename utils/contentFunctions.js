const getContentApi = `/api/content?name=`

export async function getContent(name) {
    const response = await fetch(getContentApi+name, {cache: 'no-store'})
    const data = await response.json()
	return data;
}