// Vyapar Digital - Personal Chatbot (Saarthi / सारथि)
import { CONFIG } from '../data/config.js';

let currentLang = 'hi';
let chatOpen = false;
let messages = [];

export function initChatbot(lang = 'hi') {
  currentLang = lang;
  renderChatbotContainer();
  initInitialMessage();
  attachEvents();
}

export function updateChatbotLang(lang) {
  currentLang = lang;
  const triggerText = document.getElementById('chatbot-trigger-text');
  if (triggerText) {
    triggerText.textContent = lang === 'hi' ? 'सारथि AI' : 'Saarthi AI';
  }
}

function renderChatbotContainer() {
  let container = document.getElementById('chatbot-widget-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'chatbot-widget-container';
    document.body.appendChild(container);
  }

  container.innerHTML = `
    <!-- Floating Trigger Button -->
    <div id="chatbot-trigger-btn" class="chatbot-trigger-btn" title="सारथि (Saarthi) - AI Digital Guide">
      <div class="chatbot-avatar-pulse"></div>
      <div class="chatbot-avatar-icon">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
          <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
          <path d="M9.5 13.5c.8.6 2.2.6 3 0"></path>
        </svg>
      </div>
      <span class="chatbot-badge-text" id="chatbot-trigger-text">${currentLang === 'hi' ? 'सारथि AI' : 'Saarthi AI'}</span>
    </div>

    <!-- Chatbot Window Modal -->
    <div id="chatbot-window" class="chatbot-window">
      <!-- Chatbot Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-header-avatar">
            <span class="online-indicator"></span>
            🤖
          </div>
          <div>
            <div class="chatbot-header-title">सारथि (Saarthi) — AI गाइड</div>
            <div class="chatbot-header-sub">Vyapar Digital • Online</div>
          </div>
        </div>
        <div class="chatbot-header-actions">
          <button id="chatbot-reset-btn" class="chatbot-icon-btn" title="Reset Chat">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>
          <button id="chatbot-close-btn" class="chatbot-icon-btn" title="Close">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Quick Action Chips Bar -->
      <div class="chatbot-quick-chips" id="chatbot-chips">
        <button class="chat-chip" data-query="rates">💰 ${currentLang === 'hi' ? 'रेट लिस्ट देखें' : 'Pricing & Rates'}</button>
        <button class="chat-chip" data-query="track">🔍 ${currentLang === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order'}</button>
        <button class="chat-chip" data-query="process">⚡ ${currentLang === 'hi' ? 'कितने दिन में बनेगी?' : '48-Hr Delivery'}</button>
        <button class="chat-chip" data-query="founder">👨‍💼 ${currentLang === 'hi' ? 'फाउंडर से बात करें' : 'Talk to Founder'}</button>
      </div>

      <!-- Messages Body -->
      <div class="chatbot-messages" id="chatbot-messages-body"></div>

      <!-- Chat Input Area -->
      <form class="chatbot-input-area" id="chatbot-form">
        <input 
          type="text" 
          id="chatbot-input" 
          class="chatbot-input-field" 
          placeholder="${currentLang === 'hi' ? 'सारथि से पूछें या ट्रैकिंग ID लिखें...' : 'Ask Saarthi or enter tracking ID...'}" 
          autocomplete="off"
        >
        <button type="submit" class="chatbot-send-btn" aria-label="Send">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  `;
}

function initInitialMessage() {
  messages = [
    {
      sender: 'bot',
      textHi: 'नमस्ते! 🙏 मैं **सारथि (Saarthi)** हूँ — Vyapar Digital का AI डिजिटल मार्गदर्शक।\n\nमैं आपकी दुकान व व्यापार के लिए सही डिजिटल पैकेज चुनने, रेट्स जानने, प्रोजेक्ट ट्रैक करने या सीधे हमारे संस्थापक **केशव लड्ढा** से कनेक्ट करने में मदद करूँगा। बताएं, आज क्या सहायता करूँ?',
      textEn: 'Namaste! 🙏 I am **Saarthi** — your AI Digital Guide at Vyapar Digital.\n\nI can help you explore website & app pricing, estimate costs, track your ongoing project, or connect you directly with our founder Keshav Ladha. How can I guide you today?',
      time: getCurrentTime()
    }
  ];
  renderMessages();
}

