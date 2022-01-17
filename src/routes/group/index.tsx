/* Base */
import { h, FunctionalComponent } from "preact";
import { GroupRouteConnectedProps } from "../../ts/routes";
import { useParams } from "react-router-dom";
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
    if (id === undefined) {
        return null;
    }
    const group = props.groups.get(id);
    if (group === undefined) {
        return null;
    }
    const animes = Array.from(props.animes.values()).filter(e => { return e.group === group.id; });

    return (
        <div className={"route"}>
            <div className={style.group}>
                <div className={style["group-title-wrapper"]}>
                    <div className={style["group-title"]}>{group.title}</div>
                    <div className={style["group-subtitle"]}>({animes.length} seasons)</div>
                </div>
                <div className={style["group-previews"]}>
                    {animes.map((e, i) => {
                        if(e.season === null) { return; }
                        return <AnimeCard key={i} item={e} alt extra={`Season ${(e.season + 1)}`} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Group);
