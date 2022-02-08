/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text } from "preact-i18n";
import { GroupRouteConnectedProps } from "../../ts/routes";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
/* Components */
import AnimeCard from "../../components/anime-card";

const Group: FunctionalComponent<GroupRouteConnectedProps> = (props: GroupRouteConnectedProps) => {
    const { id } = useParams();
    const group = id === undefined ? undefined : props.groups.get(id);

    /* API calls */
    useEffect(() => {
        if (id === undefined) {
            return;
        }
        props.actions.fetchGroup(id);
        props.actions.fetchAllAnimes();
    }, [true]);

    if (group === undefined) {
        return null;
    }
    const animes = Array.from(props.animes.values())
        .filter((e) => {
            return e.group === group.id;
        })
        .sort((a, b) => {
            if (a.season === null) {
                return 1;
            }
            if (b.season === null) {
                return -1;
            }
            return a.season !== b.season || a.timestamp === null || b.timestamp === null ? a.season - b.season : a.timestamp - b.timestamp;
        });

    return (
        <div className={"route"}>
            <div className={style.group}>
                <div className={style["group-title-wrapper"]}>
                    <div className={style["group-title"]}>{group.title}</div>
                    <div className={style["group-subtitle"]}>
                        (<Text id="group.seasons" fields={{ count: animes.length }} />)
                    </div>
                </div>
                <div className={style["group-previews"]}>
                    {animes.map((e, i) => {
                        if (e.season !== null) {
                            return <AnimeCard key={i} item={e} alt extra={<Text id="group.season" fields={{ number: e.season + 1 }} />} />;
                        }

                        return <AnimeCard key={i} item={e} alt extra={<Text id={`enum.animeType.${e.type}`} />} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Group);
