/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { Text } from "preact-i18n";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ShowGenreMapping, ShowTagMapping } from "../../ts/common/const";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import EpisodeCard from "../../components/episode-card";
import { getImageEndpoint } from "../../scripts/api/api";

const Show: FunctionalComponent<ShowConnectedProps> = (props: ShowConnectedProps) => {
    const show = props.shows.get(props.id);

    /* API calls */
    useEffect(() => {
        props.actions.fetchShow(props.id);
        props.actions.fetchShowEpisodes(props.id);
    }, [props.actions, props.id]);

    if (show === undefined) {
        return null;
    }
    const episodes = Array.from(props.episodes.values())
        .filter((e) => {
            return e.show === show.id;
        })
        .sort((b, a) => {
            return b.pos - a.pos;
        });
    const episodeElements = [];
    for (let i = 0; i < show.episodes; i++) {
        episodeElements.push(<EpisodeCard key={i} parent={show} item={episodes[i]} i={i} disabled={false} preferences={props.preferences} />);
    }

    const genres = Object.values(ShowGenreMapping)
        .filter(e => show.genres & e)
        .map((e, i) => {
            return (
                <div key={i} className={style["show-overview-data-field"]}>
                    <span className={style["show-overview-data-field-highlight"]}>
                        {i === 0 ? "" : ", "}
                        {<Text id={`enum.showGenre.${e}`} />}
                    </span>
                </div>
            );
        });
    const tags = Object.values(ShowTagMapping)
        .filter(e => show.tags & e)
        .map((e, i) => {
            return (
                <div key={i} className={style["show-overview-data-field"]}>
                    <span className={style["show-overview-data-field-highlight"]}>
                        {i === 0 ? "" : ", "}
                        {<Text id={`enum.showTag.${e}`} />}
                    </span>
                </div>
            );
        });
    const views = episodes.reduce((acc, curr) => {
        return acc + curr.views;
    }, 0);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style["show-overview"]}>
                <div className={style["show-overview-title-wrapper"]}>
                    <div className={style["show-overview-favourite"]} data={props.user === null ? "not-logged-in" : (props.user.favourites.includes(show.id) ? "true" : "false")} onClick={() => {
                        if(props.user === null) { return; }
                        props.actions.favourite(show.id);
                    }}>
                        <div className={style["show-overview-favourite-tooltip"]}>
                            <Text id={`show.favourite.tooltip.${props.user === null ? "notLoggedIn" : props.user.favourites.includes(show.id) ? "true" : "false"}`} />
                        </div>
                        <div className={style["icon-star"]} data={props.user === null || !props.user.favourites.includes(show.id) ? "false" : "true"} />
                    </div>
                    <div className={style["show-overview-title"]}>{show.title}</div>
                </div>
                <div className={style["show-overview-data-wrapper"]}>
                    <img alt="show-thumbnail" src={`${getImageEndpoint()}/${show.id}/poster.webp`} className={style["show-overview-thumbnail"]} />
                    <div className={style["show-overview-data"]}>
                        <div className={style["show-overview-synopsis"]}>
                            {show.synopsis === null ? <Text id="show.noSynopsis" /> : <ReactMarkdown rehypePlugins={[rehypeRaw]} children={show.synopsis} />}
                        </div>
                        <div className={style["show-overview-data-separator"]} />
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-type"]} />
                            <Text id="show.type" />
                            <span className={style["show-overview-data-field-highlight"]}>
                                <Text id={`enum.showType.${show.type}`} />
                            </span>
                        </div>
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-status"]} data={show.status.toString()} />
                            <Text id="show.status" />
                            <span className={style["show-overview-data-field-highlight"]}>
                                <Text id={`enum.showStatus.${show.status}`} />
                            </span>
                        </div>
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-genres"]} />
                            <Text id="show.genres" />
                            {genres.length === 0 ? <Text id="show.noGenres" /> : genres}
                        </div>
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-episodes"]} />
                            <Text id="show.episodes" />
                            <span className={style["show-overview-data-field-highlight"]}>{show.episodes}</span>
                        </div>
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-rating"]} />
                            <Text id="show.rating" />
                            <span className={style["show-overview-data-field-highlight"]}>
                                <Text id={`enum.showRating.${show.rating}`} />
                            </span>
                        </div>
                        <div className={style["show-overview-data-separator"]} />
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-star"]} />
                            <Text id="show.favourites" />
                            <span className={style["show-overview-data-field-highlight"]}>{show.favourites}</span>
                        </div>
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-eye"]} />
                            <Text id="show.views" />
                            <span className={style["show-overview-data-field-highlight"]}>{views}</span>
                        </div>
                        <div className={style["show-overview-data-separator"]} />
                        <div className={style["show-overview-data-field"]}>
                            <div className={style["icon-tag"]} />
                            <Text id="show.tags" />
                            <span className={style["show-overview-data-field-highlight"]}>{tags.length === 0 ? <Text id="show.noTags" /> : tags}</span>
                        </div>
                    </div>
                </div>
                <div className={style["show-overview-episodes"]}>{episodeElements}</div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Show);
