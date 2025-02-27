// chatbot.js

document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById('chatbot');
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    let isChatbotVisible = false; // 챗봇 보임 여부 상태
    let isExpanded = false; // 크기 상태 변수

    // 챗봇 토글 버튼 클릭 이벤트
    chatbotToggle.addEventListener('click', () => {
        isChatbotVisible = true;
        chatbot.style.display = 'flex';
        chatbot.style.height = '300px'; // 기본 높이 설정
        chatbotToggle.style.display = 'none'; // 토글 버튼 숨김
        isExpanded = false; // 기본 크기로 설정
    });

    // 닫기 버튼 클릭 이벤트
    chatbotClose.addEventListener('click', () => {
        isChatbotVisible = false;
        chatbot.style.display = 'none';
        chatbotToggle.style.display = 'block'; // 토글 버튼 다시 표시
    });

    // 챗봇 크기 조절 클릭 이벤트
    chatbotHeader.addEventListener('click', () => {
        if (isExpanded) {
            chatbot.style.height = '300px'; // 최소 높이
            isExpanded = false;
        } else {
            chatbot.style.height = '600px'; // 최대 높이
            isExpanded = true;
        }
    });
});
