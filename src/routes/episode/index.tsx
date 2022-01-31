/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text } from "preact-i18n";
import { EpisodeConnectedProps } from "../../ts/routes";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
/* Components */
import VideoPlayer from "../../components/video-player";

const Episode: FunctionalComponent<EpisodeConnectedProps> = (props: EpisodeConnectedProps) => {
    const { id } = useParams();
    const episode = id === undefined ? undefined : props.episodes.get(id);
    
    /* API calls */
    useEffect(() => {
        if (id === undefined) { return; }
        if (episode === undefined) {
            props.actions.fetchEpisode(id);
            props.actions.fetchEpisodeSegments(id);
        } else {
            props.actions.fetchAnimeEpisodes(episode.anime);
        }
    }, [episode === undefined]);
    
    if (episode === undefined) {
        return null;
    }
    const anime = props.animes.get(episode.anime);
    if (anime === undefined) {
        return null;
    }
    const episodes = Array.from(props.episodes.values()).filter((e) => {
        return e.anime === anime.id;
    }).sort((b, a) => { return b.pos - a.pos; });
    const segments = Array.from(props.segments.values()).filter((e) => {
        return e.episode === episode.id;
    }).sort((b, a) => { return b.pos - a.pos; });

    return (
        <div className={"route"}>
            <div className={style["episode-overview"]}>
                <div className={style["episode-overview-title"]}>
                    <Text id="episode.number" fields={{ num: episode.pos + 1 }} />
                    <span className={style["episode-overview-title-highlight"]}>{episode.title}</span>
                </div>
                <VideoPlayer dimensions={props.dimensions} playerData={props.playerData} item={episode} parent={anime} segments={segments} preferences={props.preferences} actions={props.actions} />
                <div className={style["episode-overview-extra"]}>
                    <div className={style["episode-overview-subtitle"]}>
                        <Text id="episode.anime" /><a href={`/animes/${anime.id}`} className={style["episode-overview-subtitle-highlight"]}>{anime.title}</a>
                    </div>
                    <div className={style["episode-overview-separator"]} />
                    <div className={style["episode-overview-episodes"]}>
                        {episodes.map((e, i) => {
                            return <a key={i} href={`/episodes/${e.id}`} className={style["episode-overview-episodes-item"]} data={e.id === id ? "true" : "false"}>
                                {(i + 1)}
                            </a>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Episode);
