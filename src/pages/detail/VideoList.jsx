import React, { useState, useEffect, useRef} from 'react';

import tmdbApi from '../../api/tmdbApi';
import { useParams } from 'react-router-dom';

const VideoList = props => {
    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const respond = await tmdbApi.getVideos(category, props.id);
            setVideos(respond.results.slice(0, 5));
        }
        getVideos();
    }, [category, props.id]);
    return (
        <>
            {
                videos.map((video, index) => (
                    <Video key={index} item={video}/>
                ))
            }
        </>
    )
}

const Video = props => {
    const item = props.item;
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                className="video__content"
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="Video"
            ></iframe>
        </div>
    )
}

export default VideoList
