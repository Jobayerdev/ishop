import {
	Authorized,
	Body,
	Delete,
	Get,
	JsonController,
	Param,
	Post,
	Put,
	QueryParams,
} from "routing-controllers"
import { Container } from "typeorm-typedi-extensions"
import { BaseFilterDto } from "../../../@base/base-filter.dto"
import { UserType } from "./../../../@enums/userType.enum"
import { DepartmentDto } from "./../dtos/department.dto"
import { DepartmentService } from "./../services/department.service"

@JsonController("department")
@Authorized([UserType.CUSTOMER])
export class DepartmentController {
	private departmentService = Container.get(DepartmentService)

	@Post("")
	async create(@Body() departmentDto: DepartmentDto) {
		return this.departmentService.create(departmentDto)
	}

	@Get("/filter")
	async filter(@QueryParams() baseFilterDto: BaseFilterDto) {
		return this.departmentService.filter(baseFilterDto)
	}

	@Get("/:id")
	async findById(@Param("id") id: string) {
		return this.departmentService.findById(id)
	}

	@Put("/:id")
	async update(@Param("id") id: string, @Body() departmentDto: DepartmentDto) {
		return this.departmentService.update(id, departmentDto)
	}

	@Delete("/:id")
	async delete(@Param("id") id: string) {
		return this.departmentService.delete(id)
	}
}