class GrandmotherChatbot {
    constructor() {
        this.chatWindow = document.getElementById('chatWindow');
        this.responseOptions = document.getElementById('responseOptions');
        this.conversationState = 'initial';
        this.learnedWords = [];
        
        this.responses = {
            greeting: {
                user: "Hello Nenek!",
                grandmother: {
                    temuan: "Selamat pagi, cucu sayang!",
                    english: "Good morning, dear grandchild!",
                    response: "Ah, you remembered to greet me properly! In our Temuan language, we say 'Selamat pagi' for good morning. The word 'cucu' means grandchild - that's what you are to me!",
                    pronunciation: "Say it like: 'Se-la-mat pa-gi, chu-chu sa-yang'"
                },
                nextOptions: ['how-are-you', 'learn-words', 'repeat-greeting', 'family']
            },
            
            'how-are-you': {
                user: "How are you today, Nenek?",
                grandmother: {
                    temuan: "Aku sihat, terima kasih. Kamu bagaimana?",
                    english: "I am well, thank you. How about you?",
                    response: "I'm feeling strong today, cucu! 'Aku sihat' means 'I am healthy'. When someone asks how you are, you can say 'Aku sihat' too. And 'terima kasih' means thank you - very important to be polite!",
                    pronunciation: "Say: 'A-ku see-hat, te-ri-ma ka-sih'"
                },
                nextOptions: ['im-good', 'learn-words', 'what-doing', 'family']
            },
            
            'im-good': {
                user: "Aku sihat juga, Nenek!",
                grandmother: {
                    temuan: "Bagus sekali!",
                    english: "Very good!",
                    response: "Wah! You're learning so fast! 'Bagus sekali' means 'very good' - I'm so proud of you for trying to speak our language. Your pronunciation is getting better!",
                    pronunciation: "Say: 'Ba-gus se-ka-li'"
                },
                nextOptions: ['learn-words', 'family', 'food', 'numbers']
            },
            
            'learn-words': {
                user: "Can you teach me some new words, Nenek?",
                grandmother: {
                    temuan: "Tentu sekali! Mari belajar!",
                    english: "Of course! Let's learn!",
                    response: "I love teaching you our beautiful language! Let me teach you some everyday words. 'Mari belajar' means 'let's learn'. What would you like to learn about first?",
                    pronunciation: "Say: 'Ma-ri be-la-jar'"
                },
                nextOptions: ['family', 'food', 'numbers', 'nature']
            },
            
            family: {
                user: "Tell me about family words, Nenek",
                grandmother: {
                    temuan: "Keluarga sangat penting dalam budaya kita",
                    english: "Family is very important in our culture",
                    response: "Family is everything to us, cucu! Let me teach you: 'Nenek' means grandmother (that's me!), 'Datuk' is grandfather, 'Mak' is mother, 'Bapak' is father, and 'cucu' is grandchild. 'Keluarga' means family.",
                    pronunciation: "Ne-nek, Da-tuk, Mak, Ba-pak, chu-chu, ke-lu-ar-ga"
                },
                nextOptions: ['food', 'numbers', 'repeat-family', 'nature']
            },
            
            food: {
                user: "What about food words, Nenek?",
                grandmother: {
                    temuan: "Makanan tradisional kita sangat sedap!",
                    english: "Our traditional food is very delicious!",
                    response: "Ah, you want to learn about food! Good choice - food brings families together. 'Makanan' means food, 'nasi' is rice, 'ikan' is fish, 'sayur' is vegetables, and 'sedap' means delicious. We love our traditional dishes!",
                    pronunciation: "Ma-ka-nan, na-si, i-kan, sa-yur, se-dap"
                },
                nextOptions: ['numbers', 'nature', 'cooking', 'family']
            },
            
            numbers: {
                user: "Can you teach me numbers, Nenek?",
                grandmother: {
                    temuan: "Mari kita belajar nombor!",
                    english: "Let's learn numbers!",
                    response: "Numbers are very useful, cucu! Let me teach you: 'satu' (one), 'dua' (two), 'tiga' (three), 'empat' (four), 'lima' (five). Practice counting with me!",
                    pronunciation: "Sa-tu, du-a, ti-ga, em-pat, li-ma"
                },
                nextOptions: ['count-practice', 'nature', 'food', 'family']
            },
            
            nature: {
                user: "Tell me about nature words, Nenek",
                grandmother: {
                    temuan: "Alam semula jadi adalah rumah kita",
                    english: "Nature is our home",
                    response: "We Orang Asli live close to nature, cucu. 'Hutan' means forest, 'sungai' is river, 'pokok' is tree, 'bunga' is flower, and 'burung' is bird. The forest gives us everything we need.",
                    pronunciation: "Hu-tan, su-ngai, po-kok, bu-nga, bu-rung"
                },
                nextOptions: ['animals', 'weather', 'family', 'food']
            },
            
            'repeat-greeting': {
                user: "Can you say the greeting again?",
                grandmother: {
                    temuan: "Selamat pagi, cucu sayang!",
                    english: "Good morning, dear grandchild!",
                    response: "Of course! Practice makes perfect. 'Selamat pagi, cucu sayang!' Remember, 'selamat' means peaceful or safe, 'pagi' is morning, and 'sayang' means dear or beloved.",
                    pronunciation: "Se-la-mat pa-gi, chu-chu sa-yang"
                },
                nextOptions: ['how-are-you', 'learn-words', 'family', 'food']
            },
            
            'count-practice': {
                user: "Let me practice counting!",
                grandmother: {
                    temuan: "Satu, dua, tiga, empat, lima!",
                    english: "One, two, three, four, five!",
                    response: "Excellent! You're counting like a true Temuan speaker. Keep practicing: satu, dua, tiga, empat, lima. Soon you'll be able to count to ten!",
                    pronunciation: "Remember: Sa-tu, du-a, ti-ga, em-pat, li-ma"
                },
                nextOptions: ['learn-words', 'family', 'food', 'nature']
            }
        };
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.responseOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('response-btn')) {
                const responseType = e.target.getAttribute('data-response');
                this.handleUserResponse(responseType);
            }
        });
    }
    
    handleUserResponse(responseType) {
        const response = this.responses[responseType];
        if (!response) return;
        
        // Add user message
        this.addMessage(response.user, 'user');
        
        // Add grandmother's response after a delay
        setTimeout(() => {
            this.addGrandmotherMessage(response.grandmother);
            this.updateResponseOptions(response.nextOptions);
        }, 1000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(messageContent);
        this.chatWindow.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addGrandmotherMessage(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message grandmother-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        let html = `
            <p><strong>${response.temuan}</strong></p>
            <p><em>${response.english}</em></p>
            <p>${response.response}</p>
        `;
        
        if (response.pronunciation) {
            html += `
                <div class="pronunciation">
                    <strong>Pronunciation:</strong> ${response.pronunciation}
                </div>
            `;
        }
        
        messageContent.innerHTML = html;
        messageDiv.appendChild(messageContent);
        this.chatWindow.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    updateResponseOptions(options) {
        this.responseOptions.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'response-btn';
            button.setAttribute('data-response', option);
            
            const optionTexts = {
                'greeting': 'Say hello to Nenek',
                'how-are-you': 'Ask how she is',
                'im-good': 'Say you are well too',
                'learn-words': 'Ask to learn new words',
                'family': 'Learn about family words',
                'food': 'Learn about food words',
                'numbers': 'Learn numbers',
                'nature': 'Learn about nature words',
                'repeat-greeting': 'Ask her to repeat the greeting',
                'repeat-family': 'Repeat family words',
                'count-practice': 'Practice counting',
                'what-doing': 'Ask what she is doing',
                'cooking': 'Ask about cooking',
                'animals': 'Learn about animals',
                'weather': 'Learn about weather'
            };
            
            button.textContent = optionTexts[option] || 'Continue conversation';
            this.responseOptions.appendChild(button);
        });
    }
    
    scrollToBottom() {
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GrandmotherChatbot();
});