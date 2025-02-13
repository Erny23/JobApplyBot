export type Jobs = {
  id: string;
  title: string;
  location: string;
  itemsList: {
    view: boolean;
    simpleRequest: boolean;
  };
};

export type ListJobs = {
  id: string;
  title: string;
  location: string;
  itemsList: {
    view: boolean;
    simpleRequest: boolean;
  };
}[];
