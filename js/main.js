// メインアプリケーション
class TarotApp {
    constructor() {
        this.currentCard = null;
        this.currentCards = []; // スリーカード用
        this.isReading = false;
        this.currentSpread = 'one-card'; // 'one-card' or 'three-card'
        this.guideMessages = {
            'one-card': [
                'こんばんは！私がココチャピです。今夜は一緒にタロットの世界を旅しませんか？',
                '深呼吸をして、心を落ち着けてください。カードがあなたにメッセージを伝えてくれますよ。',
                'あなたの質問を心に浮かべながら、カードを引いてみましょう。',
                'カードからの素敵なメッセージが届きましたね！この導きを大切にしてください。',
                'また新しい質問がある時は、いつでもお声かけくださいね。星空の下で待っています。'
            ],
            'three-card': [
                'スリーカード占いですね！過去・現在・未来の流れを見てみましょう。',
                '心を静めて、あなたの人生の流れについて思いを巡らせてください。',
                '3枚のカードが、あなたの物語を語ってくれますよ。',
                '素晴らしい！過去から未来への流れが見えてきましたね。この導きを大切にしてください。',
                'スリーカードはいかがでしたか？また占いたい時はいつでもお声かけくださいね。'
            ],
            'celtic-cross': [
                'ケルト十字ですね！これは最も本格的で深い占いです。心の準備はよろしいですか？',
                'ゆっくりと深呼吸をして、あなたが本当に知りたいことについて集中してください。',
                '10枚のカードが、あなたの状況を多角的に照らし出してくれるでしょう。',
                '素晴らしい！ケルト十字があなたの人生の全体像を明らかにしてくれました。深い洞察を得られましたね。',
                'ケルト十字占いお疲れさまでした。この深い導きを人生に活かしてくださいね。'
            ]
        };
        this.currentGuideIndex = 0;
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.showWelcomeMessage();
        this.setupAudio();
    }

    setupAudio() {
        // 音響ボタンのイベント
        const audioToggleBtn = document.getElementById('audio-toggle-btn');
        if (audioToggleBtn) {
            audioToggleBtn.addEventListener('click', () => {
                const isEnabled = audioManager.toggleAudio();
                audioToggleBtn.textContent = isEnabled ? '🔊 音響' : '🔇 音響';
                audioToggleBtn.classList.toggle('disabled', !isEnabled);
                audioManager.playButtonClick();
            });
        }

        // BGM開始（最初のユーザー操作後）
        setTimeout(() => {
            audioManager.playBGM();
        }, 2000);
    }

    bindEvents() {
        // デッキ選択ボタン
        const majorOnlyBtn = document.getElementById('major-only-btn');
        const fullDeckBtn = document.getElementById('full-deck-btn');
        if (majorOnlyBtn) {
            majorOnlyBtn.addEventListener('click', () => this.selectDeck('major-only'));
        }
        if (fullDeckBtn) {
            fullDeckBtn.addEventListener('click', () => this.selectDeck('full-deck'));
        }

        // 占い方法選択ボタン
        const oneCardBtn = document.getElementById('one-card-btn');
        const threeCardBtn = document.getElementById('three-card-btn');
        const celticCrossBtn = document.getElementById('celtic-cross-btn');
        if (oneCardBtn) {
            oneCardBtn.addEventListener('click', () => this.selectSpread('one-card'));
        }
        if (threeCardBtn) {
            threeCardBtn.addEventListener('click', () => this.selectSpread('three-card'));
        }
        if (celticCrossBtn) {
            celticCrossBtn.addEventListener('click', () => this.selectSpread('celtic-cross'));
        }

        // ワンカードを引くボタンのイベント
        const drawButton = document.getElementById('draw-card-btn');
        if (drawButton) {
            drawButton.addEventListener('click', () => this.drawCard());
        }

        // スリーカードを引くボタンのイベント
        const drawThreeButton = document.getElementById('draw-three-cards-btn');
        if (drawThreeButton) {
            drawThreeButton.addEventListener('click', () => this.drawThreeCards());
        }

        // ケルト十字を引くボタンのイベント
        const drawCelticCrossButton = document.getElementById('draw-celtic-cross-btn');
        if (drawCelticCrossButton) {
            drawCelticCrossButton.addEventListener('click', () => this.drawCelticCross());
        }

        // もう一度占うボタンのイベント
        const newReadingButton = document.getElementById('new-reading-btn');
        if (newReadingButton) {
            newReadingButton.addEventListener('click', () => this.resetReading());
        }

        const newThreeCardReadingButton = document.getElementById('new-three-card-reading-btn');
        if (newThreeCardReadingButton) {
            newThreeCardReadingButton.addEventListener('click', () => this.resetReading());
        }

        const newCelticCrossReadingButton = document.getElementById('new-celtic-cross-reading-btn');
        if (newCelticCrossReadingButton) {
            newCelticCrossReadingButton.addEventListener('click', () => this.resetReading());
        }

        // カードホバー効果
        const cardBack = document.querySelector('.card-back');
        if (cardBack) {
            cardBack.addEventListener('mouseenter', () => this.onCardHover());
        }

        // 質問入力フィールドのイベント
        const questionInput = document.getElementById('user-question');
        if (questionInput) {
            questionInput.addEventListener('focus', () => this.onQuestionFocus());
        }
    }

