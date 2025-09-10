// 動的カード画像生成システム

// カードシンボルマッピング（大アルカナ）
const MAJOR_ARCANA_SYMBOLS = {
    'fool': '🌟',
    'magician': '🔮',
    'high_priestess': '🌙',
    'empress': '🌺',
    'emperor': '👑',
    'hierophant': '🕯️',
    'lovers': '💖',
    'chariot': '⚡',
    'strength': '🦁',
    'hermit': '🏮',
    'wheel_of_fortune': '☸️',
    'justice': '⚖️',
    'hanged_man': '🙃',
    'death': '🦋',
    'temperance': '🧘',
    'devil': '🔗',
    'tower': '⚡',
    'star': '⭐',
    'moon': '🌙',
    'sun': '☀️',
    'judgement': '📯',
    'world': '🌍'
};

// 小アルカナスートシンボル
const MINOR_ARCANA_SYMBOLS = {
    'cups': '♡',
    'swords': '⚔️',
    'wands': '🔥',
    'pentacles': '💰'
};

// SVGカード生成関数（大アルカナ・小アルカナ対応）
function generateCardSVG(cardId, cardName, cardNumber, isReversed = false) {
    let symbol = '✦';
    let isMinorArcana = false;
    
    // 小アルカナかどうかを判定
    if (cardId.includes('_of_')) {
        isMinorArcana = true;
        const parts = cardId.split('_of_');  // 例: ['ace', 'wands']
        const suitKey = parts[1];  // 'wands', 'cups', 'swords', 'pentacles'
        symbol = MINOR_ARCANA_SYMBOLS[suitKey] || '✦';
        
        // 数字やコートカードを表示
        const cardType = parts[0];  // 'ace', 'two', 'king' など
        if (cardType === 'ace') {
            symbol = `${symbol} A`;
        } else if (['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].includes(cardType)) {
            const numbers = {'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'};
            symbol = `${symbol} ${numbers[cardType]}`;
        } else if (['king', 'queen'].includes(cardType)) {
            const courtNames = {'king': 'K', 'queen': 'Q'};
            symbol = `${symbol} ${courtNames[cardType]}`;
        }
    } else {
        // 大アルカナ
        symbol = MAJOR_ARCANA_SYMBOLS[cardId] || '✦';
    }
    
    const rotation = isReversed ? 'transform="rotate(180)"' : '';
    const reversedIndicator = isReversed ? 
        '<text x="140" y="30" fill="#ff6b6b" font-size="16" text-anchor="end">↓</text>' : '';
    
    // 小アルカナの場合は背景色を少し変える
    const gradientId = isMinorArcana ? 'minorCardGradient' : 'cardGradient';
    
    return `
        <svg width="150" height="250" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2c2a4a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#4f4a7d;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="minorCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3a2a4a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#5f4a6d;stop-opacity:1" />
                </linearGradient>
                <radialGradient id="glowEffect" cx="30%" cy="30%" r="50%">
                    <stop offset="0%" style="stop-color:#f0c419;stop-opacity:0.1" />
                    <stop offset="100%" style="stop-color:#f0c419;stop-opacity:0" />
                </radialGradient>
                <filter id="textShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.5"/>
                </filter>
            </defs>
            
            <!-- カード背景 -->
            <rect width="150" height="250" rx="10" fill="url(#${gradientId})" stroke="#f0c419" stroke-width="2"/>
            
            <!-- グロウエフェクト -->
            <rect width="150" height="250" rx="10" fill="url(#glowEffect)"/>
            
            <!-- 星エフェクト -->
            <circle cx="30" cy="50" r="1" fill="#f0c419" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="120" cy="80" r="1" fill="#f0c419" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="40" cy="200" r="1" fill="#f0c419" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="110" cy="220" r="1" fill="#f0c419" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite"/>
            </circle>
            
            <!-- カード番号 -->
            <text x="15" y="25" fill="#f0c419" font-family="'Noto Sans JP', sans-serif" font-size="14" font-weight="bold">${cardNumber}</text>
            
            <!-- 逆位置インジケーター -->
            ${reversedIndicator}
            
            <g ${rotation} transform-origin="75 125">
                <!-- メインシンボル -->
                <text x="75" y="110" fill="#f0c419" font-size="48" text-anchor="middle" filter="url(#textShadow)">${symbol}</text>
                
                <!-- カード名 -->
                <text x="75" y="180" fill="#f0c419" font-family="'Noto Sans JP', sans-serif" font-size="14" font-weight="600" text-anchor="middle" filter="url(#textShadow)">${cardName}</text>
            </g>
        </svg>
    `;
}

// Canvas経由でSVGを画像URLに変換
function svgToImageUrl(svgString) {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
}

// カード画像URL生成関数
function generateCardImageUrl(cardId, cardName, cardNumber, isReversed = false) {
    const svg = generateCardSVG(cardId, cardName, cardNumber, isReversed);
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}