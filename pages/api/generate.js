import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration)
const basePromptPrefix = `I want you to ask as a drinking game generator. I will provide you with an activity and you will write a numbered list of rules for a fun drinking game to play while doing that activity: `
const basePromptSuffix = ` No dice involved. All players are over 21 years old. Only write the rules. Do not remind us to have fun and drink responsibly.`

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
            max_tokens: 512,
        });

        const basePromptOutput = baseCompletion.data.choices.pop();

        res.status(200).json({ output: basePromptOutput});
    }
}; 

export default generateAction; 
