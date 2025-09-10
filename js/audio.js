// 音響効果システム

class AudioManager {
    constructor() {
        this.isEnabled = true;
        this.bgmVolume = 0.3;
        this.sfxVolume = 0.5;
        this.currentBGM = null;
        this.audioContext = null;
        
        this.initializeAudio();
        this.bindEvents();
    }

    initializeAudio() {
        // Web Audio API初期化（ユーザー操作後に実行）
        this.initWebAudio = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        };
    }

    bindEvents() {
        document.addEventListener('click', this.initWebAudio, { once: true });
        document.addEventListener('touchstart', this.initWebAudio, { once: true });
    }

    // BGM再生
    playBGM() {
        if (!this.isEnabled) return;

        // シンプルなアンビエント音を生成
        this.generateAmbientSound();
    }

    // BGM停止
    stopBGM() {
        if (this.currentBGM) {
            this.currentBGM.disconnect();
            this.currentBGM = null;
        }
    }

    // カードシャッフル音
    playCardShuffle() {
        if (!this.isEnabled) return;
        this.generateCardShuffleSound();
    }

    // カードフリップ音
    playCardFlip() {
        if (!this.isEnabled) return;
        this.generateCardFlipSound();
    }

    // 成功音
    playSuccess() {
        if (!this.isEnabled) return;
        this.generateSuccessSound();
    }

    // ボタンクリック音
    playButtonClick() {
        if (!this.isEnabled) return;
        this.generateClickSound();
    }

    // 音響効果の有効/無効切り替え
    toggleAudio() {
        this.isEnabled = !this.isEnabled;
        if (!this.isEnabled) {
            this.stopBGM();
        }
        return this.isEnabled;
    }

    // アンビエント音生成
    generateAmbientSound() {
        if (!this.audioContext) return;

        // ローパスフィルターを使った風音のような効果
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();

        oscillator1.type = 'sawtooth';
        oscillator1.frequency.setValueAtTime(80, this.audioContext.currentTime);
        
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(120, this.audioContext.currentTime);

        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(200, this.audioContext.currentTime);
        filterNode.Q.setValueAtTime(1, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.bgmVolume * 0.1, this.audioContext.currentTime + 2);

        oscillator1.connect(filterNode);
        oscillator2.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator1.start();
        oscillator2.start();

        // 周波数を微妙に変化させる
        const modulateFrequency = () => {
            if (oscillator1.frequency) {
                oscillator1.frequency.setValueAtTime(
                    80 + Math.sin(Date.now() * 0.0001) * 10,
                    this.audioContext.currentTime
                );
            }
        };

        const modInterval = setInterval(modulateFrequency, 100);

        this.currentBGM = gainNode;

        // 5分後に自動停止
        setTimeout(() => {
            clearInterval(modInterval);
            this.stopBGM();
        }, 300000);
    }

    // カードシャッフル音生成
    generateCardShuffleSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const noiseBuffer = this.createNoiseBuffer();
        const noiseSource = this.audioContext.createBufferSource();

        noiseSource.buffer = noiseBuffer;
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);

        noiseSource.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        noiseSource.start();
        noiseSource.stop(this.audioContext.currentTime + 0.3);
    }

    // カードフリップ音生成
    generateCardFlipSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.2, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }

    // 成功音生成
    generateSuccessSound() {
        if (!this.audioContext) return;

        const frequencies = [523.25, 659.25, 783.99]; // C, E, G
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.5);
            }, index * 150);
        });
    }

    // クリック音生成
    generateClickSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.1, this.audioContext.currentTime + 0.001);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    // ノイズバッファ作成
    createNoiseBuffer() {
        const bufferSize = this.audioContext.sampleRate * 0.1;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }

    // 音量設定
    setBGMVolume(volume) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
    }

    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
}

// グローバルインスタンス
const audioManager = new AudioManager();