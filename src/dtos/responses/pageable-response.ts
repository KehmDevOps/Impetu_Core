export class PageableResponse {
  public data: Array<any>;
  public totalItems: number;
  public totalPages: number;
  public currentPage: number;

  constructor(
    data: Array<any>,
    totalItems: number,
    totalPages: number,
    currentPage: number,
  ) {
    this.data = data;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}
