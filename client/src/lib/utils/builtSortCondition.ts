// import { BuildSortCondition } from '../../../types';
export type BuildSortCondition = {
  sort: string | string[] | undefined;
  order: string | string[] | undefined;
};
export const buildSortCondition = ({
  sort,
  order
}: BuildSortCondition) => {
  if (!sort || !order) {
    return { createdAt: -1 }; // default sort by 'createdAt' ascending
  }

  // change sort dan order to array, for consistency
  const sortArray = Array.isArray(sort) ? sort : [sort];
  const orderArray = Array.isArray(order) ? order : [order];

  // single sort > example: sort=name&order=asc
  // multiple sort > example: sort=name&sort=city&order=asc&order=desc

  // Create a single sort object
  const sortConditions: Record<string, number> = {};

  sortArray.map((sortField, index) => {
    const sortOrder = orderArray[index] === 'desc' ? -1 : 1;
    console.log(
      `Sorting by ${sortField} in ${sortOrder === 1 ? 'ascending' : 'descending'} order`
    );
    sortConditions[sortField] = sortOrder;
  });

  return sortConditions;
};
