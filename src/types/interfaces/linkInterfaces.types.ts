export interface ItemLinkInterface {
  name: string;
  path: string;
}

export interface LinkInterface {
  items: Record<string, ItemLinkInterface>;
}
