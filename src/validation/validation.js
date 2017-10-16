export default {
    checkEmptyString (s) {
        return s.length === 0;
    },
    checkImgUrl (s) {
        let regex = new RegExp('https?:\/\/.+(\.(jpg|png))?', 'g');
        return regex.test(s);
    },
    detectImgUrl (s) {
        return s.replace(/(https?:\/\/.+(\.(jpg|png|jpeg|gif)))/g, '<div><a href="$1" target="_blank">$1<\/a><\/div>');
    },
    checkUrlLink (s) {
        return s.replace(/(https?:\/\/.+)/g, '<div><a href="$1" target="_blank">$1<\/a><\/div>')
    },
    grabImgUrlFromParagraph (s) {
        let regex = new RegExp('(https?:\/\/.+(\.(jpg|png|jpeg|gif)))', 'g');
        let match  = regex.exec(s);
        return match === null ? null : match[0];
    },
    grabYoutubeUrlFromParagraph (s) {
        // let regex = new RegExp('(https?:\/\/(.+)?youtu.+(v=(\w+))?(t=\d+)?)', 'g');
        let regex = /(https?:\/\/(.+)?youtu.+\/(.+)?(v=(\w+))?(t=\d+)?)/g;
        let match = regex.exec(s);
        return match === null ? null : match[0];
    }

}