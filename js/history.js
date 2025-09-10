// 占い履歴管理システム

class HistoryManager {
    constructor() {
        this.currentFilter = 'all';
        this.bindEvents();
    }

    bindEvents() {
        // 履歴ボタン
        const historyBtn = document.getElementById('history-btn');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => this.showHistoryScreen());
        }

        // 戻るボタン
        const backBtn = document.getElementById('back-to-main-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showMainScreen());
        }

        // エクスポートボタン
        const exportBtn = document.getElementById('export-history-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportHistory());
        }

        // クリアボタン
        const clearBtn = document.getElementById('clear-history-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearHistory());
        }

        // 全削除ボタン
        const clearAllBtn = document.getElementById('clear-all-history-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearHistory());
        }

        // フィルター
        const filterSelect = document.getElementById('history-filter-select');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.updateHistoryDisplay();
            });
        }
    }

    showHistoryScreen() {
        // 画面切り替え
        const mainScreen = document.querySelector('.tarot-area').parentElement;
        const historyScreen = document.getElementById('history-screen');
        
        mainScreen.style.display = 'none';
        historyScreen.style.display = 'block';
        
        setTimeout(() => {
            historyScreen.classList.add('active');
        }, 50);

        // 履歴データを更新
        this.updateHistoryDisplay();
        this.updateStats();

        // シーズーの表情を変更
        if (typeof updateShihTzuExpression === 'function') {
            updateShihTzuExpression('wise');
        }
    }

    showMainScreen() {
        const mainScreen = document.querySelector('.tarot-area').parentElement;
        const historyScreen = document.getElementById('history-screen');
        
        historyScreen.classList.remove('active');
        
        setTimeout(() => {
            historyScreen.style.display = 'none';
            mainScreen.style.display = 'block';
        }, 300);

        // シーズーの表情をリセット
        if (typeof updateShihTzuExpression === 'function') {
            updateShihTzuExpression('happy');
        }
    }

    updateStats() {
        const stats = tarotStorage.getStatistics();
        
        document.getElementById('total-readings').textContent = stats.totalReadings;
        document.getElementById('one-card-readings').textContent = stats.oneCardReadings;
        document.getElementById('three-card-readings').textContent = stats.threeCardReadings;
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        const readings = tarotStorage.getAllReadings();
        
        // フィルター適用
        let filteredReadings = readings;
        if (this.currentFilter !== 'all') {
            filteredReadings = readings.filter(reading => reading.spreadType === this.currentFilter);
        }

        if (filteredReadings.length === 0) {
            historyList.innerHTML = `
                <div class="no-history">
                    <p>該当する占い履歴がありません</p>
                    <p>${this.currentFilter === 'all' ? '占いを行うと、ここに履歴が表示されます' : 'フィルターを変更してください'}</p>
                </div>
            `;
            return;
        }

        const historyHTML = filteredReadings.map(reading => this.createHistoryItemHTML(reading)).join('');
        historyList.innerHTML = historyHTML;

        // 削除ボタンにイベントリスナーを追加
        historyList.querySelectorAll('.delete-reading').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const readingId = btn.dataset.readingId;
                this.deleteReading(readingId);
            });
        });
    }

    createHistoryItemHTML(reading) {
        const isOneCard = reading.spreadType === 'one-card';
        const isThreeCard = reading.spreadType === 'three-card';
        const isCelticCross = reading.spreadType === 'celtic-cross';
        
        let typeLabel = 'ワンカード';
        if (isThreeCard) typeLabel = 'スリーカード';
        if (isCelticCross) typeLabel = 'ケルト十字';
        
        let cardsHTML = '';
        if (isOneCard) {
            cardsHTML = `
                <div class="history-card">
                    <div class="history-card-name">${reading.card.name}</div>
                    <div class="history-card-position">${reading.card.position}</div>
                </div>
            `;
        } else if (isCelticCross) {
            // ケルト十字は重要なカードのみ表示
            const importantCards = reading.cards.slice(0, 4); // 現在、課題、過去、未来
            cardsHTML = importantCards.map(card => `
                <div class="history-card">
                    <div class="history-card-name">${card.name}</div>
                    <div class="history-card-position">${card.positionName} (${card.cardPosition})</div>
                </div>
            `).join('');
            if (reading.cards.length > 4) {
                cardsHTML += `<div class="history-card more-cards">他${reading.cards.length - 4}枚...</div>`;
            }
        } else {
            cardsHTML = reading.cards.map(card => `
                <div class="history-card">
                    <div class="history-card-name">${card.name}</div>
                    <div class="history-card-position">${card.positionName} (${card.cardPosition})</div>
                </div>
            `).join('');
        }

        return `
            <div class="history-item">
                <div class="history-item-header">
                    <span class="history-date">${reading.date} ${reading.time}</span>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <span class="history-type">${typeLabel}</span>
                        <button class="delete-reading" data-reading-id="${reading.id}" title="この履歴を削除">🗑️</button>
                    </div>
                </div>
                <div class="history-question">"${reading.question}"</div>
                <div class="history-cards">
                    ${cardsHTML}
                </div>
            </div>
        `;
    }

    deleteReading(readingId) {
        if (confirm('この占い履歴を削除しますか？')) {
            if (tarotStorage.deleteReading(readingId)) {
                this.updateHistoryDisplay();
                this.updateStats();
                this.showNotification('履歴を削除しました', 'success');
            } else {
                this.showNotification('削除に失敗しました', 'error');
            }
        }
    }

    exportHistory() {
        try {
            tarotStorage.exportReadings();
            this.showNotification('履歴をダウンロードしました', 'success');
        } catch (error) {
            this.showNotification('エクスポートに失敗しました', 'error');
        }
    }

    clearHistory() {
        const readings = tarotStorage.getAllReadings();
        if (readings.length === 0) {
            this.showNotification('削除する履歴がありません', 'info');
            return;
        }

        const confirmText = `全ての占い履歴（${readings.length}件）を削除しますか？この操作は取り消せません。`;
        if (confirm(confirmText)) {
            try {
                localStorage.removeItem('kokochapi-tarot-readings');
                this.updateHistoryDisplay();
                this.updateStats();
                this.showNotification('全ての履歴を削除しました', 'success');
            } catch (error) {
                this.showNotification('削除に失敗しました', 'error');
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: { bg: '#4caf50', text: '#ffffff' },
            error: { bg: '#f44336', text: '#ffffff' },
            info: { bg: '#f0c419', text: '#2c2a4a' }
        };
        
        const color = colors[type] || colors.info;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${color.bg};
            color: ${color.text};
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// グローバルインスタンス
const historyManager = new HistoryManager();