document.addEventListener("DOMContentLoaded", function () {
    const headerTitle = document.querySelector(".animated-title");

    // 애니메이션이 한 번만 실행되고, 이후에도 유지되도록 설정
    headerTitle.style.opacity = "1";
    headerTitle.style.transform = "scale(1)";
});
