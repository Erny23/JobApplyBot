import { ListJobs } from "@type";

const countriesEnv = process.env.COUNTRY;
const statesEnv = process.env.STATE;
const citiesEnv = process.env.CITY;

const parseArrayEnv = (
  env: string | undefined,
  separator: string = ","
): string[] => {
  if (!env) {
    return [];
  }
  return env.split(separator);
};

const filter = (offers: ListJobs) => {
  const countries = parseArrayEnv(countriesEnv);
  const states = parseArrayEnv(statesEnv);
  const cities = parseArrayEnv(citiesEnv);

  return offers
    .filter((offer) => {
      const location = (place: string) => {
        if (!place) {
          return false;
        }
        const ple = place.toLowerCase();
        if (offer.location && typeof offer.location === "string") {
          return offer.location.toLowerCase().includes(ple) || false;
        }
        return false;
      };

      const inCountry = countries.some((country) => {
        if (!country) {
          return false;
        }
        return location(country);
      });

      const inState = states.some((state) => {
        if (!state) {
          return false;
        }
        return location(state);
      });

      const inCity = cities.some((city) => {
        if (!city) {
          return false;
        }
        return location(city);
      });

      return inCountry || inState || inCity;
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
