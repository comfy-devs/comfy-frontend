/* Types */
import { h } from "preact";
import { Text } from "preact-i18n";

const filterTypeMap: Record<FilterType, (type: number | null, value: number) => h.JSX.Element> = {
    TYPE: (type: number | null, value: number) => <Text id={`enum.showType.${value}`} />,
    FORMAT: (type: number | null, value: number) => <Text id={`enum.showFormat.${type}.${value}`} />,
    STATUS: (type: number | null, value: number) => <Text id={`enum.showStatus.${value}`} />,
    GENRES: (type: number | null, value: number) => <Text id={`enum.showGenre.${type}.${value}`} />,
    YEAR: (type: number | null, value: number) => <Text id="">{value.toString()}</Text>,
    SORT: (type: number | null, value: number) => <Text id={`enum.filterSort.${value}`} />,
    TAGS: (type: number | null, value: number) => <Text id={`enum.showTag.${value}`} />,
    ITEMS: (type: number | null, value: number) => <Text id="">{value.toString()}</Text>,
    GROUP: (type: number | null, value: number) => <Text id={`enum.filterGroup.${value}`} />,
};
export function filterValueToDisplayName(type: number | null, filter: FilterType, value: any) {
    if (value === null) {
        if (filter === "SORT") {
            return <Text id="filter.default" />;
        }
        return <Text id="filter.any" />;
    }
    return filterTypeMap[filter](type, value);
}
