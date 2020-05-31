const youtubeAdsDelete = () => {

    // skip click video ads
    const skipBtn = document.getElementsByClassName('ytp-ad-skip-button-text');

    if ( skipBtn.length > 0 ){

      for (let val of skipBtn)
          val.click();

    }

    // skip can't click video ads
    const adsParent = document.getElementsByClassName('ad-interrupting')[0];

    if ( adsParent ){

        const video = document.getElementsByTagName('video')[0];
        const duration = document.getElementsByClassName('ytp-time-duration')[0].textContent.split(':');
        const limit = (parseInt(duration[0]) * 60) + parseInt(duration[1]);

        video.currentTime = limit;

    }

    // delete right column ads
    const rightAds = document.getElementById('player-ads');

    if ( rightAds )
        rightAds.parentNode.removeChild(rightAds);

    // video bottom ads
    const image = document.getElementsByClassName('video-ads');

    if ( image )
        for ( let val of image )
            val.parentNode.removeChild(val);

    // stop player for free user
    const ironOverlayBackDrop = document.getElementsByTagName('iron-overlay-backdrop')[0];
    if (ironOverlayBackDrop) {
      const btn = [...document.getElementsByTagName('yt-formatted-string')]
        .filter(v => v.textContent === 'はい' && v.classList.contains('style-scope'))[0];
      if (btn) {
        btn.click();
      }
    }

}

const amazonVideoAdsSkip = () => {

  const skipBtn = document.getElementsByClassName('adSkipButton')

  if (skipBtn.length > 0) {
    skipBtn[0].click()
  }

}

const pandoraAdsSkip = () => {
  const btn = document.getElementById('rPremiumClose_gJuo5');

  if (btn) {
    if (!(btn.style.display === 'none')) {
      btn.click();
    }
  }
}

if ( location.href.indexOf('youtube') > -1 ){

    let s = false;
    s = setInterval(() => {

        youtubeAdsDelete();

    }, 1000);

}

if ( location.href.indexOf('pandora') > -1 ){

    let s = false;
    s = setInterval(() => {
      pandoraAdsSkip();
    }, 1000);

}


if ( location.href.indexOf('amazon.co.jp') > -1 ) {

  if (location.href.indexOf('video') > -1 || location.href.indexOf('autoplay') > -1 ){

    let s = false
    s = setInterval(() => {
      amazonVideoAdsSkip()
    }, 1000)

  }

}

// Share Video Ads
window.ondblclick = () => {
  let iframes = [...document.getElementsByTagName('iframe')];
  iframes = iframes.filter(v => v.src.indexOf('embed.share-videos') > -1);
  if (iframes.length === 0) return;

  const e = document.createElement('meta');
  e.name = 'referrer';
  e.content = 'no-referrer';
  document.body.appendChild(e);

  for (const v of iframes) {
    const src = v.src;
    v.parentNode.removeChild(v);
    fetch(`https://destiny-foxglove.glitch.me/axios?url=${src}`)
      .then((r) => {
        r.text().then(res => {
          const movie = res.match(/random_file\.push\(.*\)?$/m);
          if (!movie) return;

          window.open(movie[0].slice(18, -3), '_blank');
        })
      })
      .catch((e) => alert(e))
  }
}

function removeAdultAds() {
  let ads = [...document.getElementsByClassName('dmm_ranking'),
    ...document.getElementsByClassName('Ad_system'),
    ...document.getElementsByClassName('ninja-recommend-block')];
  if (ads.length === 0) return;
  ads.forEach(v => v.style.display = 'none');
}

const n = setInterval(removeAdultAds, 100);
setTimeout(() => clearInterval(n), 5000);
