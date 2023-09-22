const getContentApi = `/api/content?`
const getLinkedFilesApi = `/api/linkedfiles?`
const uploadFilesApi = `/api/uploadfiles`

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

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export async function uploadFiles(files, objectId, objectType) {
    var fileData = [];
    for(let i=0; i < files.length; i++){
        var base64File = await convertBase64(files[i]);
        fileData.push({
            name: files[i].name,
            content: base64File
        })
    }
    var response = await fetch(uploadFilesApi, {
        method: "POST",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            files: fileData,
            objectId: objectId,
            objectType: objectType
        }),
    });
    var responseJson = await response.json()
	return responseJson;
}

export async function uploadFilesOld(files, objectId, objectType) {
    const data = new FormData();
    for(let i=0; i < files.length; i++){
        data.append("file"+i, files[i]);
    }
    data.append("objectId", objectId);
    data.append("objectType", objectType);
    var response = await fetch(uploadFilesApi, {
        method: "POST",
        body: data
    });
    var responseJson = await response.json()
	return responseJson;
}