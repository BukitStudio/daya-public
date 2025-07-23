document.addEventListener("scroll", () => {
    const heroImage = document.querySelector(".hero-image");
    const logo = document.querySelector(".logo-daya");
    const maxBlur = 4; // Maximum blur intensity for logo
    const minBrightness = 0; // Do not go below this brightness
    const minOpacity = 0; // Minimum opacity for logo
    const scrollY = window.scrollY;

    // Calculate blur value for logo
    const blurValue = Math.min(scrollY / 50, maxBlur);

    // Calculate brightness value (starts at 1 and decreases to minBrightness)
    const brightnessValue = Math.max(1 - scrollY / 500, minBrightness);

    // Calculate opacity value for logo (starts at 1, decreases to minOpacity)
    const opacityValue = Math.max(1 - scrollY / 400, minOpacity);

    // Logo: blur + brightness + opacity
    if (logo) {
        logo.style.filter = `blur(${blurValue}px) brightness(${brightnessValue})`;
        logo.style.opacity = opacityValue;
    }

    // Hero image: only brightness
    if (heroImage) {
        heroImage.style.filter = `brightness(${brightnessValue})`;
    }
});