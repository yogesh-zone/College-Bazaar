class ApiFetchure {
  constructor(ads, query) {
    this.ads = ads;
    this.query = query;
  }

  search() {
    // search ads by name
    if (!this.query) {
      return this;
    }
    const { name, category, course, semester, state } = this.query;
    if (name) {
      this.ads = this.ads.find({ name: { $regex: name }, $options: "i" });
    }

    // search by couser
    if (course) {
      this.ads = this.ads.find({ course });
    }

    // search by semester
    if (semester) {
      this.ads = this.ads.find({ semester });
    }
    //search by Category
    if (category) {
      if (category == "All") {
        this.ads = this.ads.find();
      } else {
        this.ads = this.ads.find({ Category: category });
      }
    }

    // search by state
    if (state) {
      let address = { state };
      this.ads = this.ads.find({ address });
    }
    console.log("hello-mello");
    return this;
  }

  pagination(resultPerPage) {
    const currPage = Number(this.query.page) || 1;
    const skipAds = resultPerPage * (currPage - 1);
    this.ads = this.ads.limit(resultPerPage).skip(skipAds);
    return this;
  }
}

module.exports = ApiFetchure;
