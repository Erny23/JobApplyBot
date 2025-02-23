import { ListJobs } from "@type";

const filter = (offers: ListJobs) => {
  return offers
    .filter((offer) => {
      const title: boolean =
        offer.title === "" ||
        offer.title.length < 2 ||
        offer.title === null ||
        offer.title === undefined;
      const location: boolean =
        offer.title === "" ||
        offer.title.length < 2 ||
        offer.title === null ||
        offer.title === undefined;
      const request: boolean = offer.itemsList.simpleRequest;
      return !title && !location && request;
    })
    .map((offer) => {
      return {
        id: offer.id,
        title: offer.title,
        location: offer.location,
        itemsList: {
          view: offer.itemsList.view,
          simpleRequest: offer.itemsList.simpleRequest,
        },
      };
    });
};

export default filter;
