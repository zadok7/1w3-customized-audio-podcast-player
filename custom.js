<script>
document.addEventListener('DOMContentLoaded', function() {
    // Hide empty div elements at the top
    document.querySelectorAll('.col-12.my-2 .card').forEach(function (div) {
        if (!div.hasChildNodes()) {
            div.style.display = 'none';
        }
    });

    var slideshowContainer = document.createElement('div');
    slideshowContainer.id = 'slideshow-container';

    var pairs = [];
    var pair;
    var images = document.querySelectorAll('.col-12.my-2 img.img-fluid.rounded');
    var players = document.querySelectorAll('.col-12.my-2 audio');
    var paragraphs = document.querySelectorAll('.col-12.my-2 .card-body');

    if (images.length === players.length && images.length === paragraphs.length) {
        players.forEach(function (player, index) {
            pair = document.createElement('div');
            pair.classList.add('pair');
            pair.style.display = index === 0 ? 'block' : 'none';

            // Create and append the title as a <span>
            var title = document.createElement('span');
            title.innerText = player.getAttribute('title'); // Using audio title
            title.style.color = 'white';
            title.style.fontWeight = 'bold';

            // Append elements to the pair
            pair.appendChild(images[index].parentElement);
            pair.appendChild(player.parentElement);
            pair.appendChild(title); // Title below audio player, above paragraph
            pair.appendChild(paragraphs[index]);

            pairs.push(pair);
            slideshowContainer.appendChild(pair);
        });
    }

    var nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.innerHTML = 'Next';
    nextButton.onclick = function() { navigateSlide(1); };

    var prevButton = document.createElement('button');
    prevButton.id = 'prev-button';
    prevButton.innerHTML = 'Prev';
    prevButton.onclick = function() { navigateSlide(-1); };

    slideshowContainer.appendChild(prevButton);
    slideshowContainer.appendChild(nextButton);

    var downloadButton = document.createElement('button');
    downloadButton.id = 'download-button';
    var iconElem = document.createElement('i');
    iconElem.className = 'far fa-arrow-alt-circle-down';
    downloadButton.appendChild(iconElem);
    var textNode = document.createTextNode(' RSS');
    downloadButton.appendChild(textNode);
    downloadButton.className = 'rss-button';
    slideshowContainer.appendChild(downloadButton);

    document.getElementById('links').appendChild(slideshowContainer);

    downloadButton.onclick = generateRSS;

    function navigateSlide(direction) {
        var activeIndex = 0;
        pairs.forEach(function(pair, index) {
            if (pair.style.display === 'block') {
                activeIndex = index;
            }
        });
        var newIndex = (activeIndex + direction) % pairs.length;
        if (newIndex < 0) newIndex += pairs.length;

        pairs[activeIndex].style.display = 'none';
        pairs[newIndex].style.display = 'block';
    }

    function generateRSS(event) {
        event.preventDefault();

        const podcast = {
            title: "My Podcast Title",
            author: "Author Name",
            description: "Podcast Description",
        };

        let episodes = [];
        let imagesHref = [];
        let episodeDescriptions = [];
        let episodeTitles = [];

        for (let i = 0; i < players.length; i++) {
            const audioSrc = players[i].querySelector('source').src;
            const imageSrc = images[i].src;
            const episodeDescription = paragraphs[i].textContent.trim();
            const episodeTitle = players[i].getAttribute('title'); // Using audio title

            episodes.push(audioSrc);
            imagesHref.push(imageSrc);
            episodeDescriptions.push(episodeDescription);
            episodeTitles.push(episodeTitle);
        }

        const rssHeader = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel><title>${podcast.title}</title><link>${window.location.href}</link><language>en</language><itunes:author>${podcast.author}</itunes:author><description>${podcast.description}</description>`;
        let rssItems = '';

        for (let i = 0; i < episodes.length; i++) {
            const episodeTitle = episodeTitles[i];
            const episodeDescription = episodeDescriptions[i];
            const pubDate = new Date().toUTCString();

            rssItems += `<item><title>${episodeTitle}</title><description>${episodeDescription}</description><enclosure url="${episodes[i]}" length="0" type="audio/mpeg" /><itunes:image href="${imagesHref[i]}" /><pubDate>${pubDate}</pubDate></item>`;
        }

        const rssFooter = `</channel></rss>`;
        const rss = new Blob([rssHeader + rssItems + rssFooter], { type: 'application/rss+xml' });

        const url = URL.createObjectURL(rss);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = 'podcast.rss';
        a.click();
        window.URL.revokeObjectURL(url);
    }
});

</script>
