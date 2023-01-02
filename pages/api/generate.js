import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration)
const basePromptPrefix = `Write rules for a fun drinking game for: `
const basePromptSuffix = ` No dice involved.`

const generateAction = async (req, res) => {

    if (req.body.userInput==="") {
        // const emptyEntry = "Anything at all!"
        res.status(200).json({ output: {text: "Write in any activity!"} });
        return;
    }
    else {
        console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`)

        const baseCompletion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${basePromptPrefix}${req.body.userInput}\n${basePromptSuffix}\n`,
            temperature: 0.85,
            max_tokens: 256,
        });

        const basePromptOutput = baseCompletion.data.choices.pop();

        res.status(200).json({ output: basePromptOutput});
    }
}; 

export default generateAction; 
