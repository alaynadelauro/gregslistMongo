import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, NotFound } from "../utils/Errors.js"

class HouseService {
    async getHouses() {
        const house = await dbContext.Houses.find()
        return house
    }
    async getHouseById(houseId) {
        const foundHouse = await dbContext.Houses.findById(houseId)
        if (!foundHouse) {
            throw new NotFound(`couldn't find the house you're looking for`)
        }
        return foundHouse
    }
    async buildHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async editHouse(houseId, userId, houseData) {
        const editedHouse = await dbContext.Houses.findById(houseId)
        if (!editedHouse) {
            throw new BadRequest(`The house you're trying to change doesn't exist - try a different ID. You can do a get request to see what the ID of each house is`)
        }
        if (userId != editedHouse.creatorId) {
            throw new Forbidden(`You can't change the details of a house you don't own`)
        }
        editedHouse.bedrooms = houseData.bedrooms
        editedHouse.bathrooms = houseData.bathrooms
        editedHouse.description = houseData.description
        await editedHouse.save()
        return (editedHouse)
    }
    async destroyHouse(houseId, userId) {
        const destroyedHouse = await dbContext.Houses.findById(houseId)
        if (!destroyedHouse) {
            throw new BadRequest(`Way to beat a dead horse - if this house existed once, it didn't by the time you came along to destroy it`)
        }
        if (userId != destroyedHouse.creatorId) {
            throw new Forbidden(`Look I'm all for playing pranks on other people, but maybe destroying their houses isn't the way to go about it`)
        }
        await destroyedHouse.remove()
        return destroyedHouse
    }
}

export const houseService = new HouseService()