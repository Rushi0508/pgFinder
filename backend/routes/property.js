import express from 'express'
import { getProperty, getUserProperty,createProperty,editProperty,deleteProperty,nearestProperty } from '../controllers/property'

const router = express.Router();
router.route('/api/property/nearest')
    .get(nearestProperty)
router.route('/api/property/create')
    .post(createProperty)
router.route('/api/property/edit/:id')
    .put(editProperty)
router.route('/api/property/delete/:id')
    .delete(deleteProperty)
router.route('/api/property/user/:userId')
    .get(getUserProperty)
router.route('/api/property/:id')
    .get(getProperty)
    
export default router