class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    
    search() {
        const keyword = this.queryStr.keyword 
        ? {
              name: {
                $regex: this.queryStr.keyword
                .split(' ')
            .map(word => `(?=.*${word})`)
            .join('') + '.*',
                $options: 'i', // Case-insensitive search
              },
            }
          : {}
      
        this.query = this.query.find({...keyword});
        return this;
      }


    filter() {
        let queryObj = { ...this.queryStr};

        const excludedFields = ['keyword','page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
      // Filter by price range if provided
      if (queryObj.minPrice || queryObj.maxPrice) {
        queryObj.price = {};
        if (queryObj.minPrice) {
          queryObj.price.$gte = parseFloat(queryObj.minPrice);
        }
        if (queryObj.maxPrice) {
          queryObj.price.$lte = parseFloat(queryObj.maxPrice);
        }
        delete queryObj.minPrice;
        delete queryObj.maxPrice;
      }


       let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
      }
    
    
       sort() {
        if (this.queryStr.sort) {
          const sortBy = this.queryStr.sort.split(',').join(' ');
          this.query = this.query.sort(sortBy);
        } else {
          this.query = this.query.sort('-createdAt');
        }
        return this;
      }
      
    
      limitFields() {
        let queryObj = this.queryStr
        if(typeof queryObj === 'string'){
            queryObj = JSON.parse(queryObj)
        }
        if (this.queryStr.fields) {
          const fields = this.queryStr.fields.split(',').join(' ');
          this.query = this.query.select(fields);
        } else {
          this.query = this.query.select('-__v');
        }
        return this;
      }
    
      paginate() {
        const page = parseInt(this.queryStr.page, 10) || 1;
        const limit = parseInt(this.queryStr.limit, 10) || 10;
        const skip = (page - 1) * limit;
    
        this.query = this.query.skip(skip).limit(limit);
        return this;
      }
}

module.exports = ApiFeatures