// シーズー案内役 SVGジェネレーター

function generateShihTzuSVG(expression = 'happy') {
    const expressions = {
        'happy': {
            eyes: '😊',
            mouth: 'M 45 55 Q 50 60 55 55',
            eyeColor: '#2c2a4a'
        },
        'wise': {
            eyes: '🧙‍♂️',
            mouth: 'M 45 55 Q 50 57 55 55',
            eyeColor: '#4f4a7d'
        },
        'excited': {
            eyes: '✨',
            mouth: 'M 43 55 Q 50 62 57 55',
            eyeColor: '#f0c419'
        },
        'peaceful': {
            eyes: '😌',
            mouth: 'M 47 55 Q 50 57 53 55',
            eyeColor: '#2c2a4a'
        },
        'concerned': {
            eyes: '😟',
            mouth: 'M 47 57 Q 50 54 53 57',
            eyeColor: '#6b5335'
        }
    };

    const expr = expressions[expression] || expressions['happy'];
    
    return `
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="furGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#f8f6f0;stop-opacity:1" />
                    <stop offset="60%" style="stop-color:#e8e2d4;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d4c8b8;stop-opacity:1" />
                </radialGradient>
                <radialGradient id="earGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#8b7355;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#6b5335;stop-opacity:1" />
                </radialGradient>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- 魔法のオーラ -->
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f0c419" stroke-width="1" opacity="0.3">
                <animate attributeName="r" values="45;50;45" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            <!-- 耳（左） -->
            <ellipse cx="30" cy="30" rx="8" ry="15" fill="url(#earGradient)" transform="rotate(-30 30 30)"/>
            <!-- 耳（右） -->
            <ellipse cx="70" cy="30" rx="8" ry="15" fill="url(#earGradient)" transform="rotate(30 70 30)"/>
            
            <!-- 顔（メイン） -->
            <circle cx="50" cy="50" r="25" fill="url(#furGradient)" stroke="#d4c8b8" stroke-width="1"/>
            
            <!-- 鼻周り -->
            <ellipse cx="50" cy="45" rx="12" ry="8" fill="#f8f6f0"/>
            
            <!-- 目（左） -->
            <circle cx="42" cy="42" r="3" fill="${expr.eyeColor}"/>
            <circle cx="43" cy="41" r="1" fill="#ffffff" opacity="0.8"/>
            
            <!-- 目（右） -->
            <circle cx="58" cy="42" r="3" fill="${expr.eyeColor}"/>
            <circle cx="59" cy="41" r="1" fill="#ffffff" opacity="0.8"/>
            
            <!-- 鼻 -->
            <ellipse cx="50" cy="48" rx="2" ry="1.5" fill="#2c2a4a"/>
            
            <!-- 口 -->
            <path d="${expr.mouth}" stroke="#2c2a4a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            
            <!-- 頬の模様 -->
            <circle cx="35" cy="50" r="2" fill="#f0c419" opacity="0.6"/>
            <circle cx="65" cy="50" r="2" fill="#f0c419" opacity="0.6"/>
            
            <!-- 魔法の星 -->
            <g opacity="0.7">
                <text x="75" y="25" font-size="8" fill="#f0c419">✦</text>
                <animateTransform attributeName="transform" type="rotate" values="0 75 25;360 75 25" dur="10s" repeatCount="indefinite"/>
            </g>
            <g opacity="0.5">
                <text x="25" y="75" font-size="6" fill="#f0c419">✧</text>
                <animateTransform attributeName="transform" type="rotate" values="360 25 75;0 25 75" dur="8s" repeatCount="indefinite"/>
            </g>
        </svg>
    `;
}

// シーズーの表情を動的に変更する関数
function updateShihTzuExpression(expression) {
    const avatar = document.querySelector('.shih-tzu-avatar');
    if (avatar) {
        const svgString = generateShihTzuSVG(expression);
        avatar.innerHTML = svgString;
    }
}

// Base64データURL生成
function generateShihTzuDataUrl(expression = 'happy') {
    const svg = generateShihTzuSVG(expression);
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}