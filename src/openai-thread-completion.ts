import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env['OPENAI_API_KEY']
})
const openai = new OpenAIApi(configuration)

const model = process.env['OPENAI_MODEL_NAME'] ?? 'gpt-3.5-turbo'
const max_tokens = Number(process.env['OPENAI_MAX_TOKENS'] ?? 2000)
const temperature = Number(process.env['OPENAI_TEMPERATURE'] ?? 1)

export async function continueThread(messages: ChatCompletionRequestMessage[]): Promise<string> {
    const response = await openai.createChatCompletion({
        messages: messages,
        model: model,
        max_tokens: max_tokens,
        temperature: temperature
    })

    return response.data?.choices?.[0]?.message?.content ?? 'no response'
}