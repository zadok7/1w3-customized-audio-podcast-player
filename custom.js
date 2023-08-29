<script>
document.addEventListener('DOMContentLoaded', function() {
    // Wrap images and players into pairs
    var slideshowContainer = document.createElement('div');
    slideshowContainer.id = 'slideshow-container';

    var pairs = [];
    var pair;
    var images = document.querySelectorAll('.col-12.my-2 img.img-fluid.rounded');
    var players = document.querySelectorAll('.col-12.my-2 audio');

    if (images.length === players.length) {
        images.forEach(function(image, index) {
            pair = document.createElement('div');
            pair.classList.add('pair');
            pair.style.display = index === 0 ? 'block' : 'none'; // Only show the first pair initially
            pair.appendChild(image.parentElement);
            pair.appendChild(players[index].parentElement);
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

    // Download RSS button
    var downloadButton = document.createElement('button');
    downloadButton.id = 'download-button';

    // Create an icon element for the Font Awesome icon
    var iconElem = document.createElement('i');
    iconElem.className = 'far fa-arrow-alt-circle-down';
    downloadButton.appendChild(iconElem); // Add the icon to the button

    // Add a space and then the RSS text
    var textNode = document.createTextNode(' RSS');
    downloadButton.appendChild(textNode);

    downloadButton.className = 'rss-button'; // Use the new rss-button class
    slideshowContainer.appendChild(downloadButton);

    document.getElementById('links').appendChild(slideshowContainer);

    downloadButton.onclick = generateRSS;

    // Function to navigate slides
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

    // RSS feed generation
    function generateRSS(event) {
        event.preventDefault();

        // Assuming that the title, author, and description are constants (you can change them)
        const podcast = {
            title: "My Podcast Title",
            author: "Author Name",
            description: "Podcast Description",
        };

        let episodes = [];
        let imagesHref = [];

        for (let i = 0; i < players.length; i++) {
            const audioSrc = players[i].querySelector('source').src;
            const imageSrc = images[i].src;

            episodes.push(audioSrc);
            imagesHref.push(imageSrc);
        }

        // Generating RSS feed
        const rssHeader = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel><title>${podcast.title}</title><link>${window.location.href}</link><language>en</language><itunes:author>${podcast.author}</itunes:author><description>${podcast.description}</description>`;
        let rssItems = '';

        for (let i = 0; i < episodes.length; i++) {
            // Assuming static episode details (you can customize these as needed)
            const episodeTitle = `Episode ${i + 1}`;
            const episodeDescription = `Description for episode ${i + 1}`;
            const pubDate = new Date().toUTCString(); // Current date as an example

            rssItems += `<item><title>${episodeTitle}</title><description>${episodeDescription}</description><enclosure url="${episodes[i]}" length="0" type="audio/mpeg"/><itunes:image href="${imagesHref[i]}" /><pubDate>${pubDate}</pubDate></item>`;
        }

        const rssFooter = `</channel></rss>`;
        const rss = new Blob([rssHeader + rssItems + rssFooter], { type: 'application/rss+xml' });

        // Creating download link
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