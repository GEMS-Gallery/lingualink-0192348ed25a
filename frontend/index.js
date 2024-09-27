import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const translateButton = document.getElementById('translateButton');
const outputText = document.getElementById('outputText');
const historyList = document.getElementById('historyList');

translateButton.addEventListener('click', async () => {
    const text = inputText.value;
    const language = targetLanguage.value;

    if (!text) return;

    try {
        const translation = await translateText(text, language);
        outputText.textContent = translation;
        speakText(translation, language);
        await backend.addTranslation(text, translation, language);
        updateHistory();
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'Error: Could not translate text';
    }
});

async function translateText(text, targetLang) {
    // This is a mock translation function
    // In a real application, you would use a translation API here
    const translations = {
        'de-DE': {
            'Hello': 'Hallo',
            'How are you?': 'Wie geht es dir?',
            'Goodbye': 'Auf Wiedersehen'
        },
        'es-ES': {
            'Hello': 'Hola',
            'How are you?': '¿Cómo estás?',
            'Goodbye': 'Adiós'
        }
    };

    return translations[targetLang][text] || text;
}

function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

async function updateHistory() {
    const translations = await backend.getTranslations();
    historyList.innerHTML = '';
    translations.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.originalText} -> ${entry.translatedText} (${entry.targetLanguage})`;
        historyList.appendChild(li);
    });
}

// Initial history load
updateHistory();
