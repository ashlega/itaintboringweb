const userExistsApi = (process.env.HOST_URL ?? "") + `/api/user/userexists`
const subscribeApi = (process.env.HOST_URL ?? "") + `/api/subscribe`
const unsubscribeApi = (process.env.HOST_URL ?? "") + `/api/unsubscribe`

export async function checkUserExists(email, fullName) {
    var url = userExistsApi+"?email="+email+"&fullName="+fullName
    const response = await fetch(url, {cache: 'no-store'})
    const data = await response.json()
	return data;
}

export async function subscribeUser() {
    var url = subscribeApi
    const response = await fetch(url, {cache: 'no-store'})
    const data = await response.json()
	return data;
}

export async function unsubscribeUser(id) {
    var url = unsubscribeApi+"?id="+id
    const response = await fetch(url, {cache: 'no-store'})
    const data = await response.json()
	return data;
}