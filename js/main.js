/**
 * R3DP Project Page - Main JavaScript
 */

// Copy BibTeX to clipboard
function copyBibtex() {
    const bibtexContent = document.getElementById('bibtex-content').innerText;
    const copyBtn = document.querySelector('.copy-btn');

    navigator.clipboard.writeText(bibtexContent).then(() => {
        // Visual feedback
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(bibtexContent);
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy load images (if needed in the future)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Video player enhancements (for when videos are added)
function initVideoPlayers() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Pause other videos when one starts playing
        video.addEventListener('play', function() {
            videos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });
}

// Initialize video players when DOM is ready
document.addEventListener('DOMContentLoaded', initVideoPlayers);
