import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDCQ5_fsCMFDjTu0mxi7weMSOKdAiYAjKE';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export { model };
