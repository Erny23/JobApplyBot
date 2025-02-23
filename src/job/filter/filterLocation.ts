import { ListJobs } from "@type";
import { parseArray } from "@parse";

const countriesEnv = process.env.COUNTRY || "";
const statesEnv = process.env.STATE || "";
const citiesEnv = process.env.CITY || "";

const filter = (offers: ListJobs) => {
  const countries = parseArray(countriesEnv);
  const states = parseArray(statesEnv);
  const cities = parseArray(citiesEnv);
  console.log(
    `Doing filter for offers the countries: ${countries}, in the states: ${states}, with possibility in: ${cities}`
  );
  return offers
    .filter((offer) => {
      const location = offer.location ? offer.location.toLowerCase() : "";

      const matchesCountry = countries.some((country) =>
        location.includes(country)
      );
      const matchesState = states.some((state) => location.includes(state));
      const matchesCity = cities.some((city) => location.includes(city));

      const matchesCombination = countries.some((country) =>
        states.some((state) =>
          cities.some(
            (city) =>
              location.includes(`${city}, ${state}, ${country}`) ||
              location.includes(`${state}, ${country}`) ||
              location.includes(`${city}, ${country}`)
          )
        )
      );

      return (
        matchesCountry || matchesState || matchesCity || matchesCombination
      );
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
