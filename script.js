document.addEventListener("DOMContentLoaded", function () {
    const experienceLink = document.getElementById("experienceLink");

    experienceLink.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 동작 방지
        window.location.href = "experience.html"; // experience.html로 이동
    });
});
