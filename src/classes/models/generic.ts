import Model from "./../model";

class Generic extends Model {
  casts() {
    return {
      created_at: this.parseDate,
      updated_at: this.parseDate
    };
  }
}

export default Generic;
