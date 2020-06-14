'use strict';

module.exports = (capability) => {
  // console.log('sssssssssss',capability);
  // capability == "create" || 'update' || 'delete ||'read'
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        // console.log('qqqqqqqqqqqqqqqqqqqq',req.user);
        
        next();

      } else {
        next('Access Denied!!');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};