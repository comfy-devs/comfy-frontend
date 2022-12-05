/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { splitArray } from "../../scripts/nyan/util";
import { filterTypeToValues } from "../../scripts/nyan/constants";
import { filterValueToDisplayName } from "../../scripts/nyan/functions";
/* Styles */
import style from "./style.scss";
import { useState } from "react";

const Filter: FunctionalComponent<FilterConnectedProps> = (props: FilterConnectedProps) => {
    const [filterValues] = useState(() => {
        const v = filterTypeToValues(props.type);
        if (props.type !== "SORT" && props.type !== "ITEMS" && props.type !== "GROUP") {
            v.unshift(null);
        }
        return v;
    });

    const filterButtons = filterValues.map((e, i) => {
        return (
            <div key={i}
                className={style["filter-item"]}
                onClick={() => {
                    switch (props.type) {
                        case "GENRES":
                            props.actions.setFilterGenres(e);
                            return;

                        case "YEAR":
                            props.actions.setFilterYear(e);
                            return;

                        case "TYPE":
                            props.actions.setFilterType(e);
                            return;

                        case "STATUS":
                            props.actions.setFilterStatus(e);
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
                }}>
                {filterValueToDisplayName(props.type, e)}
            </div>
        );
    });

    console.log(props.type);
    return (
        <button className={style["filter-wrapper"]}>
            <div className={style.filter}>
                <div className={style["filter-title"]}>
                    <Text id={`enum.filterType.${props.type}`} />:{" "}
                </div>
                <div className={style["filter-value"]}>{filterValueToDisplayName(props.type, props.value)}</div>
            </div>
            <div className={style["filter-items-wrapper"]}>
                {splitArray(filterButtons, 15).map((e: h.JSX.Element, i: number) => {
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
