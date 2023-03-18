export class Validator {
  validation(newQuery, oldQuery) {
    const formattedQuery = this.formatting(newQuery);
    return [
      this.notEmpty(formattedQuery),
      this.isNewQuery(formattedQuery, oldQuery),
    ].every(Boolean);
  }

  formatting(query) {
    return query.trim().toLowerCase();
  }

  notEmpty(query) {
    if (query != '') {
      return true;
    }
    return false;
  }

  isNewQuery(newQuery, oldQuery) {
    if (newQuery != oldQuery) {
      return true;
    }
    return false;
  }
}
