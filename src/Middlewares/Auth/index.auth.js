"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    else {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
}
exports.requireAuth = requireAuth;
