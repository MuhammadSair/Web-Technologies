function isAdminAuthenticated(req, res, next) {
  if (req.session && req.session.adminId) {
      next();
  } 
else {
  res.render('Unauthorized', { role: 'admin' });
}

}

function isHrAuthenticated(req, res, next) {
  if (req.session && req.session.hrId) {
      next();
  } 
else {
  res.render('Unauthorized', { role: 'hr' });
}

}

module.exports = {
  isAdminAuthenticated,
  isHrAuthenticated
};