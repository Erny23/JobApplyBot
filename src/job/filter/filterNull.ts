import { ListJobs } from "@type";

const filter = (offers: ListJobs) => {
  return offers
    .filter((offer) => {
      const title =
        offer.title !== null && offer.title !== undefined && offer.title !== "";
      const location =
        offer.location !== null &&
        offer.location !== undefined &&
        offer.location !== "";
      const request: boolean = offer.itemsList.simpleRequest || false;
      return title && location && request;
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
