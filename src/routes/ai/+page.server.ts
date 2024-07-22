import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

const API_KEY = 'AIzaSyDCQ5_fsCMFDjTu0mxi7weMSOKdAiYAjKE';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
var answer: string;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const prompt = formData.get('prompt') as string;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		answer = text;
	}
};

export const load: PageServerLoad = async () => {
	return { answer: answer ?? 'Hãy đặt câu hỏi cho Trợ lí AI' };
};
