import axios from 'axios';

export const CallGPT = async (prompt: object) => {
	try {
		const apiKey = process.env.REACT_APP_GPT_API_KEY;
		const messages = [
			{
				role: 'system',
				content:
					"Your task is to return whether the child's answers to the firefighter's questions are appropriate or not. While playing with a friend at the playground, a child must make an emergency report when the friend jumps from a high place and injures his leg. Reporting takes place in four stages. Now, step by step, please return whether the child's answer is appropriate or not in JSON format. For example { success : true } ",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child should tell the firefighter that his or her friend was injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : 친구가 높은 곳에서 뛰어내려서 많이 다쳤어요 ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child should tell the firefighter that his or her friend was injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : 잘 모르겠어요. ## Use the output in the following JSON format. { success : false ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child should tell the firefighter that his or her friend was injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : 현재 시간은 3시 30분이에요 ## Use the output in the following JSON format. { success : false ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child must convey their current location (that is 소행성로 203) to the firefighters. 2. [FIREFIGHTER'S QUESTION] : 친구가 있는 위치를 말해줄래요? 3. [CHILD'S ANSWER] : 소행성로 203이에요 ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child must convey their current location (that is 삼성스토어 소행성지점) to the firefighters. 2. [FIREFIGHTER'S QUESTION] : 친구가 있는 위치를 말해줄래요? 3. [CHILD'S ANSWER] : 여기는 삼성스토어 소행성지점이에요 ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child must convey their current location (that is 삼성스토어 소행성지점) to the firefighters. 2. [FIREFIGHTER'S QUESTION] : 친구가 있는 위치를 말해줄래요? 3. [CHILD'S ANSWER] : 소행성로 203이에요 ## Use the output in the following JSON format. { success : false ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child must explain to the firefighter that his friend was injured on his leg.  2. [FIREFIGHTER'S QUESTION] : 친구가 어디를 다쳤나요? 3. [CHILD'S ANSWER] : 친구가 다리를 다쳐 피가 나요 ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content:
					"1. [GOAL] : The child must explain to the firefighter that his friend was injured on his leg.  2. [FIREFIGHTER'S QUESTION] : 친구가 어디를 다쳤나요? 3. [CHILD'S ANSWER] : 머리에서 피가 많이 나요 ## Use the output in the following JSON format. { success : false ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'assistant',
				content: `1. [GOAL] : The child must must explain to the firefighters about their identity(Child's name is 조찬익) in case the phone is disconnected. If the child's answer is not similar to the name, return false. 2. [FIREFIGHTER'S QUESTION] : 전화하고 있는 학생 이름을 말해줄래요? 3. [CHILD'S ANSWER] : 저는 조찬익이에요 ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##`,
			},
			{
				role: 'assistant',
				content: `1. [GOAL] : The child must must explain to the firefighters about their identity(Child's name is 조찬익) in case the phone is disconnected. If the child's answer is not similar to the name, return false. 2. [FIREFIGHTER'S QUESTION] : 전화하고 있는 학생 이름을 말해줄래요? 3. [CHILD'S ANSWER] : 저는 조찬익입니다 ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##`,
			},
			prompt,
		];

		const requestData = {
			model: 'gpt-3.5-turbo',
			messages,
			max_tokens: 100,
		};

		const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});

		console.log(response.data);
		const lastMessage = response.data.choices[0].message.content;
		const parsedMessage = JSON.parse(lastMessage);
		console.log(lastMessage);
		console.log(parsedMessage);

		return parsedMessage.success;
	} catch (error) {
		return error;
	}
};
