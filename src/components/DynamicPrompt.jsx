import { useState, useEffect, useRef } from "react"

export default function DynamicPrompt() {
    const searchPrompts = [
        "Search by medication name...", 
        "Try searching 'Metformin'...", 
        "What is 'Atorvastatin' used for?"
    ]

    const [promptIndex, setPromptIndex] = useState(0)
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = searchPrompts[promptIndex];
        
        // 設定不同狀態下的打字速度
        let speed = isDeleting ? 40 : 100; // 刪除時快一點(40ms)，打字時慢一點(100ms)

        // 處理打字與刪除的核心邏輯
        const handleType = () => {
        if (!isDeleting) {
            // 【狀態 1：打字中】
            // 每次抓取原始句子，多切出一個字給 currentText
            setCurrentText(fullText.substring(0, currentText.length + 1));

            // 如果字數已經等於完整句子的長度，代表打完了
            if (currentText === fullText) {
            setIsDeleting(false); // 保持非刪除狀態
            // 觸發【狀態 2：靜止期】➡️ 停在畫面上 2 秒，2 秒後開啟「刪除模式」
            clearInterval(timer);
            setTimeout(() => setIsDeleting(true), 2000);
            return;
            }
        } else {
            // 【狀態 3：刪除中】
            // 每次少切一個字，讓字往回縮
            setCurrentText(fullText.substring(0, currentText.length - 1));

            // 如果字數扣到變成空字串，代表刪光了
            if (currentText === "") {
            setIsDeleting(false); // 關閉刪除模式（準備重新打字）
            // 觸發【狀態 4：換句期】➡️ 換下一句，如果到底了就回第一句
            setPromptIndex((prevIndex) => (prevIndex + 1) % searchPrompts.length);
            return;
            }
        }
        };

        // 利用 setTimeout 模擬連續動作，每次字數改變就會觸發 useEffect 重新計算速度
        const timer = setTimeout(handleType, speed);

        // 🔒 靈魂關鍵：組件消失或更新前，一定要清除計時器，避免記憶體洩漏
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, promptIndex]); // 只要這三個狀態改變，就重新跑一次計時


    return (
        <p className="min-h-[1.5rem] select-none text-sm font-medium text-gray-400">
            {currentText}
            {/* 💡 加上一個會閃爍的打字機光標，看起來更逼真！ */}
            <span className="ml-0.5 animate-pulse font-normal">|</span>
        </p>
    )
}