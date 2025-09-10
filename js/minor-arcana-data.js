// 小アルカナ 56枚のデータベース

// 小アルカナのシンボル（card-generator.jsで定義されているため削除）

// 小アルカナ カードデータ（代表的な24枚）
const MINOR_ARCANA_CARDS = [
    // ワンド（棒）- 火のエレメント
    {
        id: 'ace_of_wands',
        name: 'ワンドのエース',
        suit: 'wands',
        number: 1,
        keywords: {
            upright: ['新しい始まり', '創造力', '情熱', 'インスピレーション'],
            reversed: ['遅延', '創造性の欠如', '無気力', '誤った方向']
        },
        meanings: {
            upright: '新しいプロジェクトや情熱的な取り組みが始まる時です。創造力とエネルギーに満ちています。',
            reversed: '計画が遅れているかもしれません。新しいアプローチを考える必要があります。'
        }
    },
    {
        id: 'two_of_wands',
        name: 'ワンドの2',
        suit: 'wands',
        number: 2,
        keywords: {
            upright: ['計画', '長期的視野', '個人的な力', '将来への展望'],
            reversed: ['計画不足', '恐れ', '優柔不断', '視野の狭さ']
        },
        meanings: {
            upright: '長期的な計画を立て、将来に向けての準備をする時です。あなたには力があります。',
            reversed: '計画が不十分かもしれません。もう一度戦略を見直しましょう。'
        }
    },
    {
        id: 'three_of_wands',
        name: 'ワンドの3',
        suit: 'wands',
        number: 3,
        keywords: {
            upright: ['拡張', '予見', '海外', 'リーダーシップ'],
            reversed: ['計画の遅れ', '予想外の障害', '視野の欠如', '個人的な挫折']
        },
        meanings: {
            upright: '計画が順調に進展し、新しい機会が見えてきています。拡張の時期です。',
            reversed: '予想していた結果が得られないかもしれません。忍耐が必要です。'
        }
    },
    {
        id: 'five_of_wands',
        name: 'ワンドの5',
        suit: 'wands',
        number: 5,
        keywords: {
            upright: ['競争', '対立', '闘争', '挑戦'],
            reversed: ['内なる対立', '争いの回避', '協力', '合意']
        },
        meanings: {
            upright: '競争や対立に直面していますが、これは成長の機会です。',
            reversed: '争いを避けて、協力的な解決策を見つけることができます。'
        }
    },
    {
        id: 'ten_of_wands',
        name: 'ワンドの10',
        suit: 'wands',
        number: 10,
        keywords: {
            upright: ['負担', '責任', '重圧', '達成の近さ'],
            reversed: ['負担の軽減', '責任の委譲', '燃え尽き', '解放']
        },
        meanings: {
            upright: '重い責任を負っていますが、成功は近いです。もう少し頑張りましょう。',
            reversed: '負担を軽くする方法を見つけましょう。他人に頼ることも大切です。'
        }
    },
    {
        id: 'king_of_wands',
        name: 'ワンドのキング',
        suit: 'wands',
        number: 14,
        keywords: {
            upright: ['リーダーシップ', 'ビジョン', '名誉', '起業家精神'],
            reversed: ['独裁', '高慢', '衝動性', '無責任']
        },
        meanings: {
            upright: '優れたリーダーシップを発揮し、ビジョンを実現する時です。',
            reversed: '権力を乱用していませんか。謙虚さを忘れずにいましょう。'
        }
    },

    // カップ（聖杯）- 水のエレメント
    {
        id: 'ace_of_cups',
        name: 'カップのエース',
        suit: 'cups',
        number: 1,
        keywords: {
            upright: ['新しい愛', '感情の始まり', '直感', '創造性'],
            reversed: ['感情の抑制', '愛の空虚', '創造性の欠如', '内向性']
        },
        meanings: {
            upright: '新しい愛や深い感情的なつながりが始まります。心を開きましょう。',
            reversed: '感情を表現することに躊躇しているかもしれません。心を開く勇気を持ちましょう。'
        }
    },
    {
        id: 'two_of_cups',
        name: 'カップの2',
        suit: 'cups',
        number: 2,
        keywords: {
            upright: ['パートナーシップ', '愛', '統合', '相互協力'],
            reversed: ['不調和', '別れ', '自己愛', '一方的な愛']
        },
        meanings: {
            upright: '調和の取れた関係やパートナーシップが形成されます。愛情が深まります。',
            reversed: '関係に不調和があるかもしれません。相互理解を深める必要があります。'
        }
    },
    {
        id: 'three_of_cups',
        name: 'カップの3',
        suit: 'cups',
        number: 3,
        keywords: {
            upright: ['友情', '祝福', 'コミュニティ', '創造的な協力'],
            reversed: ['過度の贅沢', '友情の破綻', '孤立', '協力の欠如']
        },
        meanings: {
            upright: '友人との楽しい時間や祝祭を楽しむ時です。コミュニティとのつながりを大切に。',
            reversed: '表面的な関係に注意しましょう。本当の友情を見極める必要があります。'
        }
    },
    {
        id: 'seven_of_cups',
        name: 'カップの7',
        suit: 'cups',
        number: 7,
        keywords: {
            upright: ['選択肢', '幻想', '白昼夢', '混乱'],
            reversed: ['現実主義', '決断力', '集中', '明確な目標']
        },
        meanings: {
            upright: '多くの選択肢がありますが、現実的でないものも含まれています。慎重に選びましょう。',
            reversed: '混乱から抜け出し、現実的な決断ができるようになります。'
        }
    },
    {
        id: 'nine_of_cups',
        name: 'カップの9',
        suit: 'cups',
        number: 9,
        keywords: {
            upright: ['満足', '願望成就', '感情的充足', '幸福'],
            reversed: ['貪欲', '物質主義', '不満', '傲慢']
        },
        meanings: {
            upright: '願いが叶い、感情的な満足を得られる時です。幸福を感じましょう。',
            reversed: '表面的な満足に頼りすぎているかもしれません。内面を見つめ直しましょう。'
        }
    },
    {
        id: 'queen_of_cups',
        name: 'カップのクイーン',
        suit: 'cups',
        number: 13,
        keywords: {
            upright: ['直感', '思いやり', '感情的知性', 'ケア'],
            reversed: ['感情的な不安定', '依存', '操作', '感情の抑制']
        },
        meanings: {
            upright: '直感を信じ、他者への思いやりを大切にしましょう。感情的な知恵があります。',
            reversed: '感情に振り回されすぎているかもしれません。バランスを取り戻しましょう。'
        }
    },

    // ソード（剣）- 風のエレメント  
    {
        id: 'ace_of_swords',
        name: 'ソードのエース',
        suit: 'swords',
        number: 1,
        keywords: {
            upright: ['新しいアイデア', '精神的明晰', '真実', 'ブレイクスルー'],
            reversed: ['混乱', '曇った判断', '誤情報', '内なる混乱']
        },
        meanings: {
            upright: '新しいアイデアや洞察が得られます。真実が明らかになるでしょう。',
            reversed: '考えが混乱しているかもしれません。情報を整理する必要があります。'
        }
    },
    {
        id: 'two_of_swords',
        name: 'ソードの2',
        suit: 'swords',
        number: 2,
        keywords: {
            upright: ['決断困難', '膠着状態', '回避', 'バランス'],
            reversed: ['決断', '情報開示', '優柔不断の克服', '偏見']
        },
        meanings: {
            upright: '難しい決断を迫られています。時間をかけて慎重に考えましょう。',
            reversed: '決断を下す準備ができています。情報が明らかになるでしょう。'
        }
    },
    {
        id: 'three_of_swords',
        name: 'ソードの3',
        suit: 'swords',
        number: 3,
        keywords: {
            upright: ['心の痛み', '悲しみ', '裏切り', '感情的な痛み'],
            reversed: ['回復', '許し', '感情的な解放', '和解']
        },
        meanings: {
            upright: '心の痛みや悲しみを経験していますが、これも成長の一部です。',
            reversed: '痛みから回復し、心の傷が癒されつつあります。'
        }
    },
    {
        id: 'five_of_swords',
        name: 'ソードの5',
        suit: 'swords',
        number: 5,
        keywords: {
            upright: ['対立', '敗北', '不名誉', '自己利益'],
            reversed: ['和解', '許し', '平和を作る', '妥協']
        },
        meanings: {
            upright: '対立や争いの結果、誰も真の勝者になれません。和解を模索しましょう。',
            reversed: '争いを終わらせ、平和を築く時です。過去を許しましょう。'
        }
    },
    {
        id: 'seven_of_swords',
        name: 'ソードの7',
        suit: 'swords',
        number: 7,
        keywords: {
            upright: ['欺瞞', '戦略', '逃避', '孤独行動'],
            reversed: ['告白', '誠実さ', '責任を取る', '協力']
        },
        meanings: {
            upright: '状況を慎重に判断し、戦略的に行動する必要があります。',
            reversed: '真実を話し、責任を取る時です。協力的な解決策を探しましょう。'
        }
    },
    {
        id: 'king_of_swords',
        name: 'ソードのキング',
        suit: 'swords',
        number: 14,
        keywords: {
            upright: ['知性', '権威', '真実', '道徳的明瞭さ'],
            reversed: ['独裁', '無情', '操作', '思いやりの欠如']
        },
        meanings: {
            upright: '知性と論理を使って正しい判断を下しましょう。真実を追求してください。',
            reversed: '厳格すぎるかもしれません。もう少し思いやりを持ちましょう。'
        }
    },

    // ペンタクル（金貨）- 地のエレメント
    {
        id: 'ace_of_pentacles',
        name: 'ペンタクルのエース',
        suit: 'pentacles',
        number: 1,
        keywords: {
            upright: ['新しい機会', '物質的な始まり', '繁栄', '実用性'],
            reversed: ['機会の損失', '貪欲', '安全保障の欠如', '短期的思考']
        },
        meanings: {
            upright: '新しい物質的な機会や安定をもたらすチャンスが訪れます。',
            reversed: '機会を見逃しているかもしれません。実用的なアプローチが必要です。'
        }
    },
    {
        id: 'three_of_pentacles',
        name: 'ペンタクルの3',
        suit: 'pentacles',
        number: 3,
        keywords: {
            upright: ['協力', 'チームワーク', '技能', '建設'],
            reversed: ['協力の欠如', '技能不足', '個人主義', '質の低い仕事']
        },
        meanings: {
            upright: 'チームワークと協力により、優れた成果を達成できます。',
            reversed: '協力が不足しているかもしれません。コミュニケーションを改善しましょう。'
        }
    },
    {
        id: 'six_of_pentacles',
        name: 'ペンタクルの6',
        suit: 'pentacles',
        number: 6,
        keywords: {
            upright: ['寛大さ', '与える', '受け取る', 'バランス'],
            reversed: ['自己奉仕', '負債', '一方的な関係', '不公平']
        },
        meanings: {
            upright: '与えることと受け取ることのバランスが取れています。寛大さを示しましょう。',
            reversed: '与えることと受け取ることのバランスが崩れています。公平性を考えましょう。'
        }
    },
    {
        id: 'nine_of_pentacles',
        name: 'ペンタクルの9',
        suit: 'pentacles',
        number: 9,
        keywords: {
            upright: ['物質的な成功', '独立', '自給自足', '達成'],
            reversed: ['物質主義', '過度の労働', '金銭的な損失', '依存']
        },
        meanings: {
            upright: '努力の結果、物質的な成功と独立を達成しました。成果を楽しみましょう。',
            reversed: '成功に満足せず、さらなる向上を目指しましょう。バランスも大切です。'
        }
    },
    {
        id: 'ten_of_pentacles',
        name: 'ペンタクルの10',
        suit: 'pentacles',
        number: 10,
        keywords: {
            upright: ['遺産', '家族の富', '確立', '長期的な成功'],
            reversed: ['金銭的な損失', '家族の問題', '不安定', '短期思考']
        },
        meanings: {
            upright: '長期的な成功と家族の安定が確立されます。遺産や伝統を大切にしましょう。',
            reversed: '家族や財政に問題があるかもしれません。安定性を築く必要があります。'
        }
    },
    {
        id: 'queen_of_pentacles',
        name: 'ペンタクルのクイーン',
        suit: 'pentacles',
        number: 13,
        keywords: {
            upright: ['実用性', '母性', '安全保障', '豊かさ'],
            reversed: ['物質主義', '依存', '自己疑念', '仕事と生活の不均衡']
        },
        meanings: {
            upright: '実用的で母性的なアプローチで、安定と豊かさを築きましょう。',
            reversed: '物質面に偏りすぎているかもしれません。バランスを見直しましょう。'
        }
    }
];

// 小アルカナを含む全カードシンボル統合は card-generator.js で行う

// 小アルカナを含む全カードデータを統合
function getAllTarotCards() {
    return [...TAROT_CARDS, ...MINOR_ARCANA_CARDS];
}