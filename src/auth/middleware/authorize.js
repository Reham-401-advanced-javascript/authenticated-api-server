'use strict';

module.exports = (capability) => {
  // capability == "create" || 'update' || 'delete ||'read'
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied!!');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};