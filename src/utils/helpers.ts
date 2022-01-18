interface Filter<T> {
	property: T;
	value: any;
}

type FilterList = {
	[key: string]: Function;
};

export const createFiltersApplier = <T>(filtersList: FilterList) => {
	return (array: T[], appliedFilters: Filter<keyof typeof filtersList>[]) =>
		appliedFilters.reduce(
			(result, { property, value }) => (value !== undefined ? result.filter(filtersList[property](value)) : result),
			array
		);
};

export const parseBoolean = (boolean: any) => boolean === true || boolean == 'true';
