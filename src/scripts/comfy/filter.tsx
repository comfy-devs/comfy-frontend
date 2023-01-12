/* Types */
import { h } from "preact";
import { Text } from "preact-i18n";

const filterTypeMap: Record<FilterType, (value: number) => h.JSX.Element> = {
    GENRES: (value: number) => <Text id={`enum.showGenre.${value}`} />,
    YEAR: (value: number) => <Text id="">{value.toString()}</Text>,
    TYPE: (value: number) => <Text id={`enum.showType.${value}`} />,
    STATUS: (value: number) => <Text id={`enum.showStatus.${value}`} />,
    SORT: (value: number) => <Text id={`enum.filterSort.${value}`} />,
    TAGS: (value: number) => <Text id={`enum.showTag.${value}`} />,
    ITEMS: (value: number) => <Text id="">{value.toString()}</Text>,
    GROUP: (value: number) => <Text id={`enum.filterGroup.${value}`} />,
};
export function filterValueToDisplayName(type: FilterType, value: any) {
    if (value === null) {
        if (type === "SORT") {
            return <Text id="filter.default" />;
        }
        return <Text id="filter.any" />;
    }
    return filterTypeMap[type](value);
}