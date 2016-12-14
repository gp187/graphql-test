const videoA = {
    id: 'a',
    title: 'A',
    duration: 180,
    watched: true
}
const videoB = {
    id: 'b',
    title: 'B',
    duration: 240,
    watched: false
}

const videos = [videoA, videoB];
const getVideoByID = (id) => new Promise((res) => {
    const [video] = videos.filter((video) => {
        return video.id === id;
    });

    res(video);
})
const createVideo = ({title, duration, released }) => {
    const video = {
        id: (new Buffer(title, 'utf8')).toString('base64'),
        title,
        duration,
        released
    }

    videos.push(video);

    return video;
}

const getVideos = () => new Promise((res) => res(videos))

exports.getVideoByID = getVideoByID;
exports.getVideos = getVideos;
exports.createVideo = createVideo;