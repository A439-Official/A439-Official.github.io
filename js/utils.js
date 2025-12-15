function mod(a, b) {
    return ((a % b) + b) % b;
}

function randomBackground() {
    apis = [
        "https://t.alcy.cc/pc", // pc
        "https://t.alcy.cc/mp", // mobile
    ];
    document.addEventListener("DOMContentLoaded", function () {
        const bg = document.getElementsByTagName("body")[0];
        let isWide = window.innerWidth > window.innerHeight;
        const baseUrl = isWide ? apis[0] : apis[1];
        const img = new Image();
        img.src = baseUrl;
        img.onload = function () {
            bg.style.backgroundImage = `url(${baseUrl})`;
        };
        window.addEventListener("resize", () => {
            const newIsWide = window.innerWidth > window.innerHeight;
            if (newIsWide !== isWide) {
                isWide = newIsWide;
                const newUrl = isWide ? apis[0] : apis[1];
                bg.style.backgroundImage = `url(${newUrl})`;
            }
        });
    });
}