function attachEvents() {
  const triggerBtn = document.getElementById('chatbot-trigger-btn');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const resetBtn = document.getElementById('chatbot-reset-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const chipsContainer = document.getElementById('chatbot-chips');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      chatOpen = !chatOpen;
      if (chatOpen) {
        chatWindow.classList.add('active');
        triggerBtn.classList.add('active');
        input.focus();
      } else {
        chatWindow.classList.remove('active');
        triggerBtn.classList.remove('active');
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatOpen = false;
      chatWindow.classList.remove('active');
      triggerBtn.classList.remove('active');
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      initInitialMessage();
    });
  }

  if (chipsContainer) {
    chipsContainer.querySelectorAll('.chat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const queryType = chip.getAttribute('data-query');
        handleChipClick(queryType);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      // Add user message
      addUserMessage(text);
      input.value = '';

      // Process bot response
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        processBotResponse(text);
      }, 600);
    });
  }
}

function handleChipClick(type) {
  let userText = '';
  if (type === 'rates') userText = currentLang === 'hi' ? 'मुझे प्लान्स और रेट लिस्ट जाननी है' : 'I want to see pricing plans & rates';
  else if (type === 'track') userText = currentLang === 'hi' ? 'मुझे अपना आर्डर ट्रैक करना है' : 'I want to track my order';
  else if (type === 'process') userText = currentLang === 'hi' ? 'वेबसाइट कितने दिन में तैयार होगी?' : 'How fast is the delivery timeline?';
  else if (type === 'founder') userText = currentLang === 'hi' ? 'सीधे फाउंडर केशव जी से बात करनी है' : 'I want to speak directly with the founder';

  addUserMessage(userText);
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    processBotResponse(userText);
  }, 500);
}

function addUserMessage(text) {
  messages.push({
    sender: 'user',
    text: text,
    time: getCurrentTime()
  });
  renderMessages();
}

