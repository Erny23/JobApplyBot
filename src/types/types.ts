export type ListJobs = {
  id: string | null;
  title: string | null | undefined;
  location: string | null | undefined;
  itemsList: {
    view: boolean | undefined;
    simpleRequest: boolean | null | undefined;
  };
}[];
