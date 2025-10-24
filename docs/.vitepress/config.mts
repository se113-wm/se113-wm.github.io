import { defineConfig } from "vitepress";
import { configureDiagramsPlugin } from "vitepress-plugin-diagrams";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "TMS Docs",
	description: "TMS docs",
	lang: "en-GB",
	markdown: {
		theme: {
			light: "catppuccin-latte",
			dark: "catppuccin-mocha",
		},
		config: (md) => {
			configureDiagramsPlugin(md, {
				krokiServerUrl: process.env.KROKI_SERVER_URL,
			});
		},
	},

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Overview", link: "/overview" },
			{ text: "Docs", link: "/docs" },
		],

		sidebar: [
			{
				text: "Overview",
				items: [{ text: "Overview", link: "/overview" }],
			},
			{
				text: "Docs",
				items: [
					{
						text: "Use Case",
						collapsed: true,
						items: [
							{
								text: "User",
								link: "/docs/use-case/user",
							},
							{
								text: "Customer",
								link: "/docs/use-case/customer",
							},
							{
								text: "Staff",
								link: "/docs/use-case/staff",
							},
							{
								text: "Admin",
								link: "/docs/use-case/admin",
							},
							{
								text: "Sample",
								link: "docs/use-case/sample-workflow",
							},
						],
					},
					{
						text: "Sequence",
						collapsed: true,
						items: [
							{
								text: "Adjust Document",
								collapsed: true,
								items: [
									{
										text: "Adjust Document",
										link: "/docs/sequence/adjust-document/adjust-document",
									},
									{
										text: "Create Document",
										link: "/docs/sequence/adjust-document/create-document",
									},
									{
										text: "Delete Document",
										link: "/docs/sequence/adjust-document/delete-document",
									},
									{
										text: "Search Document",
										link: "/docs/sequence/adjust-document/search-document",
									},
									{
										text: "Update Document",
										link: "/docs/sequence/adjust-document/update-document",
									},
								],
							},
							{
								text: "Auth",
								collapsed: true,
								items: [
									{ text: "Sign In", link: "/docs/sequence/auth/sign-in" },
									{ text: "Sign Up", link: "/docs/sequence/auth/sign-up" },
								],
							},
							{
								text: "Contact Support",
								collapsed: true,
								items: [
									{
										text: "Contact Support",
										link: "/docs/sequence/contact-support/contact-support",
									},
								],
							},
							{
								text: "Manage Product",
								collapsed: true,
								items: [
									{
										text: "Add Product",
										link: "/docs/sequence/manage-product/add-product",
									},
									{
										text: "Delete Product",
										link: "/docs/sequence/manage-product/delete-product",
									},
									{
										text: "Delete Review",
										link: "/docs/sequence/manage-product/delete-review",
									},
									{
										text: "Manage Product",
										link: "/docs/sequence/manage-product/manage-product",
									},
									{
										text: "Search Product",
										link: "/docs/sequence/manage-product/search-product",
									},
									{
										text: "Update Product",
										link: "/docs/sequence/manage-product/update-product",
									},
								],
							},
							{
								text: "Manage User",
								collapsed: true,
								items: [
									{
										text: "Delete Customer",
										link: "/docs/sequence/manage-user/delete-customer",
									},
									{
										text: "Delete Staff",
										link: "/docs/sequence/manage-user/delete-staff",
									},
									{
										text: "Manage User",
										link: "/docs/sequence/manage-user/manage-user",
									},
									{
										text: "Search User",
										link: "/docs/sequence/manage-user/search-user",
									},
									{
										text: "View Customer Report",
										link: "/docs/sequence/manage-user/view-customer-report",
									},
									{
										text: "View Staff Report",
										link: "/docs/sequence/manage-user/view-staff-report",
									},
								],
							},
							{
								text: "View Customer Self Report",
								collapsed: true,
								items: [
									{
										text: "View Customer Self Report",
										link: "/docs/sequence/view-customer-self-report/view-customer-self-report",
									},
								],
							},
							{
								text: "View Document",
								collapsed: true,
								items: [
									{
										text: "View Document",
										link: "/docs/sequence/view-document/view-document",
									},
								],
							},
							{
								text: "View Order",
								collapsed: true,
								items: [
									{
										text: "Cancel Order",
										link: "/docs/sequence/view-order/cancel-order",
									},
									{
										text: "Return Product",
										link: "/docs/sequence/view-order/return-product",
									},
									{
										text: "Review Product",
										link: "/docs/sequence/view-order/review-product",
									},
									{
										text: "Search Order",
										link: "/docs/sequence/view-order/search-order",
									},
									{
										text: "View Order Detail",
										link: "/docs/sequence/view-order/view-order-detail",
									},
									{
										text: "View Order",
										link: "/docs/sequence/view-order/view-order",
									},
								],
							},
							{
								text: "View Product",
								collapsed: true,
								items: [
									{
										text: "Add Product To Cart",
										link: "/docs/sequence/view-product/add-product-to-cart",
									},
									{
										text: "Search Product",
										link: "/docs/sequence/view-product/search-product",
									},
									{
										text: "View Product Detail",
										link: "/docs/sequence/view-product/view-product-detail",
									},
									{
										text: "View Product",
										link: "/docs/sequence/view-product/view-product",
									},
									{
										text: "View Product Reviews",
										link: "/docs/sequence/view-product/view-product-reviews",
									},
									{
										text: "View Suggested Product",
										link: "/docs/sequence/view-product/view-suggested-product",
									},
								],
							},
							{
								text: "View Shop Report",
								collapsed: true,
								items: [
									{
										text: "View Shop Report",
										link: "/docs/sequence/view-shop-report/view-shop-report",
									},
								],
							},
							{
								text: "View Staff Self Report",
								collapsed: true,
								items: [
									{
										text: "View Staff Self Report",
										link: "/docs/sequence/view-staff-self-report/view-staff-self-report",
									},
								],
							},
							{
								text: "View System Monitoring",
								collapsed: true,
								items: [
									{
										text: "View System Monitoring",
										link: "/docs/sequence/view-system-monitoring/view-system-monitoring",
									},
								],
							},
						],
					},
					{
						text: "Activity",
						collapsed: true,
						items: [
							{
								text: "Adjust Document",
								collapsed: true,
								items: [
									{
										text: "Adjust Document",
										link: "/docs/activity/adjust-document/adjust-document",
									},
									{
										text: "Create Document",
										link: "/docs/activity/adjust-document/create-document",
									},
									{
										text: "Delete Document",
										link: "/docs/activity/adjust-document/delete-document",
									},
									{
										text: "Search Document",
										link: "/docs/activity/adjust-document/search-document",
									},
									{
										text: "Update Document",
										link: "/docs/activity/adjust-document/update-document",
									},
								],
							},
							{
								text: "Adjust Cart",
								collapsed: true,
								items: [
									{
										text: "Add Trip to Cart",
										link: "/docs/activity/adjust-cart/add-trip-to-cart",
									},
									{
										text: "Edit Trip Details",
										link: "/docs/activity/adjust-cart/edit-trip-details",
									},
									{
										text: "Remove Trip from Cart",
										link: "/docs/activity/adjust-cart/remove-trip-to-cart",
									},
									{
										text: "View and Filter Trips in Cart",
										link: "/docs/activity/adjust-cart/view-and-filter-trips-in-cart",
									},
								],
							},
							{
								text: "Adjust Favorite Trips",
								collapsed: true,
								items: [
									{
										text: "Toggle Favorite Trip",
										link: "/docs/activity/adjust-favorite-trips/toggle-favorite-trip",
									},
									{
										text: "View and Filter Favorite Trips",
										link: "/docs/activity/adjust-favorite-trips/view-and-filter-favorite-trips",
									},
								],
							},
							{
								text: "Auth",
								collapsed: true,
								items: [
									{ text: "Sign In", link: "/docs/activity/auth/sign-in" },
									{ text: "Sign Up", link: "/docs/activity/auth/sign-up" },
								],
							},
							{
								text: "Browse Trips",
								collapsed: true,
								items: [
									{
										text: "View and Filter Available Trips",
										link: "/docs/activity/browse-trips/view-and-filter-available-trips",
									},
									{
										text: "View Trip Details",
										link: "/docs/activity/browse-trips/view-trip-details",
									},
								],
							},
							{
								text: "Contact Support",
								collapsed: true,
								items: [
									{
										text: "Contact Support",
										link: "/docs/activity/contact-support/contact-support",
									},
								],
							},
							{
								text: "Manage Personal Booking",
								collapsed: true,
								items: [
									{
										text: "Book a Trip",
										link: "/docs/activity/manage-personal-booking/book-a-trip",
									},
									{
										text: "Checkout Cart",
										link: "/docs/activity/manage-personal-booking/checkout-cart",
									},
									{
										text: "Edit Upcoming Trip's Passenger Details",
										link: "/docs/activity/manage-personal-booking/edit-upcoming-trip's-passenger-details",
									},
									{
										text: "View and Filter Personal Bookings",
										link: "/docs/activity/manage-personal-booking/view-and-filter-personal-bookings",
									},
									{
										text: "View and Pay Booking Invoice Details",
										link: "/docs/activity/manage-personal-booking/view-and-pay-booking-invoice-details",
									},
									{
										text: "Use Case Specification",
										link: "/docs/activity/manage-personal-booking/đặc tả các use case",
									},
								],
							},
							{
								text: "Manage Product",
								collapsed: true,
								items: [
									{
										text: "Add Product",
										link: "/docs/activity/manage-product/add-product",
									},
									{
										text: "Delete Product",
										link: "/docs/activity/manage-product/delete-product",
									},
									{
										text: "Delete Review",
										link: "/docs/activity/manage-product/delete-review",
									},
									{
										text: "Manage Product",
										link: "/docs/activity/manage-product/manage-product",
									},
									{
										text: "Search Product",
										link: "/docs/activity/manage-product/search-product",
									},
									{
										text: "Update Product",
										link: "/docs/activity/manage-product/update-product",
									},
								],
							},
							{
								text: "Manage Routes",
								collapsed: true,
								items: [
									{
										text: "Add New Route",
										link: "/docs/activity/manage-routes/add-new-route",
									},
									{
										text: "Delete Route",
										link: "/docs/activity/manage-routes/delete-route",
									},
									{
										text: "Edit Route Details",
										link: "/docs/activity/manage-routes/edit-route-details",
									},
									{
										text: "View and Filter Routes",
										link: "/docs/activity/manage-routes/view-and-filter-routes",
									},
									{
										text: "View Route Detail",
										link: "/docs/activity/manage-routes/view-route-detail",
									},
								],
							},
							{
								text: "Manage Attraction",
								collapsed: true,
								items: [
									{
										text: "Add New Attraction",
										link: "/docs/activity/manage-attraction/add-new-attraction",
									},
									{
										text: "Use Case Specification",
										link: "/docs/activity/manage-attraction/UCS-manage-attraction",
									},
								],
							},
							{
								text: "Manage User",
								collapsed: true,
								items: [
									{
										text: "Delete Customer",
										link: "/docs/activity/manage-user/delete-customer",
									},
									{
										text: "Delete Staff",
										link: "/docs/activity/manage-user/delete-staff",
									},
									{
										text: "Manage User",
										link: "/docs/activity/manage-user/manage-user",
									},
									{
										text: "Search User",
										link: "/docs/activity/manage-user/search-user",
									},
									{
										text: "View Customer Report",
										link: "/docs/activity/manage-user/view-customer-report",
									},
									{
										text: "View Staff Report",
										link: "/docs/activity/manage-user/view-staff-report",
									},
								],
							},
							{
								text: "View Customer Self Report",
								collapsed: true,
								items: [
									{
										text: "View Customer Self Report",
										link: "/docs/activity/view-customer-self-report/view-customer-self-report",
									},
								],
							},
							{
								text: "View Document",
								collapsed: true,
								items: [
									{
										text: "View Document",
										link: "/docs/activity/view-document/view-document",
									},
								],
							},
							{
								text: "View Order",
								collapsed: true,
								items: [
									{
										text: "Cancel Order",
										link: "/docs/activity/view-order/cancel-order",
									},
									{
										text: "Return Product",
										link: "/docs/activity/view-order/return-product",
									},
									{
										text: "Review Product",
										link: "/docs/activity/view-order/review-product",
									},
									{
										text: "Search Order",
										link: "/docs/activity/view-order/search-order",
									},
									{
										text: "View Order Detail",
										link: "/docs/activity/view-order/view-order-detail",
									},
									{
										text: "View Order",
										link: "/docs/activity/view-order/view-order",
									},
								],
							},
							{
								text: "View Product",
								collapsed: true,
								items: [
									{
										text: "Add Product To Cart",
										link: "/docs/activity/view-product/add-product-to-cart",
									},
									{
										text: "Search Product",
										link: "/docs/activity/view-product/search-product",
									},
									{
										text: "View Product Detail",
										link: "/docs/activity/view-product/view-product-detail",
									},
									{
										text: "View Product",
										link: "/docs/activity/view-product/view-product",
									},
									{
										text: "View Product Reviews",
										link: "/docs/activity/view-product/view-product-reviews",
									},
									{
										text: "View Suggested Product",
										link: "/docs/activity/view-product/view-suggested-product",
									},
								],
							},
							{
								text: "View Shop Report",
								collapsed: true,
								items: [
									{
										text: "View Shop Report",
										link: "/docs/activity/view-shop-report/view-shop-report",
									},
								],
							},
							{
								text: "View Staff Self Report",
								collapsed: true,
								items: [
									{
										text: "View Staff Self Report",
										link: "/docs/activity/view-staff-self-report/view-staff-self-report",
									},
								],
							},
							{
								text: "View System Monitoring",
								collapsed: true,
								items: [
									{
										text: "View System Monitoring",
										link: "/docs/activity/view-system-monitoring/view-system-monitoring",
									},
								],
							},
						],
					},
					{
						text: "Database",
						link: "/docs/database",
					},
					{
						text: "Function Lists",
						link: "/docs/function-list",
					},
					{
						text: "SRS",
						link: "/docs/srs",
					},
				],
			},
		],

		search: {
			provider: "local",
		},

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/SE357-TMS",
			},
		],
	},
});
