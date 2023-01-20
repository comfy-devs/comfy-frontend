/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { Text } from "preact-i18n";
/* Redux */
import { connect } from "react-redux";
import { Link } from "preact-router/match";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import VideoPlayer from "../../components/video-player";
import { EncodePresetMapping } from "../../ts/common/const";

const Episode: FunctionalComponent<EpisodeConnectedProps> = (props: EpisodeConnectedProps) => {
    const episode = props.episodes.get(props.id);
    const show = episode ? props.shows.get(episode.show) : undefined;
    const segments = Array.from(props.segments.values())
        .filter((e) => {
            return e.episode === episode?.id;
        })
        .sort((b, a) => {
            return b.pos - a.pos;
        });
    const encodes = Array.from(props.encodes.values()).filter((e) => {
        return e.episode === episode?.id;
    });
    const encode = encodes.find((e) => e.preset === EncodePresetMapping[props.playerData.preset]);
    const hasVP9 = encodes.some((e) => e.preset === EncodePresetMapping.VP9);

    /* API calls */
    useEffect(() => {
        props.actions.fetchEpisode(props.id);
        props.actions.fetchEpisodeSegments(props.id);
        props.actions.fetchEpisodeEncodes(props.id);
    }, [props.actions, props.id]);
    useEffect(() => {
        if (episode !== undefined && show === undefined) {
            props.actions.fetchShow(episode.show);
        }
    }, [episode, show, props.actions]);
    useEffect(() => {
        if (episode !== undefined) {
            props.actions.setPlayerAudio({ lang: episode.audio[0] });
        }
    }, [props.id, episode, props.actions]);
    useEffect(() => {
        if (episode === undefined) {
            return;
        }
        if (hasVP9) {
            props.actions.setPlayerPreset("VP9");
        } else {
            props.actions.setPlayerPreset("X264");
        }
    }, [props.id, episode, props.actions, hasVP9]);
    if (episode === undefined || show === undefined) {
        return null;
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style["episode-overview"]}>
                <div className={style["episode-overview-title"]}>
                    <Text id="episode.number" fields={{ num: episode.pos + 1 }} />
                    <span className={style["episode-overview-title-highlight"]}>{episode.title}</span>
                </div>
                <VideoPlayer dimensions={props.dimensions} playerData={props.playerData} item={episode} encode={encode ?? null} parent={show} segments={segments} preferences={props.preferences} actions={props.actions} />
                <div className={style["episode-overview-data"]}>
                    <div className={style["episode-overview-subtitle"]}>
                        <Text id="episode.show" />
                        <a href={`/shows/${show.id}`} className={style["episode-overview-subtitle-highlight"]}>
                            {show.title}
                        </a>
                    </div>
                    <div className={style["episode-overview-separator"]} />
                    <div className={style["episode-overview-episodes"]}>
                        {new Array(show.episodes).fill(null).map((e, i) => {
                            return (
                                <Link key={i} href={`/episodes/${show.id}-${i}`} className={style["episode-overview-episodes-item"]} activeClassName={style["episode-overview-episodes-item-active"]}>
                                    {i + 1}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Episode);
