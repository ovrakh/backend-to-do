class BaseController { 
  constructor() {}
  
  async getValidationResult(req) {
    let result = await req.getValidationResult();
    
    if (!result.isEmpty()) {
      throw result.mapped();
    } 
  }
}

module.exports = BaseController;