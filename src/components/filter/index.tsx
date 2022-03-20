/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { FilterConnectedProps } from "../../ts/components";
import { FilterGroup, FilterSort, FilterType } from "../../ts/base";
import { splitArray } from "../../scripts/nyan/util";
import { filterTypeToValues } from "../../scripts/nyan/constants";
import { filterValueToDisplayName } from "../../scripts/nyan/functions";
/* Styles */
import style from "./style.scss";

const Filter: FunctionalComponent<FilterConnectedProps> = (props: FilterConnectedProps) => {
    const filterValues: (number | null)[] = filterTypeToValues(props.type);
    if (props.type !== FilterType.SORT && props.type !== FilterType.ITEMS && props.type !== FilterType.GROUP) {
        filterValues.unshift(null);
    }

    const filterButtons = filterValues.map((e, i) => {
        return (
            <div
                key={i}
                className={style["filter-item"]}
                onClick={() => {
                    switch (props.type) {
                        case FilterType.GENRES:
                            props.actions.setFilterGenres(e);
                            return;

                        case FilterType.YEAR:
                            props.actions.setFilterYear(e);
                            return;

                        case FilterType.TYPE:
                            props.actions.setFilterType(e);
                            return;

                        case FilterType.STATUS:
                            props.actions.setFilterStatus(e);
                            return;

                        case FilterType.SORT:
                            props.actions.setFilterSort(e !== null ? e : FilterSort.TITLE_ASC);
                            return;

                        case FilterType.TAGS:
                            props.actions.setFilterTags(e);
                            return;

                        case FilterType.ITEMS:
                            props.actions.setFilterItems(e !== null ? e : 50);
                            return;

                        case FilterType.GROUP:
                            props.actions.setFilterGroup(e !== null ? e : FilterGroup.NO);
                            return;
                    }
                }}>
                {filterValueToDisplayName(props.type, e)}
            </div>
        );
    });

    return (
        <button className={style["filter-wrapper"]}>
            <div className={style.filter}>
                <div className={style["filter-title"]}>
                    <Text id={`enum.filterType.${props.type}`} />:{" "}
                </div>
                <div className={style["filter-value"]}>{filterValueToDisplayName(props.type, props.value)}</div>
            </div>
            <div className={style["filter-items-wrapper"]}>
                {splitArray(filterButtons, 15).map((e: HTMLElement, i: number) => {
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
