// タロットカード データベース（大アルカナ22枚）
const TAROT_CARDS = [
    {
        id: 'fool',
        name: '愚者',
        number: 0,
        keywords: {
            upright: ['新しい始まり', '自由', '冒険', '無邪気'],
            reversed: ['軽率', '無謀', '計画性の欠如', '危険']
        },

        meanings: {
            upright: '新しい冒険や挑戦への第一歩。純粋な心で未知の世界に飛び込む時です。恐れずに前進しましょう。',
            reversed: '行動する前によく考える必要があります。計画を立てて慎重に進むことが大切です。'
        }
    },
    {
        id: 'magician',
        name: '魔術師',
        number: 1,
        keywords: {
            upright: ['意志力', '創造力', '技術', '集中力'],
            reversed: ['優柔不断', '力の乱用', '詐欺', '操作']
        },

        meanings: {
            upright: 'あなたには目標を実現する力があります。集中力と創造性を活かして、望むものを手に入れることができるでしょう。',
            reversed: '力を正しく使えていない可能性があります。自分の能力を過信せず、謙虚に取り組みましょう。'
        }
    },
    {
        id: 'high_priestess',
        name: '女教皇',
        number: 2,
        keywords: {
            upright: ['直感', '神秘', '内なる声', '知恵'],
            reversed: ['直感の無視', '秘密', '表面的理解', '情報不足']
        },

        meanings: {
            upright: '直感に従う時です。内なる声に耳を傾け、心の奥にある答えを見つけましょう。',
            reversed: '感情に流されすぎているかもしれません。もう少し客観的に状況を見る必要があります。'
        }
    },
    {
        id: 'empress',
        name: '女帝',
        number: 3,
        keywords: {
            upright: ['豊穣', '創造性', '母性', '自然'],
            reversed: ['依存', '過保護', '創造性の欠如', '不毛']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=女帝',
        meanings: {
            upright: '創造力が豊かな時期です。新しいアイデアや計画が実を結ぶでしょう。愛情深く行動しましょう。',
            reversed: '他人に依存しすぎている可能性があります。自立心を持って行動することが大切です。'
        }
    },
    {
        id: 'emperor',
        name: '皇帝',
        number: 4,
        keywords: {
            upright: ['権威', 'リーダーシップ', '安定', '統制'],
            reversed: ['独裁', '頑固', '権力乱用', '不安定']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=皇帝',
        meanings: {
            upright: 'リーダーシップを発揮する時です。責任を持って決断し、周りを導いていきましょう。',
            reversed: '権力を振りかざしすぎているかもしれません。もっと柔軟性を持って接しましょう。'
        }
    },
    {
        id: 'hierophant',
        name: '教皇',
        number: 5,
        keywords: {
            upright: ['伝統', '教育', '精神的指導', '道徳'],
            reversed: ['反逆', '独創性', '型破り', '自由思想']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=教皇',
        meanings: {
            upright: '伝統的な方法や教えから学ぶ時です。経験豊富な人からアドバイスを求めましょう。',
            reversed: '既存の枠にとらわれず、自分らしい道を見つける時かもしれません。'
        }
    },
    {
        id: 'lovers',
        name: '恋人',
        number: 6,
        keywords: {
            upright: ['愛', '選択', '調和', 'パートナーシップ'],
            reversed: ['不和', '誤った選択', '関係の問題', '価値観の相違']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=恋人',
        meanings: {
            upright: '重要な選択の時です。心に従って決断すれば、良い結果が待っているでしょう。',
            reversed: '関係において誤解や対立があるかもしれません。コミュニケーションを大切にしましょう。'
        }
    },
    {
        id: 'chariot',
        name: '戦車',
        number: 7,
        keywords: {
            upright: ['勝利', 'コントロール', '前進', '意志力'],
            reversed: ['敗北', '方向性の迷い', 'コントロール不能', '挫折']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=戦車',
        meanings: {
            upright: '強い意志力で目標に向かって進む時です。困難を乗り越えて勝利を掴みましょう。',
            reversed: '方向性を見失っているかもしれません。一度立ち止まって計画を見直しましょう。'
        }
    },
    {
        id: 'strength',
        name: '力',
        number: 8,
        keywords: {
            upright: ['内なる力', '勇気', '忍耐', '自制心'],
            reversed: ['弱さ', '自信の欠如', '暴力的', '感情の乱れ']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=力',
        meanings: {
            upright: '内なる力と勇気を信じましょう。優しさと強さを兼ね備えて困難に立ち向かいましょう。',
            reversed: '感情に振り回されているかもしれません。冷静さを取り戻すことが必要です。'
        }
    },
    {
        id: 'hermit',
        name: '隠者',
        number: 9,
        keywords: {
            upright: ['内省', '自己探求', '知恵', '孤独'],
            reversed: ['孤立', '頑固', '内向的すぎる', '助言の拒否']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=隠者',
        meanings: {
            upright: '自分自身と向き合う時です。静かに内省し、人生の答えを見つけましょう。',
            reversed: '一人でいすぎるかもしれません。時には他人の助けを求めることも大切です。'
        }
    },
    {
        id: 'wheel_of_fortune',
        name: '運命の輪',
        number: 10,
        keywords: {
            upright: ['運命', '転機', '幸運', '循環'],
            reversed: ['不運', '停滞', '悪循環', '運命への抵抗']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=運命の輪',
        meanings: {
            upright: '人生の転機が訪れています。運命の流れに身を任せ、新しいチャンスを掴みましょう。',
            reversed: '思うように事が進まない時期かもしれません。流れが変わるまで辛抱強く待ちましょう。'
        }
    },
    {
        id: 'justice',
        name: '正義',
        number: 11,
        keywords: {
            upright: ['公正', 'バランス', '真実', '決断'],
            reversed: ['不公正', '偏見', '不誠実', 'バランスの欠如']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=正義',
        meanings: {
            upright: '公正な判断を下す時です。真実を見極め、バランスの取れた決断をしましょう。',
            reversed: '偏った見方をしているかもしれません。もう一度客観的に状況を見直しましょう。'
        }
    },
    {
        id: 'hanged_man',
        name: '吊された男',
        number: 12,
        keywords: {
            upright: ['犠牲', '忍耐', '新しい視点', '待機'],
            reversed: ['無駄な犠牲', '停滞', '視野の狭さ', '焦り']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=吊された男',
        meanings: {
            upright: '今は待つ時です。違う角度から物事を見ることで、新しい発見があるでしょう。',
            reversed: '無意味な我慢をしているかもしれません。行動を起こす時期が来ています。'
        }
    },
    {
        id: 'death',
        name: '死神',
        number: 13,
        keywords: {
            upright: ['変化', '終わり', '再生', '変革'],
            reversed: ['変化への抵抗', '停滞', '恐れ', '執着']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=死神',
        meanings: {
            upright: '古いものが終わり、新しい始まりが訪れます。変化を恐れず受け入れましょう。',
            reversed: '変化を避けようとしているかもしれません。時には手放すことも必要です。'
        }
    },
    {
        id: 'temperance',
        name: '節制',
        number: 14,
        keywords: {
            upright: ['調和', 'バランス', '節制', '忍耐'],
            reversed: ['不調和', '過度', '不安定', '焦り']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=節制',
        meanings: {
            upright: 'バランスを保つ時です。極端に走らず、中庸の道を歩みましょう。',
            reversed: 'バランスが崩れているかもしれません。生活を見直し、調和を取り戻しましょう。'
        }
    },
    {
        id: 'devil',
        name: '悪魔',
        number: 15,
        keywords: {
            upright: ['束縛', '誘惑', '物質主義', '依存'],
            reversed: ['解放', '自由', '誘惑からの脱出', '自己制御']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=悪魔',
        meanings: {
            upright: '何かに縛られているかもしれません。誘惑に負けず、自分をコントロールしましょう。',
            reversed: '束縛から解放される時が来ています。自由を手に入れるチャンスです。'
        }
    },
    {
        id: 'tower',
        name: '塔',
        number: 16,
        keywords: {
            upright: ['破壊', '衝撃', '突然の変化', '真実の暴露'],
            reversed: ['内的変化', '回避', '小さな変化', '準備']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=塔',
        meanings: {
            upright: '突然の変化が訪れるかもしれません。困難な状況も、新しい始まりのためのものです。',
            reversed: '大きな変化を避けられるかもしれません。しかし、内的な変化は必要です。'
        }
    },
    {
        id: 'star',
        name: '星',
        number: 17,
        keywords: {
            upright: ['希望', 'インスピレーション', '癒し', '願望成就'],
            reversed: ['失望', '希望の喪失', '方向性の迷い', '悲観主義']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=星',
        meanings: {
            upright: '希望の光が見えています。あなたの願いは叶うでしょう。前向きに進みましょう。',
            reversed: '希望を失いかけているかもしれません。しかし、必ず光は戻ってきます。'
        }
    },
    {
        id: 'moon',
        name: '月',
        number: 18,
        keywords: {
            upright: ['幻想', '不安', '直感', '潜在意識'],
            reversed: ['真実の発見', '不安の解消', '明確化', '現実認識']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=月',
        meanings: {
            upright: '物事がはっきりしない時期です。直感を信じて、不安に振り回されないようにしましょう。',
            reversed: '混乱していた状況が明確になってきます。真実が見えてくるでしょう。'
        }
    },
    {
        id: 'sun',
        name: '太陽',
        number: 19,
        keywords: {
            upright: ['成功', '喜び', '活力', '達成'],
            reversed: ['一時的な挫折', '過度の自信', '傲慢', '遅延']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=太陽',
        meanings: {
            upright: '明るい未来が待っています。成功と喜びがあなたを包むでしょう。自信を持って進みましょう。',
            reversed: '一時的な困難があるかもしれませんが、最終的には良い結果になります。'
        }
    },
    {
        id: 'judgement',
        name: '審判',
        number: 20,
        keywords: {
            upright: ['復活', '新生', '呼び声', '覚醒'],
            reversed: ['自己疑念', '判断ミス', '復活の拒否', '後悔']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=審判',
        meanings: {
            upright: '新しい人生の始まりです。過去を振り返り、学んだことを活かして前進しましょう。',
            reversed: '過去にとらわれすぎているかもしれません。前に進む勇気を持ちましょう。'
        }
    },
    {
        id: 'world',
        name: '世界',
        number: 21,
        keywords: {
            upright: ['完成', '達成', '統合', '成功'],
            reversed: ['未完成', '達成の遅れ', '満足感の欠如', '停滞']
        },
        // image will be generated dynamically
        // placeholder: 'https://via.placeholder.com/150x250/4f4a7d/f0c419?text=世界',
        meanings: {
            upright: '目標が達成される時です。これまでの努力が実を結び、完成を迎えるでしょう。',
            reversed: 'もう少しで目標達成です。最後まで諦めずに取り組みましょう。'
        }
    }
];

// カードをランダムに選択し、正逆もランダムに決定する関数
function drawRandomCard(excludeIds = []) {
    // 小アルカナも含む全カードから選択
    const allCards = getAllTarotCards();
    let availableCards = allCards.filter(card => !excludeIds.includes(card.id));
    
    // 全部除外されている場合は全てのカードから選択
    if (availableCards.length === 0) {
        availableCards = allCards;
    }
    
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];
    const isReversed = Math.random() < 0.5;
    
    // 動的画像生成（小アルカナ対応）
    const cardImageUrl = generateCardImageUrl(card.id, card.name, card.number || 0, isReversed);
    
    return {
        ...card,
        isReversed: isReversed,
        position: isReversed ? '逆位置' : '正位置',
        currentKeywords: isReversed ? card.keywords.reversed : card.keywords.upright,
        currentMeaning: isReversed ? card.meanings.reversed : card.meanings.upright,
        image: cardImageUrl
    };
}

// 全78枚のタロットカードデッキ（大アルカナ + 小アルカナ）
const ALL_TAROT_CARDS = [...TAROT_CARDS, ...MINOR_ARCANA_CARDS];

// カードをランダムに選択し、正逆もランダムに決定する関数（全78枚対応）
function drawRandomCardFromFullDeck(excludeIds = []) {
    let availableCards = ALL_TAROT_CARDS.filter(card => !excludeIds.includes(card.id));
    
    // 全部除外されている場合は全てのカードから選択
    if (availableCards.length === 0) {
        availableCards = ALL_TAROT_CARDS;
    }
    
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];
    const isReversed = Math.random() < 0.5;
    
    // 動的画像生成
    const cardImageUrl = generateCardImageUrl(card.id, card.name, card.number, isReversed);
    
    return {
        ...card,
        isReversed: isReversed,
        position: isReversed ? '逆位置' : '正位置',
        currentKeywords: isReversed ? card.keywords.reversed : card.keywords.upright,
        currentMeaning: isReversed ? card.meanings.reversed : card.meanings.upright,
        image: cardImageUrl
    };
}

// スリーカード用：重複しない3枚のカードを引く関数
function drawThreeUniqueCards() {
    const cards = [];
    const usedIds = [];
    
    for (let i = 0; i < 3; i++) {
        const card = drawRandomCard(usedIds);
        cards.push(card);
        usedIds.push(card.id);
    }
    
    return cards;
}

// ケルト十字用：重複しない10枚のカードを引く関数
function drawCelticCrossCards() {
    const cards = [];
    const usedIds = [];
    
    for (let i = 0; i < 10; i++) {
        const card = drawRandomCard(usedIds);
        cards.push(card);
        usedIds.push(card.id);
    }
    
    return cards;
}

// フルデッキからケルト十字の10枚を引く関数
function drawCelticCrossCardsFromFullDeck() {
    const cards = [];
    const usedIds = [];
    
    for (let i = 0; i < 10; i++) {
        const card = drawRandomCardFromFullDeck(usedIds);
        cards.push(card);
        usedIds.push(card.id);
    }
    
    return cards;
}

// デッキに応じてケルト十字のカードを引く関数
function drawCelticCrossCardsBasedOnDeck() {
    return useFullDeck ? drawCelticCrossCardsFromFullDeck() : drawCelticCrossCards();
}

// フルデッキからスリーカードを引く関数
function drawThreeUniqueCardsFromFullDeck() {
    const cards = [];
    const usedIds = [];
    
    for (let i = 0; i < 3; i++) {
        const card = drawRandomCardFromFullDeck(usedIds);
        cards.push(card);
        usedIds.push(card.id);
    }
    
    return cards;
}

// デッキ選択フラグ（大アルカナのみ: false, 全78枚: true）
let useFullDeck = false;

// デッキ切り替え関数
function toggleDeck() {
    useFullDeck = !useFullDeck;
    return useFullDeck;
}

// 現在のデッキに応じてカードを引く関数
function drawRandomCardBasedOnDeck(excludeIds = []) {
    return useFullDeck ? drawRandomCardFromFullDeck(excludeIds) : drawRandomCard(excludeIds);
}

function drawThreeUniqueCardsBasedOnDeck() {
    return useFullDeck ? drawThreeUniqueCardsFromFullDeck() : drawThreeUniqueCards();
}