    showWelcomeMessage() {
        this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
        updateShihTzuExpression('happy');
    }

    selectDeck(deckType) {
        if (this.isReading) return;

        // ボタンのアクティブ状態を切り替え
        document.querySelectorAll('.deck-option').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(deckType + '-btn').classList.add('active');

        // グローバルなデッキ設定を更新
        if (deckType === 'full-deck') {
            useFullDeck = true;
            this.updateGuideMessage('フルデッキ（78枚）を選択しました。より深い占い体験をお楽しみください！');
            updateShihTzuExpression('wise');
        } else {
            useFullDeck = false;
            this.updateGuideMessage('大アルカナ（22枚）を選択しました。分かりやすい占いをお楽しみください！');
            updateShihTzuExpression('happy');
        }

        // 少し待ってから通常のメッセージに戻す
        setTimeout(() => {
            this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
        }, 2000);
    }

    selectSpread(spreadType) {
        if (this.isReading) return;

        audioManager.playButtonClick();
        this.currentSpread = spreadType;
        this.currentGuideIndex = 0;

        // ボタンのアクティブ状態を切り替え
        document.querySelectorAll('.spread-option').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(spreadType + '-btn').classList.add('active');

        // カードエリアを切り替え
        document.querySelectorAll('.card-area').forEach(area => {
            area.classList.remove('active');
        });
        document.getElementById(spreadType + '-area').classList.add('active');

        // ガイドメッセージを更新
        this.updateGuideMessage(this.guideMessages[spreadType][0]);
        
        // シーズーの表情を変更
        if (spreadType === 'three-card') {
            updateShihTzuExpression('wise');
        } else {
            updateShihTzuExpression('happy');
        }
    }

    onQuestionFocus() {
        if (this.currentGuideIndex === 0) {
            this.currentGuideIndex = 1;
            setTimeout(() => {
                this.updateGuideMessage(this.guideMessages[this.currentSpread][1]);
                updateShihTzuExpression('peaceful');
            }, 500);
        }
    }

    onCardHover() {
        if (!this.isReading && this.currentGuideIndex === 1) {
            this.currentGuideIndex = 2;
            this.updateGuideMessage(this.guideMessages[this.currentSpread][2]);
            updateShihTzuExpression('excited');
        }
    }

    updateGuideMessage(message) {
        const guideText = document.getElementById('guide-text');
        if (guideText) {
            // フェードアウト
            guideText.style.opacity = '0';
            
            setTimeout(() => {
                guideText.textContent = message;
                // フェードイン
                guideText.style.opacity = '1';
            }, 300);
        }
    }

