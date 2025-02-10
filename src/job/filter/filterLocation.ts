import { ListJobs } from "@type";

const filter = (offers: ListJobs) => {
  return offers
    .filter((offer) => {
      const location = (place: string) =>
        offer.location?.includes(place) || false;

      const inVenezuela = location("Venezuela") || location("venezuela");

      const inValencia =
        location("Valencia") ||
        location("valencia") ||
        location("Carabobo") ||
        location("carabobo") ||
        location("Naguanagua") ||
        location("naguanagua") ||
        location("San Diego") ||
        location("san diego");

      const inCaracas =
        location("Caracas") ||
        location("caracas") ||
        location("Distrito Capital") ||
        location("distrito capital");

      const inEspana = location("España") || location("españa");

      return inVenezuela || inValencia || inCaracas || inEspana;
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
