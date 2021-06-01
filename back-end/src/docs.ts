import { AuthChangePasswordController } from "./app/@modules/auth/controllers/auth-change-passwordcontroller"
import { AuthLoginController } from "./app/@modules/auth/controllers/auth-login.controller"
import { AuthRegisterController } from "./app/@modules/auth/controllers/auth-register.controller"
import { CustomerController } from "./app/@modules/customer/controllers/customer.controller"
import { DepartmentController } from "./app/@modules/ecommarce/controllers/department.controller"
import { ENV } from "./ENV"
import { UserController } from "./app/@modules/user/controllers/user.controller"
import { getMetadataArgsStorage } from "routing-controllers"
import { routingControllersToSpec } from "routing-controllers-openapi"
import { validationMetadatasToSchemas } from "class-validator-jsonschema"

const { defaultMetadataStorage } = require("class-transformer/cjs/storage")

//* DOCS
const schemas = validationMetadatasToSchemas({
	classTransformerMetadataStorage: defaultMetadataStorage,
	refPointerPrefix: "#/components/schemas/",
})
const storage = getMetadataArgsStorage()
export const spec = routingControllersToSpec(
	storage,
	{
		controllers: [
			AuthLoginController,
			AuthRegisterController,
			AuthChangePasswordController,
			UserController,
			CustomerController,
			DepartmentController,
		],

		routePrefix: ENV.API_PREFIX,
	},
	{
		components: {
			schemas,
			securitySchemes: {
				basicAuth: {
					scheme: "basic",
					type: "http",
				},
			},
		},
		info: {
			description: ENV.API_DESC,
			title: ENV.API_TITLE,
			version: ENV.API_TITLE,
		},
	}
)