    async drawCard() {
        if (this.isReading) return;
        
        // 質問が入力されているかチェック
        const questionInput = document.getElementById('user-question');
        const question = questionInput.value.trim();
        
        if (!question) {
            // 質問が空の場合、入力を促すメッセージを表示
            this.updateGuideMessage('占いを始める前に、あなたの質問や悩みを「あなたの質問」欄に入力してください。心の中の想いを言葉にしてみましょう。');
            updateShihTzuExpression('concerned');
            
            // 質問入力欄にフォーカス
            questionInput.focus();
            
            // 軽い警告音
            audioManager.playButtonClick();
            
            // 3秒後に元のメッセージに戻す
            setTimeout(() => {
                this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
                updateShihTzuExpression('happy');
            }, 3000);
            
            return;
        }
        
        audioManager.playButtonClick();
        this.isReading = true;
        const drawButton = document.getElementById('draw-card-btn');
        const cardBack = document.querySelector('.card-back');
        
        // ボタンを無効化
        drawButton.disabled = true;
        drawButton.textContent = 'カードを選んでいます...';
        
        // カードシャッフル音
        audioManager.playCardShuffle();
        
        // カードシャッフルアニメーション
        this.animateCardShuffle(cardBack);
        
        // カードをドロー
        setTimeout(() => {
            this.currentCard = drawRandomCardBasedOnDeck();
            this.revealCard();
        }, 2000);
    }

    animateCardShuffle(cardElement) {
        let shuffleCount = 0;
        const maxShuffles = 8;
        
        const shuffleInterval = setInterval(() => {
            // カードをシャッフル中の視覚効果
            cardElement.style.transform = `
                translateY(${Math.random() * 20 - 10}px) 
                rotateY(${Math.random() * 20 - 10}deg)
                scale(${0.95 + Math.random() * 0.1})
            `;
            
            shuffleCount++;
            if (shuffleCount >= maxShuffles) {
                clearInterval(shuffleInterval);
                // 元の位置に戻す
                cardElement.style.transform = 'translateY(0) rotateY(0) scale(1)';
            }
        }, 250);
    }

    revealCard() {
        const cardBack = document.querySelector('.card-back');
        const resultArea = document.getElementById('result-area');
        
        // カードフリップ音
        audioManager.playCardFlip();
        
        // カード回転アニメーション
        cardBack.style.transform = 'rotateY(180deg)';
        cardBack.style.opacity = '0';
        
        setTimeout(() => {
            this.displayCardResult();
            this.showResultArea();
            this.updateGuideAfterReading();
            // 成功音
            audioManager.playSuccess();
        }, 500);
    }

    displayCardResult() {
        const resultCardImage = document.getElementById('result-card-image');
        const resultCardName = document.getElementById('result-card-name');
        const resultCardPosition = document.getElementById('result-card-position');
        const resultInterpretation = document.getElementById('result-interpretation-text');
        
        if (this.currentCard) {
            resultCardImage.src = this.currentCard.image;
            resultCardImage.alt = `${this.currentCard.name} (${this.currentCard.position})`;
            resultCardName.textContent = this.currentCard.name;
            resultCardPosition.textContent = this.currentCard.position;
            
            // キーワードと解釈を表示
            const keywordsText = this.currentCard.currentKeywords.join('、');
            const fullInterpretation = `
                【キーワード】${keywordsText}
                
                ${this.currentCard.currentMeaning}
            `;
            resultInterpretation.textContent = fullInterpretation;
            
            // 占い結果を保存
            this.saveCurrentReading('one-card');
        }
    }

    showResultArea() {
        const resultArea = document.getElementById('one-card-result');
        resultArea.style.display = 'block';
        
        // アニメーション効果
        setTimeout(() => {
            resultArea.classList.add('show');
        }, 100);
    }

