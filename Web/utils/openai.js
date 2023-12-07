
const openAiApi = `/api/openai`

export async function callOpenAi(messages) {
    const response = await fetch(openAiApi,{
        method: 'POST',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //model: model,
            messages: messages
        }),
    });
    const result = await response.json()
    return result
}