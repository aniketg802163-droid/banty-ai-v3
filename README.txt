# Banty AI V3

यह V3 एक real-AI chatbot का starter project है।

Flow:
Phone/Web UI -> /api/chat -> server -> AI API -> जवाब

महत्वपूर्ण:
- API key को `public/index.html` में कभी न डालें।
- API key केवल server environment variable में रखें।
- API account वही व्यक्ति बनाए/चलाए जो provider की eligibility/terms पूरी करता हो।

चलाने के लिए:
1. Node.js वाले environment में यह folder खोलें।
2. `npm install`
3. `.env.example` की copy बनाकर `.env` करें।
4. Eligible account की API key `.env` में रखें।
5. `npm start`
6. Browser में `http://localhost:3000` खोलें।

अगर hosting service environment variables देती है, तो `OPENAI_API_KEY` और `OPENAI_MODEL` वहाँ सेट करें।