    async drawThreeCards() {
        if (this.isReading) return;
        
        // 質問が入力されているかチェック
        const questionInput = document.getElementById('user-question');
        const question = questionInput.value.trim();
        
        if (!question) {
            // 質問が空の場合、入力を促すメッセージを表示
            this.updateGuideMessage('占いを始める前に、あなたの質問や悩みを「あなたの質問」欄に入力してください。心の中の想いを言葉にしてみましょう。');
            updateShihTzuExpression('concerned');
            
            // 質問入力欄にフォーカス
            questionInput.focus();
            
            // 軽い警告音
            audioManager.playButtonClick();
            
            // 3秒後に元のメッセージに戻す
            setTimeout(() => {
                this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
                updateShihTzuExpression('happy');
            }, 3000);
            
            return;
        }
        
        audioManager.playButtonClick();
        this.isReading = true;
        const drawButton = document.getElementById('draw-three-cards-btn');
        const cardBacks = document.querySelectorAll('.card-back.three-card');
        
        // ボタンを無効化
        drawButton.disabled = true;
        drawButton.textContent = 'カードを選んでいます...';
        
        // カードシャッフル音
        audioManager.playCardShuffle();
        
        // 3枚のカードをシャッフル
        cardBacks.forEach((card, index) => {
            setTimeout(() => {
                this.animateCardShuffle(card);
            }, index * 300);
        });
        
        // カードをドロー
        setTimeout(() => {
            this.currentCards = drawThreeUniqueCardsBasedOnDeck();
            this.revealThreeCards();
        }, 2500);
    }

    revealThreeCards() {
        const cardBacks = document.querySelectorAll('.card-back.three-card');
        
        // カードフリップ音
        audioManager.playCardFlip();
        
        // カードを順番にリビール
        cardBacks.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(180deg)';
                card.style.opacity = '0';
            }, index * 500);
        });
        
        setTimeout(() => {
            this.displayThreeCardResult();
            this.showThreeCardResultArea();
            this.updateGuideAfterReading();
            // 成功音
            audioManager.playSuccess();
        }, 2000);
    }

    displayThreeCardResult() {
        const positions = ['past', 'present', 'future'];
        const positionNames = ['過去', '現在', '未来'];
        
        positions.forEach((position, index) => {
            const card = this.currentCards[index];
            
            document.getElementById(`${position}-card-image`).src = card.image;
            document.getElementById(`${position}-card-image`).alt = `${card.name} (${card.position})`;
            document.getElementById(`${position}-card-name`).textContent = card.name;
            document.getElementById(`${position}-card-position`).textContent = card.position;
            
            const keywordsText = card.currentKeywords.join('、');
            const interpretation = `【キーワード】${keywordsText}\n\n${card.currentMeaning}`;
            document.getElementById(`${position}-interpretation`).textContent = interpretation;
        });
        
        // 総合的なメッセージを生成
        this.generateOverallMessage();
        
        // 占い結果を保存
        this.saveCurrentReading('three-card');
    }

    generateOverallMessage() {
        const pastCard = this.currentCards[0];
        const presentCard = this.currentCards[1];
        const futureCard = this.currentCards[2];
        
        let overallMessage = `あなたの人生の流れを見てみると、`;
        
        // 過去の影響
        if (pastCard.isReversed) {
            overallMessage += `過去には困難や挑戦がありましたが、それが今のあなたを形作っています。`;
        } else {
            overallMessage += `過去の良い経験や学びが、現在のあなたの基盤となっています。`;
        }
        
        // 現在の状況
        if (presentCard.isReversed) {
            overallMessage += `現在は少し混乱や迷いがあるかもしれませんが、`;
        } else {
            overallMessage += `現在は${presentCard.currentKeywords[0]}の時期で、`;
        }
        
        // 未来への展望
        if (futureCard.isReversed) {
            overallMessage += `未来に向けては注意深く進む必要がありますが、適切な対処により良い結果を得られるでしょう。`;
        } else {
            overallMessage += `未来には${futureCard.currentKeywords[0]}が待っており、希望に満ちた展開が期待できます。`;
        }
        
        overallMessage += `\n\n過去を受け入れ、現在を大切にし、未来に向けて前向きに歩んでいきましょう。`;
        
        document.getElementById('overall-message').textContent = overallMessage;
    }

    showThreeCardResultArea() {
        const resultArea = document.getElementById('three-card-result');
        resultArea.style.display = 'block';
        
        // アニメーション効果
        setTimeout(() => {
            resultArea.classList.add('show');
        }, 100);
    }

    updateGuideAfterReading() {
        this.currentGuideIndex = 3;
        setTimeout(() => {
            this.updateGuideMessage(this.guideMessages[this.currentSpread][3]);
            updateShihTzuExpression('wise');
        }, 1000);
    }

    resetReading() {
        this.isReading = false;
        this.currentCard = null;
        this.currentCards = [];
        
        if (this.currentSpread === 'one-card') {
            this.resetOneCardReading();
        } else {
            this.resetThreeCardReading();
        }
        
        // 質問フィールドをクリア
        const questionInput = document.getElementById('user-question');
        questionInput.value = '';
        
        // ガイドメッセージをリセット
        this.currentGuideIndex = 4;
        this.updateGuideMessage(this.guideMessages[this.currentSpread][4]);
        
        // 少し待ってから最初のメッセージに戻す
        setTimeout(() => {
            this.currentGuideIndex = 0;
            this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
        }, 3000);
    }

    resetOneCardReading() {
        // UI要素をリセット
        const drawButton = document.getElementById('draw-card-btn');
        const cardBack = document.querySelector('#one-card-area .card-back');
        const resultArea = document.getElementById('one-card-result');
        
        // ボタンをリセット
        drawButton.disabled = false;
        drawButton.textContent = '✨ カードを引く ✨';
        
        // カードをリセット
        cardBack.style.transform = 'translateY(0) rotateY(0) scale(1)';
        cardBack.style.opacity = '1';
        
        // 結果エリアを非表示
        resultArea.classList.remove('show');
        setTimeout(() => {
            resultArea.style.display = 'none';
        }, 500);
    }

    resetThreeCardReading() {
        // UI要素をリセット
        const drawButton = document.getElementById('draw-three-cards-btn');
        const cardBacks = document.querySelectorAll('.card-back.three-card');
        const resultArea = document.getElementById('three-card-result');
        
        // ボタンをリセット
        drawButton.disabled = false;
        drawButton.textContent = '✨ 3枚のカードを引く ✨';
        
        // カードをリセット
        cardBacks.forEach(card => {
            card.style.transform = 'translateY(0) rotateY(0) scale(1)';
            card.style.opacity = '1';
        });
        
        // 結果エリアを非表示
        resultArea.classList.remove('show');
        setTimeout(() => {
            resultArea.style.display = 'none';
        }, 500);
    }
}

