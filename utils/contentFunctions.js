const getContentApi = `/api/content?name=`

export async function getContent(name) {
    const response = await fetch(getContentApi+name)
    const data = await response.json()
	return data;
}