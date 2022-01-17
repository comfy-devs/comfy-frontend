/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { AnimeConnectedProps } from "../../ts/routes";
import { AnimeGenre, AnimeTag } from "../../ts/base";
import { useParams } from "react-router";
import { animeGenreToDisplayName, animeStatusToDisplayName, animeTagToDisplayName, animeTypeToDisplayName } from "../../scripts/nyan/constants";
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
        if (id === undefined) { return; }
        if (anime !== undefined) {
            props.actions.fetchAnimeEpisodes(id);
        }
    }, [anime !== undefined]);

    if (anime === undefined) {
        return null;
    }
    const episodes = Array.from(props.episodes.values()).filter((e) => {
        return e.anime === anime.id;
    }).sort((b, a) => { return b.pos - a.pos; });
    const episodeElements = [];
    for(let i = 0; i < anime.episodes; i++) {
        if(episodes[i] !== undefined) {
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
    const genres = Object.keys(AnimeGenre).filter(e => { return parseInt(e, 10) !== 0 && (anime.genres & parseInt(e, 10)) === parseInt(e, 10) }).map((e, i) => {
        return (
            <div key={i} className={style["anime-overview-field"]}>
                <span className={style["anime-overview-data-field-highlight"]}>{i === 0 ? "" : ", "}{animeGenreToDisplayName(parseInt(e, 10))}</span>
            </div>
        );
    });
    const tags = Object.keys(AnimeTag).filter(e => { return parseInt(e, 10) !== 0 && (anime.tags & parseInt(e, 10)) === parseInt(e, 10) }).map((e, i) => {
        return (
            <div key={i} className={style["anime-overview-field"]}>
                <span className={style["anime-overview-data-field-highlight"]}>{i === 0 ? "" : ", "}{animeTagToDisplayName(parseInt(e, 10))}</span>
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
                        <div className={style["anime-overview-favourite-tooltip"]}>Favourite</div>
                        <div className={style["icon-star"]} />
                    </div>
                    <div className={style["anime-overview-title"]}>{anime.title}</div>
                </div>
                <div className={style["anime-overview-data-wrapper"]}>
                    <img alt="anime-thumbnail" src={`https://image.nyananime.xyz/${anime.id}/poster.webp`} className={style["anime-overview-thumbnail"]} />
                    <div className={style["anime-overview-data"]}>
                        <div className={style["anime-overview-synopsis"]}>{synopsis === null ? "No synopsis..." : synopsis}</div>
                        <div className={style["anime-overview-data-separator"]} />
                        <div className={style["anime-overview-data-field"]}>
                            Type: <span className={style["anime-overview-data-field-highlight"]}>{animeTypeToDisplayName(anime.type)}</span>
                        </div>
                        <div className={style["anime-overview-data-field"]}>
                            Status: <span className={style["anime-overview-data-field-highlight"]}>{animeStatusToDisplayName(anime.status)}</span>
                        </div>
                        <div className={style["anime-overview-data-field"]}>Genres: {genres.length === 0 ? "None" : genres}</div>
                        <div className={style["anime-overview-data-field"]}>
                            Episodes: <span className={style["anime-overview-data-field-highlight"]}>{anime.episodes}</span>
                        </div>
                        <div className={style["anime-overview-data-separator"]} />
                        <div className={style["anime-overview-data-field"]}>
                            Favourites: <span className={style["anime-overview-data-field-highlight"]}>{anime.favourites}</span>
                        </div>
                        <div className={style["anime-overview-data-field"]}>
                            Views: <span className={style["anime-overview-data-field-highlight"]}>{views}</span>
                        </div>
                        <div className={style["anime-overview-data-separator"]} />
                        <div className={style["anime-overview-data-field"]}>Tags: {tags.length === 0 ? "None" : tags}</div>
                    </div>
                </div>
                <div className={style["anime-overview-episodes"]}>
                    {episodeElements}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Anime);