// TarotAppクラスに保存機能を追加
TarotApp.prototype.saveCurrentReading = function(spreadType) {
    try {
        const question = document.getElementById('user-question').value.trim();
        let readingData = {
            spreadType: spreadType,
            question: question || '（質問なし）'
        };

        if (spreadType === 'one-card') {
            readingData.card = {
                name: this.currentCard.name,
                position: this.currentCard.position,
                keywords: this.currentCard.currentKeywords,
                meaning: this.currentCard.currentMeaning,
                isReversed: this.currentCard.isReversed
            };
        } else if (spreadType === 'three-card') {
            readingData.cards = this.currentCards.map((card, index) => ({
                position: ['past', 'present', 'future'][index],
                positionName: ['過去', '現在', '未来'][index],
                name: card.name,
                cardPosition: card.position,
                keywords: card.currentKeywords,
                meaning: card.currentMeaning,
                isReversed: card.isReversed
            }));
            readingData.overallMessage = document.getElementById('overall-message').textContent;
        } else if (spreadType === 'celtic-cross') {
            const positions = ['present', 'challenge', 'past', 'future', 'crown', 'foundation', 'yourself', 'environment', 'hopes', 'outcome'];
            const positionNames = ['現在の状況', '課題・障害', '過去', '近い未来', '可能性', '基盤', 'あなた自身', '周囲の影響', '希望と恐れ', '最終結果'];
            
            readingData.cards = this.currentCards.map((card, index) => ({
                position: positions[index],
                positionName: positionNames[index],
                name: card.name,
                cardPosition: card.position,
                keywords: card.currentKeywords,
                meaning: card.currentMeaning,
                isReversed: card.isReversed
            }));
            readingData.overallMessage = document.getElementById('celtic-overall-message').textContent;
        }

        const savedId = tarotStorage.saveReading(readingData);
        if (savedId) {
            console.log('占い結果を保存しました:', savedId);
            this.showSaveNotification();
        }
    } catch (error) {
        console.error('保存エラー:', error);
    }
};

