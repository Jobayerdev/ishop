import AppLayoutComponent from "@shared/components/layout/app-layout.component"
import { BannerService } from "@shared/services/banners.service"
import { BannerType } from "@shared/enums"
import { BaseFilterResponse } from "@shared/interfaces/base.interface"
import { BrandService } from "@shared/services/brand.service"
import { DepartmentService } from "@shared/services/departments.service"
import { GetStaticProps } from "next"
import { ProductsService } from "@shared/services/products.service"
import React from "react"
import dynamic from "next/dynamic"

const HomeBrandsComponent = dynamic(
	() => import("@modules/home/components/home-brands/home-brands.component")
)
const HomeDepartmentsComponent = dynamic(
	() =>
		import(
			"@modules/home/components/home-departments/home-departments.component"
		)
)
const HomeProductsComponent = dynamic(
	() =>
		import("@modules/home/components/home-products/home-products.component"),
	{ loading: () => <h1>...</h1> }
)

const HomeBannerComponent = dynamic(
	() => import("@modules/home/components/home-banner/home-banner.component")
)
const HomeThreeBannerComponent = dynamic(
	() =>
		import(
			"@modules/home/components/home-three-banner/home-three-banner.component"
		)
)
interface IFProps {
	bannersResponse: BaseFilterResponse
	productsResponse: BaseFilterResponse
	departmentsResponse: BaseFilterResponse
	threeFirstBannerResponse: BaseFilterResponse
	brandsResponse: BaseFilterResponse
}
const IndexPageComponent: React.FC<IFProps> = ({
	bannersResponse,
	productsResponse,
	departmentsResponse,
	threeFirstBannerResponse,
	brandsResponse,
}) => {
	productsResponse
	return (
		<AppLayoutComponent>
			<HomeBannerComponent banners={bannersResponse.data} />
			<HomeThreeBannerComponent banners={threeFirstBannerResponse.data} />
			<HomeBrandsComponent brands={brandsResponse?.data} />
			<HomeDepartmentsComponent departments={departmentsResponse.data} />
			<HomeProductsComponent products={productsResponse.data} />
		</AppLayoutComponent>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const fetchSliderHomePageBanners = await BannerService.filter({
		page: 1,
		take: 10,
		type: BannerType.SLIDER_HOMEPAGE,
	})
	const fetchThreeFirstBanners = await BannerService.filter({
		page: 1,
		take: 3,
		type: BannerType.THREE_FIRST,
	})
	const fetchProducts = await ProductsService.filter({
		page: 1,
		take: 12,
	})
	const fetchDepartments = await DepartmentService.filter({
		page: 1,
		take: 6,
		isFeatured: true,
	})
	const fetchBrands = await BrandService.filter({
		page: 1,
		take: 12,
	})
	return {
		props: {
			bannersResponse: fetchSliderHomePageBanners.data,
			productsResponse: fetchProducts.data,
			departmentsResponse: fetchDepartments.data,
			threeFirstBannerResponse: fetchThreeFirstBanners.data,
			brandsResponse: fetchBrands.data,
		},
		revalidate: 1,
	}
}

export default IndexPageComponent