function processBotResponse(query) {
  const q = query.toLowerCase();
  let botReply = '';

  // 1. Order Tracking by ID (e.g., VD-2026-XXXX or any tracking format)
  const trackingMatch = q.match(/vd[-\s]?\d{4}[-\s]?\d{3,5}/i) || (q.includes('track') && q.match(/\d{4,}/));
  
  if (trackingMatch) {
    const rawId = trackingMatch[0].toUpperCase().replace(/\s/g, '-');
    const status = lookupTrackingId(rawId);
    
    if (status) {
      botReply = `📦 **ऑर्डर ट्रैकिंग स्टेटस (Order Found):**\n\n` +
        `• **ID:** \`${status.id}\`\n` +
        `• **Business:** ${status.businessName}\n` +
        `• **Service:** ${status.service}\n` +
        `• **Current Stage:** **${status.stage}**\n` +
        `• **Delivery Est:** ${status.estDate}\n\n` +
        `💡 *आप हमारे [लाइव ट्रैकर](#tracker) पेज पर भी विस्तृत जानकारी देख सकते हैं।*`;
    } else {
      botReply = `🔍 **Tracking ID: \`${rawId}\`**\n\n` +
        `यह ID हमारे डेटाबेस में प्रक्रियाधीन है। क्या आपने नया आर्डर सबमिट किया है? \n\n` +
        `कृपया अपने ऑर्डर का विवरण सीधे व्हाट्सएप पर हमारे फाउंडर **केशव लड्ढा (+91 70273 40360)** को भेजें, हम 10 मिनट में अपडेट दे देंगे! ⚡\n\n` +
        `<a href="https://wa.me/917027340360?text=Namaste!%20Mera%20Tracking%20ID%20${rawId}%20ka%20status%20check%20karna%20hai." target="_blank" class="chat-inline-wa-btn">📲 WhatsApp पर स्टेटस पूछें</a>`;
    }
  }
  // 2. Pricing & Rates
  else if (q.includes('rate') || q.includes('price') || q.includes('cost') || q.includes('kitne') || q.includes('kitna') || q.includes('रुपए') || q.includes('पैसा') || q.includes('दाम') || q.includes('बजट')) {
    botReply = `💰 **Vyapar Digital पारदर्शी रेट लिस्ट (Starting ₹1,999):**\n\n` +
      `1️⃣ **1-Page WhatsApp Store**: **₹1,999** *(48 घंटे में लाइव)*\n` +
      `2️⃣ **5-Page Business Website**: **₹4,999** *(फुल कस्टम डोमेन)*\n` +
      `3️⃣ **Android Mobile App**: **₹14,999** *(Google Play Store Ready)*\n` +
      `4️⃣ **त्यौहार पोस्टर्स (15 Pack)**: **₹1,499/माह** *(दुकान के नाम & लोगो सहित)*\n` +
      `5️⃣ **वायरल इंस्टाग्राम रील्स**: **₹599/रील** *(फुल एचडी एडिटिंग)*\n\n` +
      `✨ **खास बात**: सिर्फ **20% टोकन एडवांस** से काम शुरू होता है, बाकी 80% काम पसंद आने के बाद!\n\n` +
      `<a href="#calculator" class="chat-inline-action-btn">🧮 लाइव रेट कैलकुलेटर खोलें</a>`;
  }
  // 3. Timeline / Delivery
  else if (q.includes('time') || q.includes('din') || q.includes('ghante') || q.includes('hour') || q.includes('day') || q.includes('kab') || q.includes('delivery') || q.includes('फास्ट') || q.includes('समय')) {
    botReply = `⚡ **सुपर-फास्ट डिलीवरी टाइमलाइन:**\n\n` +
      `• **1-Page WhatsApp Store**: सिर्फ **48 घंटे** में पहला लाइव ड्राफ्ट!\n` +
      `• **फुल बिजनेस वेबसाइट**: **3 से 5 दिन**\n` +
      `• **त्यौहार पोस्टर्स & रील्स**: **24 से 48 घंटे**\n` +
      `• **Android Mobile App**: **7 से 10 दिन**\n\n` +
      `ड्राफ्ट तैयार होते ही सीधे आपके व्हाट्सएप पर लिंक भेजा जाता है ताकि आप देख सकें और बदलाव करवा सकें।`;
  }
  // 4. Founder / Contact / Address
  else if (q.includes('keshav') || q.includes('founder') || q.includes('owner') || q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('address') || q.includes('ellenabad') || q.includes('sirsa') || q.includes('कॉल') || q.includes('पता') || q.includes('फोन')) {
    botReply = `🏛️ **संस्थापक & संपर्क सूत्र (Direct Founder Access):**\n\n` +
      `• **संस्थापक (Founder)**: **केशव लड्ढा (Keshav Ladha)**\n` +
      `• **ऑफिशियल फोन / व्हाट्सएप**: **+91 70273 40360**\n` +
      `• **ईमेल**: keshavladha24@gmail.com\n` +
      `• **लोकेशन**: ऐलनाबाद (125102), सिरसा, हरियाणा\n` +
      `• **इंस्टाग्राम**: [@vyapar_digital_](https://www.instagram.com/vyapar_digital_/)\n\n` +
      `<a href="https://wa.me/917027340360?text=Namaste%20Keshav%20ji!%20Mujhe%20Vyapar%20Digital%20se%20services%20chahiye." target="_blank" class="chat-inline-wa-btn">💬 सीधे फाउंडर से WhatsApp पर बात करें</a>`;
  }
  // 5. Live Client Work (Windson Motor)
  else if (q.includes('windson') || q.includes('client') || q.includes('sample') || q.includes('work') || q.includes('portfolio') || q.includes('काम') || q.includes('डेमो') || q.includes('सबूत')) {
    botReply = `🏆 **हमारा लाइव क्लाइंट प्रोजेक्ट (Verified Real Client):**\n\n` +
      `🚗 **Windson Motor (विंडसन मोटर)**\n` +
      `• **वेबसाइट**: [www.windsonmotor.com](https://www.windsonmotor.com)\n` +
      `• **सोशल मीडिया**: [@windsonmotor on Instagram](https://www.instagram.com/windsonmotor/)\n` +
      `• **काम**: संपूर्ण इलेक्ट्रिक स्कूटर वेब पोर्टल और इंस्टाग्राम ब्रांडिंग।\n\n` +
      `<a href="#portfolio" class="chat-inline-action-btn">🌟 लाइव केस स्टडी देखें</a>`;
  }
  // 6. Payment & Security / Advance
  else if (q.includes('advance') || q.includes('payment') || q.includes('upi') || q.includes('pay') || q.includes('bhim') || q.includes('surakshit') || q.includes('security') || q.includes('adv')) {
    botReply = `🛡️ **100% सुरक्षित भुगतान नियम (Zero Risk):**\n\n` +
      `• **सिर्फ 20% टोकन एडवांस**: काम शुरू करने के लिए केवल 20% लिया जाता है।\n` +
      `• **80% बैलेंस**: जब आपका काम पूरा हो जाए और आप पूरी तरह संतुष्ट हों, तब बाकी 80% भुगतान करें।\n` +
      `• **पेमेंट माध्यम**: BHIM UPI, PhonePe, Google Pay, Paytm, बैंक ट्रांसफर।\n` +
      `• **256-Bit SSL सुरक्षा**: आपका डेटा 100% निजी और सुरक्षित रहता है।`;
  }
  // 7. Fallback / General
  else {
    botReply = `धन्यवाद आपके सवाल के लिए! 😊\n\n` +
      `Vyapar Digital पर हम आपकी दुकान और व्यापार के लिए **वेबसाइट, मोबाइल ऐप, त्यौहार पोस्टर्स और इंस्टाग्राम रील्स** बनाते हैं।\n\n` +
      `आप नीचे दिए गए विकल्पों में से चुन सकते हैं या सीधे हमारे फाउंडर से व्हाट्सएप पर बात कर सकते हैं:\n\n` +
      `• [रेट लिस्ट देखें](#calculator)\n` +
      `• [सर्विस पैकेज देखें](#services)\n` +
      `• [ऑर्डर ट्रैक करें](#tracker)\n\n` +
      `<a href="https://wa.me/917027340360?text=${encodeURIComponent(`Namaste Vyapar Digital! Mujhe query hai: ${query}`)}" target="_blank" class="chat-inline-wa-btn">📲 WhatsApp पर बात करें</a>`;
  }

  messages.push({
    sender: 'bot',
    text: botReply,
    time: getCurrentTime()
  });
  renderMessages();
}