TarotApp.prototype.showSaveNotification = function() {
    // 簡単な通知を表示
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(240,196,25,0.9);
        color: #2c2a4a;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    notification.textContent = '📚 占い結果を保存しました';
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒後に消去
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
};

// ケルト十字占い機能を追加
TarotApp.prototype.drawCelticCross = async function() {
    if (this.isReading) return;
    
    // 質問が入力されているかチェック
    const questionInput = document.getElementById('user-question');
    const question = questionInput.value.trim();
    
    if (!question) {
        // 質問が空の場合、入力を促すメッセージを表示
        this.updateGuideMessage('占いを始める前に、あなたの質問や悩みを「あなたの質問」欄に入力してください。心の中の想いを言葉にしてみましょう。');
        updateShihTzuExpression('concerned');
        
        // 質問入力欄にフォーカス
        questionInput.focus();
        
        // 軽い警告音
        audioManager.playButtonClick();
        
        // 3秒後に元のメッセージに戻す
        setTimeout(() => {
            this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
            updateShihTzuExpression('happy');
        }, 3000);
        
        return;
    }
    
    audioManager.playButtonClick();
    this.isReading = true;
    const drawButton = document.getElementById('draw-celtic-cross-btn');
    const cardBacks = document.querySelectorAll('.card-back.celtic-card');
    
    // ボタンを無効化
    drawButton.disabled = true;
    drawButton.textContent = '10枚のカードを選んでいます...';
    
    // カードシャッフル音
    audioManager.playCardShuffle();
    
    // 10枚のカードをシャッフル
    cardBacks.forEach((card, index) => {
        setTimeout(() => {
            this.animateCardShuffle(card);
        }, index * 200);
    });
    
    // カードをドロー
    setTimeout(() => {
        this.currentCards = drawCelticCrossCardsBasedOnDeck();
        this.revealCelticCross();
    }, 3500);
};

TarotApp.prototype.revealCelticCross = function() {
    const cardBacks = document.querySelectorAll('.card-back.celtic-card');
    
    // カードフリップ音
    audioManager.playCardFlip();
    
    // カードを順番にリビール
    cardBacks.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = card.classList.contains('horizontal') ? 
                'rotateY(180deg) rotate(90deg)' : 'rotateY(180deg)';
            card.style.opacity = '0';
        }, index * 300);
    });
    
    setTimeout(() => {
        this.displayCelticCrossResult();
        this.showCelticCrossResultArea();
        this.updateGuideAfterReading();
        // 成功音
        audioManager.playSuccess();
    }, 3500);
};

TarotApp.prototype.displayCelticCrossResult = function() {
    const positions = ['present', 'challenge', 'past', 'future', 'crown', 'foundation', 'yourself', 'environment', 'hopes', 'outcome'];
    
    positions.forEach((position, index) => {
        const card = this.currentCards[index];
        
        document.getElementById(`celtic-${position}-image`).src = card.image;
        document.getElementById(`celtic-${position}-image`).alt = `${card.name} (${card.position})`;
        document.getElementById(`celtic-${position}-name`).textContent = `${card.name} (${card.position})`;
        
        // 主要ポジションには詳細な解釈を追加
        if (position === 'present' || position === 'challenge') {
            const keywordsText = card.currentKeywords.join('、');
            const interpretation = `【キーワード】${keywordsText}\n\n${card.currentMeaning}`;
            document.getElementById(`celtic-${position}-meaning`).textContent = interpretation;
        }
    });
    
    // 総合的なメッセージを生成
    this.generateCelticCrossMessage();
};

