import { Auth0Provider } from "@bcwdev/auth0provider";
import { houseService } from "../services/HouseService.js";
import BaseController from "../utils/BaseController.js";

export class HouseController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .get('/:houseId', this.getHouseById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.buildHouse)
            .put('/:houseId', this.editHouse)
            .delete('/:houseId', this.destroyHouse)
    }
    async getHouses(req, res, next) {
        try {
            const houses = await houseService.getHouses()
            return res.send(houses)
        } catch (error) {
            next(error)
        }
    }
    async getHouseById(req, res, next) {
        try {
            const houseId = req.params.houseId
            const foundHouse = await houseService.getHouseById(houseId)
            return res.send(foundHouse)
        } catch (error) {
            next(error)
        }
    }
    async buildHouse(req, res, next) {
        try {
            const houseData = req.body
            const userData = req.userInfo
            houseData.creatorId = userData.id
            const house = await houseService.buildHouse(houseData)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }
    async editHouse(req, res, next) {
        try {
            const houseId = req.params.houseId
            const userId = req.userInfo.id
            const houseData = req.body
            const newHouse = await houseService.editHouse(houseId, userId, houseData)
            return res.send(newHouse)
        } catch (error) {
            next(error)
        }
    }
    async destroyHouse(req, res, next) {
        try {
            const houseId = req.params.houseId
            const userId = req.userInfo.id
            const destroyedHouse = await houseService.destroyHouse(houseId, userId)
            return res.send(destroyedHouse)
        } catch (error) {
            next(error)
        }
    }
}