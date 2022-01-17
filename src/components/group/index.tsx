/* Base */
import { h, FunctionalComponent } from "preact";
import { GroupConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const Group: FunctionalComponent<GroupConnectedProps> = (props: GroupConnectedProps) => {
    /*let animes = e.items.map((e) => {
        let anime = view.props.state.animes.get(e);
        return anime;
    });
    animes.sort((b, a) => {
        return b.data.aired_from - a.data.aired_from;
    });
    let parent = animes[0];
    if (parent === undefined) {
        return null;
    }

    let posterURL = view.props.state.serverData.animeEndpoint + "/poster?path=" + encodeURIComponent(parent.poster_min_path);
    if (view.state.loadedImages >= view.state.imagesToLoad) {
        posterURL = view.props.state.serverData.animeEndpoint + "/poster?path=" + encodeURIComponent(parent.poster_path);
    }

    return (
        <a
            key={i}
            href={"/groups/" + e.id}
            className={"anime-preview-wrapper group-wrapper" + (parent.data.rating === "R+ - Mild Nudity" ? " anime-preview-wrapper-lewd" : "")}
            onMouseEnter={() => {
                view.props.state.functions.hoverAnime(e.id);
            }}
            onMouseLeave={() => {
                view.props.state.functions.unhoverAnime();
            }}>
            <div className={style["anime-preview-0 group-0"]}>
                <img
                    alt="anime-thumbnail-small"
                    src={posterURL}
                    className={"anime-preview-image" + (parent.data.rating === "R+ - Mild Nudity" ? " anime-preview-image-lewd" : "")}
                    onError={(e) => {
                        e.target.src = "https://femboylamkas.please-fuck.me/xVeF7y.png";
                    }}
                    onLoad={(e) => {
                        view.setState({ loadedImages: view.state.loadedImages + 1 });
                    }}
                />
            </div>
            <div className={style["anime-preview-1 group-1"]}>
                <div className={style["anime-preview-title-wrapper"]}>
                    <div className={style["anime-preview-title"]}>{e.title}</div>
                    <div className={style["anime-preview-data"]}>
                        <div className={style["anime-preview-data-icon icon-group"]}></div>
                        <div className={style["anime-preview-data-text"]}>{e.items.length}</div>
                    </div>
                </div>
            </div>
            <div className={style["group-2"]}></div>
            <div className={style["group-3"]}></div>
            {view.props.state.hoveredAnime !== e.id ? null : (
                <div className={style["anime-preview-hover group-hover"]}>
                    <div className={style["icon-info"]}></div>
                </div>
            )}
        </a>
    );*/
    return <div />;
};

export default Group;
