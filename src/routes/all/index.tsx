/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { Text, Localizer } from "preact-i18n";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import ShowCard from "../../components/show-card";
import GroupCard from "../../components/group-card";
import Navigation from "../../components/navigation";
import Filter from "../../components/filter";

const All: FunctionalComponent<AllConnectedProps> = (props: AllConnectedProps) => {
    /* API calls */
    useEffect(() => {
        props.actions.fetchAllShows();
        props.actions.fetchAllGroups();
    }, [true]);

    /* Default filters */
    useEffect(() => {
        props.actions.setFilterStatus(null);
        props.actions.setFilterSort("TITLE_ASC");
    }, [true]);

    /* Filter through shows */
    let shows = Array.from(props.shows.values());
    shows = shows.filter((e) => {
        return e.title.toLowerCase().includes(props.filterData.searchTerm.toLowerCase());
    });
    shows = shows.filter((e) => {
        return props.filterData.genres === null ? true : (e.genres & props.filterData.genres) === props.filterData.genres;
    });
    // shows = shows.filter((e) => { return props.filterData.year === null ? true : true; });
    shows = shows.filter((e) => {
        return props.filterData.type === null ? true : e.type === props.filterData.type;
    });
    shows = shows.filter((e) => {
        return props.filterData.status === null ? true : e.status === props.filterData.status;
    });
    shows = shows.filter((e) => {
        return props.filterData.tags === null ? true : (e.tags & props.filterData.tags) === props.filterData.tags;
    });
    shows.sort((a, b) => {
        switch (props.filterData.sort) {
            case "TITLE_ASC":
                return a.title.localeCompare(b.title);

            case "TITLE_DESC":
                return b.title.localeCompare(a.title);

            case "RELEASE_ASC":
                return (b.timestamp ?? 0) - (a.timestamp ?? 0);

            case "RELEASE_DESC":
                return (a.timestamp ?? 0) - (b.timestamp ?? 0);

            case "FAVOURITES_ASC":
                return b.favourites - a.favourites;

            case "FAVOURITES_DESC":
                return a.favourites - b.favourites;
        }
    });

    const filterItems = [
        <Filter key={0} type={"GENRES"} value={props.filterData.genres} filterData={props.filterData} actions={props.actions} />,
        <Filter key={1} type={"YEAR"} value={props.filterData.year} filterData={props.filterData} actions={props.actions} />,
        <Filter key={2} type={"TYPE"} value={props.filterData.type} filterData={props.filterData} actions={props.actions} />,
        <Filter key={3} type={"STATUS"} value={props.filterData.status} filterData={props.filterData} actions={props.actions} />,
        <Filter key={4} type={"SORT"} value={props.filterData.sort} filterData={props.filterData} actions={props.actions} />,
        <Filter key={5} type={"TAGS"} value={props.filterData.tags} filterData={props.filterData} actions={props.actions} />,
    ];

    let previews: any[] = [];
    if (props.filterData.group === "YES") {
        previews = shows
            .filter((e) => {
                return e.group === null || e.season === 0;
            })
            .map((e, i) => {
                if (e.group !== null) {
                    const group = props.groups.get(e.group);
                    if (group !== undefined) {
                        return (
                            <GroupCard
                                key={i}
                                item={group}
                                children={shows.filter((el) => {
                                    return el.group === e.group;
                                })}
                            />
                        );
                    }
                } else {
                    return <ShowCard key={i} item={e} preferences={props.preferences} />;
                }
            });
    } else {
        const start = props.filterData.page * props.filterData.items;
        previews = shows.slice(start, start + props.filterData.items).map((e, i) => {
            return <ShowCard key={i} item={e} preferences={props.preferences} />;
        });
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style.all}>
                <div className={style["all-title"]}>
                    <Text id="all.title" fields={{ count: shows.length }} />
                </div>
                <div className={style["all-filters"]}>
                    <div className={style["all-filters-chunk-wrapper"]}>
                        {props.dimensions.w > 500 ? <div className={style["all-filters-chunk"]}>{filterItems.slice(0, 3)}</div> : <div className={style["all-filters-chunk"]}>{filterItems.slice(0, 2)}</div>}
                        {props.dimensions.w > 500 ? <div className={style["all-filters-chunk"]}>{filterItems.slice(3)}</div> : <div className={style["all-filters-chunk"]}>{filterItems.slice(2, 4)}</div>}
                        {props.dimensions.w > 500 ? null : <div className={style["all-filters-chunk"]}>{filterItems.slice(4)}</div>}
                    </div>
                    <div className={style["all-filters-chunk-wrapper"]}>
                        <Localizer>
                            <input
                                placeholder={props.dictionary.all?.search}
                                className={style["all-filter-search"]}
                                onChange={(e) => {
                                    props.actions.setFilterSearchTerm(e.currentTarget.value);
                                }}
                                value={props.filterData.searchTerm}
                            />
                        </Localizer>
                        <div className={style["all-filters-chunk"]}>
                            <Filter type={"ITEMS"} value={props.filterData.items} filterData={props.filterData} actions={props.actions} />
                            <Filter type={"GROUP"} value={props.filterData.group} filterData={props.filterData} actions={props.actions} />
                        </div>
                    </div>
                </div>
                <div className={style["all-previews"]}>{previews}</div>
            </div>
            <Navigation items={shows.length} page={props.filterData.page} limit={props.filterData.items} actions={props.actions} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(All);
