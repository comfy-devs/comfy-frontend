/* Base */
import { h, FunctionalComponent } from "preact";
import { AllConnectedProps } from "../../ts/routes";
import { useEffect } from "react";
import { FilterGroup, FilterSort, FilterType } from "../../ts/base";
import { filterValueToDisplayName } from "../../scripts/nyan/constants";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
/* Components */
import AnimeCard from "../../components/anime-card";
import GroupCard from "../../components/group-card";
import Navigation from "../../components/navigation";
import Filter from "../../components/filter";

const All: FunctionalComponent<AllConnectedProps> = (props: AllConnectedProps) => {
    /* Default filters */
    useEffect(() => {
        props.actions.setFilterStatus(null);
        props.actions.setFilterSort(FilterSort.TITLE);
    }, [true]);

    /* Filter through animes */
    let animes = Array.from(props.animes.values());
    animes = animes.filter((e) => { return e.title.toLowerCase().includes(props.filterData.searchTerm.toLowerCase()); });
    animes = animes.filter((e) => { return props.filterData.genres === null ? true : (e.genres & props.filterData.genres) === props.filterData.genres; });
    // animes = animes.filter((e) => { return props.filterData.year === null ? true : true; });
    animes = animes.filter((e) => { return props.filterData.type === null ? true : e.type === props.filterData.type; });
    animes = animes.filter((e) => { return props.filterData.status === null ? true : e.status === props.filterData.status; });
    animes = animes.filter((e) => { return props.filterData.tags === null ? true : (e.tags & props.filterData.tags) === props.filterData.tags; });
    animes.sort((a, b) => {
        switch(props.filterData.sort) {
            case FilterSort.TITLE:
                return a.title.localeCompare(b.title);

            case FilterSort.RELEASE:
                return 1;

            case FilterSort.FAVOURITES:
                return a.favourites - b.favourites;
        }
    });

    const filterItems = [
        <Filter key={0} type={FilterType.GENRES} value={filterValueToDisplayName(FilterType.GENRES, props.filterData.genres)} filterData={props.filterData} actions={props.actions} />,
        <Filter key={1} type={FilterType.YEAR} value={filterValueToDisplayName(FilterType.YEAR, props.filterData.year)} filterData={props.filterData} actions={props.actions} />,
        <Filter key={2} type={FilterType.TYPE} value={filterValueToDisplayName(FilterType.TYPE, props.filterData.type)} filterData={props.filterData} actions={props.actions} />,
        <Filter key={3} type={FilterType.STATUS} value={filterValueToDisplayName(FilterType.STATUS, props.filterData.status)} filterData={props.filterData} actions={props.actions} />,
        <Filter key={4} type={FilterType.SORT} value={filterValueToDisplayName(FilterType.SORT, props.filterData.sort)} filterData={props.filterData} actions={props.actions} />,
        <Filter key={5} type={FilterType.TAGS} value={filterValueToDisplayName(FilterType.TAGS, props.filterData.tags)} filterData={props.filterData} actions={props.actions} />
    ];

    let previews: any[] = [];
    if(props.filterData.group === FilterGroup.YES) {
        previews = animes.filter(e => { return e.group === null || e.season === 0; }).map((e, i) => {
            if(e.group !== null) {
                const group = props.groups.get(e.group);
                if(group !== undefined) {
                    return <GroupCard key={i} item={group} children={animes.filter(el => { return el.group === e.group; })} />;
                }
            } else {
                return <AnimeCard key={i} item={e} alt />;
            }
        });
    } else {
        previews = animes.map((e, i) => {
            return <AnimeCard key={i} item={e} alt />;
        });
    }

    return (
        <div className={"route"}>
            <div className={style.all}>
                <div className={style["all-title"]}>Animes ({animes.length}):</div>
                <div className={style["all-filters"]}>
                    <div className={style["all-filters-chunk-wrapper"]}>
                        {props.dimensions.w > 500 ? <div className={style["all-filters-chunk"]}>{filterItems.slice(0, 3)}</div> : <div className={style["all-filters-chunk"]}>{filterItems.slice(0, 2)}</div>}
                        {props.dimensions.w > 500 ? <div className={style["all-filters-chunk"]}>{filterItems.slice(3)}</div> : <div className={style["all-filters-chunk"]}>{filterItems.slice(2, 4)}</div>}
                        {props.dimensions.w > 500 ? null : <div className={style["all-filters-chunk"]}>{filterItems.slice(4)}</div>}
                    </div>
                    <div className={style["all-filters-chunk-wrapper"]}> 
                        <input
                            placeholder="Search..."
                            className={style["all-filter-search"]}
                            onChange={(e) => {
                                props.actions.setFilterSearchTerm(e.currentTarget.value);
                            }}
                            value={props.filterData.searchTerm}
                        />
                        <div className={style["all-filters-chunk"]}>
                            <Filter type={FilterType.ITEMS} value={filterValueToDisplayName(FilterType.ITEMS, props.filterData.items)} filterData={props.filterData} actions={props.actions} />
                            <Filter type={FilterType.GROUP} value={filterValueToDisplayName(FilterType.GROUP, props.filterData.group)} filterData={props.filterData} actions={props.actions} />
                        </div>
                    </div>
                </div>
                <div className={style["all-previews"]}>
                    {previews}
                </div>
            </div>
            <Navigation filterData={props.filterData} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(All);