function lookupTrackingId(id) {
  // Check localStorage orders first
  try {
    const saved = localStorage.getItem('vd_orders');
    if (saved) {
      const orders = JSON.parse(saved);
      const found = orders.find(o => (o.trackingId || '').toUpperCase() === id.toUpperCase());
      if (found) {
        return {
          id: found.trackingId,
          businessName: found.businessName || found.clientName || 'Client Business',
          service: found.packageName || 'Web Development',
          stage: found.status || 'Draft Ready (ड्राफ्ट तैयार)',
          estDate: '24-48 Hours'
        };
      }
    }
  } catch (e) {
    console.error('Error looking up tracking:', e);
  }

  // Pre-configured active demo tracking ID for instant testing
  if (id.includes('VD-2026') || id === 'VD-2026-8841') {
    return {
      id: 'VD-2026-8841',
      businessName: 'Windson Motor (विंडसन मोटर)',
      service: 'EV Web Portal + Instagram Branding',
      stage: '100% Live & Deployed (सफलतापूर्वक लाइव)',
      estDate: 'Completed'
    };
  }

  return null;
}

function showTypingIndicator() {
  const container = document.getElementById('chatbot-messages-body');
  if (!container) return;

  const typingDiv = document.createElement('div');
  typingDiv.id = 'chat-typing-indicator';
  typingDiv.className = 'chat-msg chat-msg-bot typing-bubble';
  typingDiv.innerHTML = `
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const typingDiv = document.getElementById('chat-typing-indicator');
  if (typingDiv) typingDiv.remove();
}

function renderMessages() {
  const container = document.getElementById('chatbot-messages-body');
  if (!container) return;

  container.innerHTML = messages.map(msg => {
    const isBot = msg.sender === 'bot';
    const text = msg.text || (currentLang === 'hi' ? msg.textHi : msg.textEn);
    const formattedText = formatMarkdownText(text);

    return `
      <div class="chat-msg ${isBot ? 'chat-msg-bot' : 'chat-msg-user'} animate-fade-up">
        ${isBot ? '<div class="msg-avatar">🤖</div>' : ''}
        <div class="msg-content">
          <div class="msg-bubble">${formattedText}</div>
          <div class="msg-time">${msg.time}</div>
        </div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function formatMarkdownText(txt) {
  if (!txt) return '';
  return txt
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="chat-code">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="chat-link" target="_blank">$1</a>')
    .replace(/\n/g, '<br>');
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
