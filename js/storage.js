// ローカルストレージ管理システム

class TarotStorage {
    constructor() {
        this.storageKey = 'kokochapi-tarot-readings';
    }

    // 占い結果を保存
    saveReading(readingData) {
        try {
            const readings = this.getAllReadings();
            const newReading = {
                id: this.generateId(),
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleDateString('ja-JP'),
                time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
                ...readingData
            };
            
            readings.unshift(newReading); // 新しいものを先頭に
            
            // 最大50件まで保存
            if (readings.length > 50) {
                readings.splice(50);
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(readings));
            return newReading.id;
        } catch (error) {
            console.error('占い結果の保存に失敗しました:', error);
            return null;
        }
    }

    // 全ての占い結果を取得
    getAllReadings() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('占い結果の読み込みに失敗しました:', error);
            return [];
        }
    }

    // 特定の占い結果を取得
    getReading(id) {
        const readings = this.getAllReadings();
        return readings.find(reading => reading.id === id);
    }

    // 占い結果を削除
    deleteReading(id) {
        try {
            const readings = this.getAllReadings();
            const filteredReadings = readings.filter(reading => reading.id !== id);
            localStorage.setItem(this.storageKey, JSON.stringify(filteredReadings));
            return true;
        } catch (error) {
            console.error('占い結果の削除に失敗しました:', error);
            return false;
        }
    }

    // 占い結果の数を取得
    getReadingCount() {
        return this.getAllReadings().length;
    }

    // ユニークIDを生成
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 占い履歴をエクスポート（JSON形式）
    exportReadings() {
        const readings = this.getAllReadings();
        const dataStr = JSON.stringify(readings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `kokochapi-tarot-history-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // 統計情報を取得
    getStatistics() {
        const readings = this.getAllReadings();
        const stats = {
            totalReadings: readings.length,
            oneCardReadings: readings.filter(r => r.spreadType === 'one-card').length,
            threeCardReadings: readings.filter(r => r.spreadType === 'three-card').length,
            celticCrossReadings: readings.filter(r => r.spreadType === 'celtic-cross').length,
            mostDrawnCards: {},
            recentActivity: readings.slice(0, 5)
        };

        // カード出現回数をカウント
        readings.forEach(reading => {
            if (reading.spreadType === 'one-card' && reading.card) {
                const cardName = reading.card.name;
                stats.mostDrawnCards[cardName] = (stats.mostDrawnCards[cardName] || 0) + 1;
            } else if ((reading.spreadType === 'three-card' || reading.spreadType === 'celtic-cross') && reading.cards) {
                reading.cards.forEach(card => {
                    const cardName = card.name;
                    stats.mostDrawnCards[cardName] = (stats.mostDrawnCards[cardName] || 0) + 1;
                });
            }
        });

        return stats;
    }
}

// グローバルインスタンス
const tarotStorage = new TarotStorage();