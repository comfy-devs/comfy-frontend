/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { Text } from "preact-i18n";
import { AnimeGenreMapping, AnimeTagMapping } from "../../ts/common/const";
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

const Anime: FunctionalComponent<AnimeConnectedProps> = (props: AnimeConnectedProps) => {
    const anime = props.animes.get(props.id);

    /* API calls */
    useEffect(() => {
        props.actions.fetchAnime(props.id);
        props.actions.fetchAnimeEpisodes(props.id);
    }, [props.actions, props.id]);

    if (anime === undefined) {
        return null;
    }
    const episodes = Array.from(props.episodes.values())
        .filter((e) => {
            return e.anime === anime.id;
        })
        .sort((b, a) => {
            return b.pos - a.pos;
        });
    const episodeElements = [];
    for (let i = 0; i < anime.episodes; i++) {
        episodeElements.push(<EpisodeCard key={i} parent={anime} item={episodes[i]} i={i} disabled={false} preferences={props.preferences} />);
    }

    const synopsis =
        anime.synopsis === null
            ? null
            : anime.synopsis.split("\n").map((e, i) => {
                  return (
                      <div key={i}>
                          {e}
                          <br />
                      </div>
                  );
              });
    const genres = Object.values(AnimeGenreMapping)
        .filter(e => anime.genres & e)
        .map((e, i) => {
            return (
                <div key={i} className={style["anime-overview-data-field"]}>
                    <span className={style["anime-overview-data-field-highlight"]}>
                        {i === 0 ? "" : ", "}
                        {<Text id={`enum.animeGenre.${e}`} />}
                    </span>
                </div>
            );
        });
    const tags = Object.values(AnimeTagMapping)
        .filter(e => anime.tags & e)
        .map((e, i) => {
            return (
                <div key={i} className={style["anime-overview-data-field"]}>
                    <span className={style["anime-overview-data-field-highlight"]}>
                        {i === 0 ? "" : ", "}
                        {<Text id={`enum.animeTag.${e}`} />}
                    </span>
                </div>
            );
        });
    const views = episodes.reduce((acc, curr) => {
        return acc + curr.views;
    }, 0);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style["anime-overview"]}>
                <div className={style["anime-overview-title-wrapper"]}>
                    <div className={style["anime-overview-favourite"]} data={props.user === null ? "not-logged-in" : (props.user.favourites.includes(anime.id) ? "true" : "false")} onClick={() => {
                        if(props.user === null) { return; }
                        if(props.user.favourites.includes(anime.id)) {
                            props.actions.unfavourite(anime.id);
                        } else {
                            props.actions.favourite(anime.id);
                        }
                    }}>
                        <div className={style["anime-overview-favourite-tooltip"]}>
                            <Text id={`anime.favourite.tooltip.${props.user === null ? "notLoggedIn" : props.user.favourites.includes(anime.id) ? "true" : "false"}`} />
                        </div>
                        <div className={style["icon-star"]} data={props.user === null || !props.user.favourites.includes(anime.id) ? "gray" : "red"} />
                    </div>
                    <div className={style["anime-overview-title"]}>{anime.title}</div>
                </div>
                <div className={style["anime-overview-data-wrapper"]}>
                    <img alt="anime-thumbnail" src={`${getImageEndpoint()}/${anime.id}/poster.webp`} className={style["anime-overview-thumbnail"]} />
                    <div className={style["anime-overview-data"]}>
                        <div className={style["anime-overview-synopsis"]}>{synopsis === null ? <Text id="anime.noSynopsis" /> : synopsis}</div>
                        <div className={style["anime-overview-data-separator"]} />
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.type" />
                            <span className={style["anime-overview-data-field-highlight"]}>
                                <Text id={`enum.animeType.${anime.type}`} />
                            </span>
                        </div>
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.status" />
                            <span className={style["anime-overview-data-field-highlight"]}>
                                <Text id={`enum.animeType.${anime.type}`} />
                            </span>
                        </div>
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.genres" />
                            {genres.length === 0 ? <Text id="anime.noGenres" /> : genres}
                        </div>
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.episodes" />
                            <span className={style["anime-overview-data-field-highlight"]}>{anime.episodes}</span>
                        </div>
                        <div className={style["anime-overview-data-separator"]} />
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.favourites" />
                            <span className={style["anime-overview-data-field-highlight"]}>{anime.favourites}</span>
                        </div>
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.views" />
                            <span className={style["anime-overview-data-field-highlight"]}>{views}</span>
                        </div>
                        <div className={style["anime-overview-data-separator"]} />
                        <div className={style["anime-overview-data-field"]}>
                            <Text id="anime.tags" />
                            <span className={style["anime-overview-data-field-highlight"]}>{tags.length === 0 ? <Text id="anime.noTags" /> : tags}</span>
                        </div>
                    </div>
                </div>
                <div className={style["anime-overview-episodes"]}>{episodeElements}</div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Anime);
