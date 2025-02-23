import { ListJobs } from "@type";
import listJobs from "./list/listJobs";
import * as filter from "./filter/index";

const offers = async () => {
  const list: ListJobs = await listJobs();
  console.log(`It was found ${list.length} jobs`);
  const filteredByNull = filter.Null(list);
  if (filteredByNull.length < list.length) {
    console.log(
      `It was found ${
        list.length - filteredByNull.length
      } jobs without information`
    );
  }
  const filteredByLocation = filter.location(filteredByNull);
  if (filteredByLocation.length < filteredByNull.length) {
    console.log(
      `It was found ${
        filteredByNull.length - filteredByLocation.length
      } jobs were not in location requested`
    );
  }
  const filteredByTitle = filter.title(filteredByLocation);
  if (filteredByTitle.length < filteredByLocation.length) {
    console.log(
      `It was found ${
        filteredByLocation.length - filteredByTitle.length
      } jobs were not relevance`
    );
  }

  return filteredByTitle;
};

export default offers;
