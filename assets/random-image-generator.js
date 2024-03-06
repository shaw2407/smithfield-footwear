let pElement = document.querySelector('.image-with-text__media');
if (pElement) {
    let unsplashElement = document.querySelector('.unsplash');
    if (unsplashElement) {
        pElement.removeChild(unsplashElement);
    }
}
function getRandomImage() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.unsplash.com/photos/random', true);
    xhr.setRequestHeader('Authorization', 'Client-ID s5QvCBrEU3LtAmVJvJu_4avf8uBjWfycofutiDST4Cc');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);

                let newImageElement = Object.assign(document.createElement('img'), {className: 'unsplash'});
                pElement.appendChild(newImageElement);

                let cElement = document.querySelector('.unsplash');
                cElement.style.opacity = '0'
                cElement.src = data.urls.regular;

                newImageElement.setAttribute('srcset', data.urls.regular);
                fadeIn(cElement, 500);
            } else {
                console.error('Error fetching Unsplash image:', xhr.statusText);
            }
        }
    };
    xhr.send();
}

getRandomImage();

function fadeIn(element, duration) {
    let opacity = 0;
    let interval = 20;
    let delta = interval / duration;

    function increaseOpacity() {
        opacity += delta;
        element.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fadeInterval);
        }
    }

    var fadeInterval = setInterval(increaseOpacity, interval);
}
