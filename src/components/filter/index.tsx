/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { splitArray } from "../../scripts/comfy/util";
import { filterTypeToValues } from "../../scripts/comfy/constants";
import { filterValueToDisplayName } from "../../scripts/comfy/filter";
/* Styles */
import style from "./style.scss";
import { useEffect, useState } from "react";

const Filter: FunctionalComponent<FilterConnectedProps> = (props: FilterConnectedProps) => {
    const [filterValues, setFilterValues] = useState<any[]>([]);
    useEffect(() => {
        const v = filterTypeToValues(props.filterData.type, props.filter);
        if (props.filter !== "SORT" && props.filter !== "ITEMS" && props.filter !== "GROUP") {
            v.unshift(null);
        }
        setFilterValues(v);
    }, [props.filter]);

    const filterButtons = filterValues.map((e, i) => {
        return (
            <div
                key={i}
                className={style["filter-item"]}
                onClick={() => {
                    switch (props.filter) {
                        case "TYPE":
                            props.actions.setFilterType(e);
                            return;

                        case "FORMAT":
                            props.actions.setFilterFormat(e);
                            return;

                        case "STATUS":
                            props.actions.setFilterStatus(e);
                            return;

                        case "GENRES":
                            props.actions.setFilterGenres(e);
                            return;

                        case "YEAR":
                            props.actions.setFilterYear(e);
                            return;

                        case "SORT":
                            props.actions.setFilterSort(e);
                            return;

                        case "TAGS":
                            props.actions.setFilterTags(e);
                            return;

                        case "ITEMS":
                            props.actions.setFilterItems(e);
                            return;

                        case "GROUP":
                            props.actions.setFilterGroup(e);
                            return;
                    }
                }}
                data={props.value === e ? "active" : undefined}>
                {filterValueToDisplayName(props.filterData.type, props.filter, e)}
            </div>
        );
    });

    return (
        <button className={style["filter-wrapper"]} disabled={props.filterData.type === null && (props.filter === "FORMAT" || props.filter === "GENRES")}>
            <div className={style.filter}>
                <div className={style["filter-title"]}>
                    <Text id={`enum.filterType.${props.filter}`} />:{" "}
                </div>
                <div className={style["filter-value"]}>{filterValueToDisplayName(props.filterData.type, props.filter, props.value)}</div>
            </div>
            <div className={style["filter-items-wrapper"]}>
                {splitArray(filterButtons, 15).map((e: h.JSX.Element[], i: number) => {
                    return (
                        <div key={i} className={style["filter-items"]}>
                            {e}
                        </div>
                    );
                })}
            </div>
        </button>
    );
};

export default Filter;
