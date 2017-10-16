export const parseYoutubeUrls = (youtubeList) => {
    let regex = /https?:\/\/.+v=(.+)/g;
    let regexNow = /https?:\/\/.+\/(.+)\?t=(\d+)/g;
    let list = [];
    youtubeList.forEach(function(emt) {
        (function() {
            let result = null;
            result = regex.exec(emt); 
            let isUncorrect = regex.test(emt);
            if (result === null && !isUncorrect) {
                result = regexNow.exec(emt);
            }
            // console.log(result);
            let item  = (result === null) ? {id: '', time: ''} : { id: result[1], time: result[2] || null };   
            list.push(item);

        })();
    });

    return list;
}

export const notifiedSound  = () => {
    let audio = new Audio('http://www.soundjay.com/nature/sounds/water-droplet-2.mp3');
    audio.currentTime = 0;    
    audio.play();
}

export const PMnotifiedSound = () => {
    let audio = new Audio('http://newt.phys.unsw.edu.au/music/bellplates/sounds/bellplate-corner4.mp3');
    audio.currentTime = 0;
    audio.play();
}

export const randomImages = () => {
    let imgRandom = Math.floor(Math.random() * 10) + '.png';
    return `https://raw.githubusercontent.com/arcobalenoi27/node.js-chatroom/master/assets/images/${imgRandom}`;
}