TarotApp.prototype.generateCelticCrossMessage = function() {
    const presentCard = this.currentCards[0];
    const challengeCard = this.currentCards[1];
    const outcomeCard = this.currentCards[9];
    
    let message = `ケルト十字が示すあなたの状況：\n\n`;
    
    message += `現在のあなたは「${presentCard.name}」のエネルギーに包まれており、`;
    if (presentCard.isReversed) {
        message += `内面的な調整や見直しが必要な時期にあります。`;
    } else {
        message += `${presentCard.currentKeywords[0]}の状態にあります。`;
    }
    
    message += `\n\n乗り越えるべき課題は「${challengeCard.name}」が表すもので、`;
    if (challengeCard.isReversed) {
        message += `この困難は内なる成長につながるでしょう。`;
    } else {
        message += `${challengeCard.currentKeywords[0]}に関連しています。`;
    }
    
    message += `\n\n最終的な展望として「${outcomeCard.name}」が示されており、`;
    if (outcomeCard.isReversed) {
        message += `予想とは異なる形で結果が現れるかもしれませんが、それも意味のある学びとなるでしょう。`;
    } else {
        message += `${outcomeCard.currentKeywords[0]}という素晴らしい結果が待っています。`;
    }
    
    message += `\n\nケルト十字は、あなたの人生の複雑さと豊かさを教えてくれます。全体的な流れを信じて、一歩ずつ前進していきましょう。`;
    
    document.getElementById('celtic-overall-message').textContent = message;
};

TarotApp.prototype.showCelticCrossResultArea = function() {
    const resultArea = document.getElementById('celtic-cross-result');
    resultArea.style.display = 'block';
    
    // アニメーション効果
    setTimeout(() => {
        resultArea.classList.add('show');
    }, 100);
};

TarotApp.prototype.resetReading = function() {
    this.isReading = false;
    this.currentCard = null;
    this.currentCards = [];
    
    if (this.currentSpread === 'one-card') {
        this.resetOneCardReading();
    } else if (this.currentSpread === 'three-card') {
        this.resetThreeCardReading();
    } else if (this.currentSpread === 'celtic-cross') {
        this.resetCelticCrossReading();
    }
    
    // 質問フィールドをクリア
    const questionInput = document.getElementById('user-question');
    questionInput.value = '';
    
    // ガイドメッセージをリセット
    this.currentGuideIndex = 4;
    this.updateGuideMessage(this.guideMessages[this.currentSpread][4]);
    
    // 少し待ってから最初のメッセージに戻す
    setTimeout(() => {
        this.currentGuideIndex = 0;
        this.updateGuideMessage(this.guideMessages[this.currentSpread][0]);
    }, 3000);
};

TarotApp.prototype.resetCelticCrossReading = function() {
    // UI要素をリセット
    const drawButton = document.getElementById('draw-celtic-cross-btn');
    const cardBacks = document.querySelectorAll('.card-back.celtic-card');
    const resultArea = document.getElementById('celtic-cross-result');
    
    // ボタンをリセット
    drawButton.disabled = false;
    drawButton.textContent = '✨ ケルト十字の10枚を引く ✨';
    
    // カードをリセット
    cardBacks.forEach(card => {
        if (card.classList.contains('horizontal')) {
            card.style.transform = 'rotate(90deg)';
        } else {
            card.style.transform = 'translateY(0) rotateY(0) scale(1)';
        }
        card.style.opacity = '1';
    });
    
    // 結果エリアを非表示
    resultArea.classList.remove('show');
    setTimeout(() => {
        resultArea.style.display = 'none';
    }, 500);
};

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new TarotApp();
    // HistoryManagerはhistory.jsで自動的に初期化されます
});

// 星空アニメーション用のユーティリティ関数
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #f0c419;
        border-radius: 50%;
        box-shadow: 0 0 6px #f0c419;
        top: ${Math.random() * 50}%;
        left: -10px;
        opacity: 0;
        animation: shootingStarAnimation 3s linear;
    `;
    
    document.querySelector('.starry-background').appendChild(shootingStar);
    
    setTimeout(() => {
        shootingStar.remove();
    }, 3000);
}

// CSS アニメーションを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes shootingStarAnimation {
        0% {
            opacity: 0;
            transform: translateX(0) translateY(0);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(300px) translateY(150px);
        }
    }
    
    .guide-message p {
        transition: opacity 0.3s ease;
    }
    
    .card-back {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 流れ星を定期的に作成
setInterval(() => {
    if (Math.random() < 0.3) { // 30%の確率で流れ星
        createShootingStar();
    }
}, 5000);