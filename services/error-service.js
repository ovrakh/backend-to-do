let listError = {

  api: {

    default: {
      code: 1000,
      message: 'Internal server error.',
    }

  },

  user: {

    default: {
      code: 2000,
      message: 'Internal user error.'
    },

    notFound: {
      code: 2001,
      message: 'User not found.'
    },

    unauthorized: {
      code: 2002,
      message: 'Missing or invalid authentication token.'
    },

    exist: {
      code: 2003,
      message: 'User already exists.'
    },

    wrongPassword: {
      code: 2004,
      message: 'Authenticate failed. Wrong password.'
    },
    
    invalidEmail: {
      code: 2005,
      message: 'Invalid email'
    }

  },

  article: {

    default: {
      code: 3000,
      message: 'Internal article error.'
    },

    notFound: {
      code: 3001,
      message: 'Article not found.'
    },

    badRequest : {
      code: 3002,
      message: 'Bad request.'
    }

  },
   
  auth: {

    default: {
      code: 5000,
      message: 'Internal auth error.'
    },

    notFound: {
      code: 5001,
      message: 'Session not found.'
    },
     
    accessDeny: {
      code: 5002,
      message: 'Access denied.'
    },
    
    invalidSession: {
      code: 5003,
      message: 'Invalid session.'
    }
  },

  request:{

    default: {
      code: 4000,
      message: 'Internal consultation error.'
    },

    notFound: {
      code: 4001,
      message: 'Consultation not found.'
    },

    badRequest: {
      code: 4002,
      message: 'Bad request for consultation.'
    }
  },

  company:{ 

    default: {
      code: 5000,
      message: 'Internal company error.'
    },

    notFound: {
      code: 5001,
      message: 'Company not found.'
    },

    alreadyExists: {
      code: 5002,
      message: 'Company already exists'
    },

    nameIsBusy: {
      code: 5003,
      message: 'Company with this name already busy'
    },

    codeIsBusy: {
      code: 5004,
      message: 'Company with this code already busy'
    }
  },
  
  test:{
    
    default: {
      code: 6000,
      message: 'Internal test error.'
    },

    notFound: {
      code: 6001,
      message: 'Test not found.'
    },

    exists: {
      code: 6002,
      message: 'Test already exists.'
    }

  }

};

function assignEx(object) {
  object.ex = err => {
    console.log('err', err);
    if (err && err.code) {
      return err;
    }
    
    let originalError = err;
    
    if (Object.keys(err).length === 0) {
      originalError = err.toString();
    }

    return Object.assign(object, { originalError });
  }
  
}

function deepAssign(object) {
  Object.keys(object).forEach(key => {
    let item = object[key];

    if (item instanceof Object) {
      deepAssign(item);
    }

    assignEx(item);
  });
}

deepAssign(listError);

module.exports = listError;
