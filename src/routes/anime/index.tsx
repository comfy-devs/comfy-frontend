/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Text } from "preact-i18n";
import { AnimeConnectedProps } from "../../ts/routes";
import { AnimeGenre, AnimeTag } from "../../ts/base";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
/* Components */
import EpisodeCard from "../../components/episode-card";

const Anime: FunctionalComponent<AnimeConnectedProps> = (props: AnimeConnectedProps) => {
    const { id } = useParams();
    const anime = id === undefined ? undefined : props.animes.get(id);

    /* API calls */
    useEffect(() => {
        if (id === undefined) {
            return;
        }
        props.actions.fetchAnime(id);
        props.actions.fetchAnimeEpisodes(id);
    }, [true]);

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
        if (episodes[i] !== undefined) {
            episodeElements.push(<EpisodeCard key={i} parent={anime} item={episodes[i]} i={i} disabled={false} />);
        } else {
            episodeElements.push(<EpisodeCard key={i} parent={anime} item={episodes[i]} i={i} disabled={false} />);
        }
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
    const genres = Object.keys(AnimeGenre)
        .filter((e) => {
            return parseInt(e, 10) !== 0 && (anime.genres & parseInt(e, 10)) === parseInt(e, 10);
        })
        .map((e, i) => {
            return (
                <div key={i} className={style["anime-overview-field"]}>
                    <span className={style["anime-overview-data-field-highlight"]}>
                        {i === 0 ? "" : ", "}
                        {<Text id={`enum.animeGenre.${parseInt(e, 10)}`} />}
                    </span>
                </div>
            );
        });
    const tags = Object.keys(AnimeTag)
        .filter((e) => {
            return parseInt(e, 10) !== 0 && (anime.tags & parseInt(e, 10)) === parseInt(e, 10);
        })
        .map((e, i) => {
            return (
                <div key={i} className={style["anime-overview-field"]}>
                    <span className={style["anime-overview-data-field-highlight"]}>
                        {i === 0 ? "" : ", "}
                        {<Text id={`enum.animeTag.${parseInt(e, 10)}`} />}
                    </span>
                </div>
            );
        });
    const views = episodes.reduce((acc, curr) => {
        return acc + curr.views;
    }, 0);

    return (
        <div className="route">
            <div className={style["anime-overview"]}>
                <div className={style["anime-overview-title-wrapper"]}>
                    <div className={style["anime-overview-favourite"]}>
                        <div className={style["anime-overview-favourite-tooltip"]}>
                            <Text id="anime.favourite.tooltip" />
                        </div>
                        <div className={style["icon-star"]} />
                    </div>
                    <div className={style["anime-overview-title"]}>{anime.title}</div>
                </div>
                <div className={style["anime-overview-data-wrapper"]}>
                    <img alt="anime-thumbnail" src={`https://image.nyananime.xyz/${anime.id}/poster.webp`} className={style["anime-overview-thumbnail"]} />
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
