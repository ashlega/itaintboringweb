const getContentApi = `/api/content?`
const getLinkedFilesApi = `/api/linkedFiles?`

export async function getContent(name) {
    const response = await fetch(getContentApi+`?name=${name}`, {cache: 'no-store'})
    const data = await response.json()
	return data;
}

export async function getLinkedFiles(objectId, objectType) {
    const response = await fetch(getLinkedFilesApi+`objectId=${objectId}&objectType=${objectType}`, {cache: 'no-store'})
    const data = await response.json()
	return data;
}