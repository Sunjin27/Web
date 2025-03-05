document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a[href='#contact']").forEach(link => {
        link.addEventListener("click", function (event) {
            if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
                event.preventDefault(); // 기본 이벤트 차단
                window.location.href = "index.html#contact"; // index.html의 contact 섹션으로 이동
            }
        });
    });
});
