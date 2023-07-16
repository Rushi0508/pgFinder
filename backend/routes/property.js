import express from 'express'
import { getProperty, getUserProperty,createProperty,editProperty,deleteProperty,nearestProperty } from '../controllers/property'
import { isAuthenticated } from '../middleware';

const router = express.Router();
router.route('/api/property/nearest')
    .post(isAuthenticated, nearestProperty)
router.route('/api/property/create')
    .post(isAuthenticated, createProperty)
router.route('/api/property/edit/:id')
    .put(isAuthenticated, editProperty)
router.route('/api/property/delete/:id')
    .delete(isAuthenticated, deleteProperty)
router.route('/api/property/user/:userId')
    .get(isAuthenticated, getUserProperty)
router.route('/api/property/:id')
    .get(isAuthenticated, getProperty)
    
export default router