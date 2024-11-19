import { UserController } from '../controllers/user.controller'
import { userService } from '../services'

const userController = new UserController(userService)
