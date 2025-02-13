import { ListJobs } from "@type";
import listJobs from "./list/listJobs";
import * as filter from "./filter/index";

const offers = async () => {
  const list: ListJobs = await listJobs();

  const filteredByNull = filter.Null(list);

  const filterByLocation = filter.location(filteredByNull);

  const filterByTitle = filter.title(filterByLocation);

  return filterByTitle;
};

export default offers;
