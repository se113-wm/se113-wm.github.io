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
								text: "Adjust and Track Bookings",
								collapsed: true,
								items: [
									{
										text: "Add New Booking",
										link: "/docs/sequence/adjust-and-track-bookings/add-new-booking",
									},
									{
										text: "Delete Booking",
										link: "/docs/sequence/adjust-and-track-bookings/delete-booking",
									},
									{
										text: "Edit Pre-departure Booking",
										link: "/docs/sequence/adjust-and-track-bookings/edit-pre-departure-booking",
									},
									{
										text: "View and Filter Bookings",
										link: "/docs/sequence/adjust-and-track-bookings/view-and-filter-bookings",
									},
									{
										text: "View Booking Details",
										link: "/docs/sequence/adjust-and-track-bookings/view-booking-details",
									},
									{
										text: "View Booking's Invoice",
										link: "/docs/sequence/adjust-and-track-bookings/view-booking's-invoice",
									},
									{
										text: "UCS-Adjust-and-Track-Bookings",
										link: "/docs/sequence/adjust-and-track-bookings/UCS-adjust-and-track-bookings",
									},
								],
							},
							{
								text: "Adjust Cart",
								collapsed: true,
								items: [
									{
										text: "Add Trip to Cart",
										link: "/docs/sequence/adjust-cart/add-trip-to-cart",
									},
									{
										text: "Edit Trip Details",
										link: "/docs/sequence/adjust-cart/edit-trip-details",
									},
									{
										text: "Remove Trip from Cart",
										link: "/docs/sequence/adjust-cart/remove-trip-to-cart",
									},
									{
										text: "View and Filter Trips in Cart",
										link: "/docs/sequence/adjust-cart/view-and-filter-trips-in-cart",
									},
								],
							},
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
								text: "Adjust Favorite Trips",
								collapsed: true,
								items: [
									{
										text: "Toggle Favorite Trip",
										link: "/docs/sequence/adjust-favorite-trips/toggle-favorite-trip",
									},
									{
										text: "View and Filter Favorite Trips",
										link: "/docs/sequence/adjust-favorite-trips/view-and-filter-favorite-trips",
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
								text: "Browse Trips",
								collapsed: true,
								items: [
									{
										text: "View and Filter Available Trips",
										link: "/docs/sequence/browse-trips/view-and-filter-available-trips",
									},
									{
										text: "View Trip Details",
										link: "/docs/sequence/browse-trips/view-trip-details",
									},
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
								text: "Manage Attraction",
								collapsed: true,
								items: [
									{
										text: "Add New Attraction",
										link: "/docs/sequence/manage-attraction/add-new-attraction",
									},
									{
										text: "Delete Attraction",
										link: "/docs/sequence/manage-attraction/delete-attraction",
									},
									{
										text: "Edit Attraction Detail",
										link: "/docs/sequence/manage-attraction/edit-attraction-detail",
									},
									{
										text: "Search Attraction",
										link: "/docs/sequence/manage-attraction/search-attraction",
									},
									{
										text: "View Attraction Detail",
										link: "/docs/sequence/manage-attraction/view-attraction-detail",
									},
									{
										text: "View and Filter Attractions",
										link: "/docs/sequence/manage-attraction/view-and-filter-attractions",
									},
									{
										text: "UCS-Manage-Attraction",
										link: "/docs/sequence/manage-attraction/UCS-manage-attraction",
									},
								],
							},
							{
								text: "Manage Cart",
								collapsed: true,
								items: [
									{
										text: "Add Trip to Cart",
										link: "/docs/sequence/manage-cart/add-trip-to-cart",
									},
									{
										text: "Checkout Cart",
										link: "/docs/sequence/manage-cart/checkout-cart",
									},
									{
										text: "Remove Trip from Cart",
										link: "/docs/sequence/manage-cart/remove-trip-from-cart",
									},
									{
										text: "Update Cart Item Quantity",
										link: "/docs/sequence/manage-cart/update-cart-item-quantity",
									},
									{
										text: "View Cart",
										link: "/docs/sequence/manage-cart/view-cart",
									},
								],
							},
							{
								text: "Manage Personal Booking",
								collapsed: true,
								items: [
									{
										text: "Book a Trip",
										link: "/docs/sequence/manage-personal-booking/book-a-trip",
									},
									{
										text: "Cancel Booking",
										link: "/docs/sequence/manage-personal-booking/cancel-booking",
									},
									{
										text: "Checkout Cart",
										link: "/docs/sequence/manage-personal-booking/checkout-cart",
									},
									{
										text: "Edit Upcoming Trip's Passenger Details",
										link: "/docs/sequence/manage-personal-booking/edit-upcoming-trip's-passenger-details",
									},
									{
										text: "View and Filter Personal Bookings",
										link: "/docs/sequence/manage-personal-booking/view-and-filter-personal-bookings",
									},
									{
										text: "View and Pay Booking Invoice Details",
										link: "/docs/sequence/manage-personal-booking/view-and-pay-booking-invoice-details",
									},
									{
										text: "UCS-Manage-Personal-Booking",
										link: "/docs/sequence/manage-personal-booking/UCS-manage-personal-booking",
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
								text: "Manage Route Schedule",
								collapsed: true,
								items: [
									{
										text: "Add Itinerary",
										link: "/docs/sequence/manage-route-schedule/add-itinerary",
									},
									{
										text: "Delete Itinerary",
										link: "/docs/sequence/manage-route-schedule/delete-itinerary",
									},
									{
										text: "Edit Itinerary",
										link: "/docs/sequence/manage-route-schedule/edit-itinerary",
									},
									{
										text: "UCS-Manage-Route-Schedule",
										link: "/docs/sequence/manage-route-schedule/UCS-manage-route-schedule",
									},
								],
							},
							{
								text: "Manage Routes",
								collapsed: true,
								items: [
									{
										text: "Add New Route",
										link: "/docs/sequence/manage-routes/add-new-route",
									},
									{
										text: "Delete Route",
										link: "/docs/sequence/manage-routes/delete-route",
									},
									{
										text: "Edit Route Details",
										link: "/docs/sequence/manage-routes/edit-route-details",
									},
									{
										text: "Search Route",
										link: "/docs/sequence/manage-routes/search-route",
									},
									{
										text: "View Route Detail",
										link: "/docs/sequence/manage-routes/view-route-detail",
									},
									{
										text: "View and Filter Routes",
										link: "/docs/sequence/manage-routes/view-and-filter-routes",
									},
									{
										text: "UCS-Manage-Routes",
										link: "/docs/sequence/manage-routes/UCS-manage-routes",
									},
								],
							},
							{
								text: "Manage Trips",
								collapsed: true,
								items: [
									{
										text: "Add New Booking for Trip",
										link: "/docs/sequence/manage-trips/add-new-booking-for-trip",
									},
									{
										text: "Add New Trip",
										link: "/docs/sequence/manage-trips/add-new-trip",
									},
									{
										text: "Delete Trip",
										link: "/docs/sequence/manage-trips/delete-trip",
									},
									{
										text: "Edit Trip",
										link: "/docs/sequence/manage-trips/edit-trip",
									},
									{
										text: "View Trip Details",
										link: "/docs/sequence/manage-trips/view-trip-details",
									},
									{
										text: "View and Filter Trips",
										link: "/docs/sequence/manage-trips/view-and-filter-trips",
									},
									{
										text: "UCS-Manage-Trips",
										link: "/docs/sequence/manage-trips/UCS-manage-trips",
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
									{
										text: "UCS-Adjust-Cart",
										link: "/docs/activity/adjust-cart/UCS-adjust-cart",
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
										text: "UCS-Manage-Personal-Booking",
										link: "/docs/activity/manage-personal-booking/UCS-manage-personal-booking",
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
									{
										text: "UCS-Manage-Routes",
										link: "/docs/activity/manage-routes/UCS-manage-routes",
									},
								],
							},
							{
								text: "Manage Route Schedule",
								collapsed: true,
								items: [
									{
										text: "Add Itinerary",
										link: "/docs/activity/manage-route-schedule/add-itinerary",
									},
									{
										text: "Delete Itinerary",
										link: "/docs/activity/manage-route-schedule/delete-itinerary",
									},
									{
										text: "Edit Itinerary",
										link: "/docs/activity/manage-route-schedule/edit-itinerary",
									},
									{
										text: "UCS-Manage-Route-Schedule",
										link: "/docs/activity/manage-route-schedule/UCS-manage-route-schedule",
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
										text: "Delete Attraction",
										link: "/docs/activity/manage-attraction/delete-attraction",
									},
									{
										text: "Edit Attraction Detail",
										link: "/docs/activity/manage-attraction/edit-attraction-detail",
									},
									{
										text: "View Attraction Detail",
										link: "/docs/activity/manage-attraction/view-attraction-detail",
									},
									{
										text: "View and Filter Attractions",
										link: "/docs/activity/manage-attraction/view-and-filter-attractions",
									},
									{
										text: "UCS-Manage-Attraction",
										link: "/docs/activity/manage-attraction/UCS-manage-attraction",
									},
								],
							},
							{
								text: "Adjust Customers",
								collapsed: true,
								items: [
									{
										text: "Add New Customer",
										link: "/docs/activity/adjust-customers/add-new-customer",
									},
									{
										text: "Delete Customer",
										link: "/docs/activity/adjust-customers/delete-customer",
									},
									{
										text: "Edit Customer",
										link: "/docs/activity/adjust-customers/edit-customer",
									},
									{
										text: "View Customer Details",
										link: "/docs/activity/adjust-customers/view-customer-details",
									},
									{
										text: "View and Filter Customers",
										link: "/docs/activity/adjust-customers/view-and-filter-customers",
									},
									{
										text: "UCS-Adjust-Customers",
										link: "/docs/activity/adjust-customers/UCS-adjust-customers",
									},
								],
							},
							{
								text: "Adjust Staffs",
								collapsed: true,
								items: [
									{
										text: "Add New Staff",
										link: "/docs/activity/adjust-staffs/add-new-staff",
									},
									{
										text: "Delete Staff",
										link: "/docs/activity/adjust-staffs/delete-staff",
									},
									{
										text: "Edit Staff",
										link: "/docs/activity/adjust-staffs/edit-staff",
									},
									{
										text: "View Staff Details",
										link: "/docs/activity/adjust-staffs/view-staff-details",
									},
									{
										text: "View and Filter Staffs",
										link: "/docs/activity/adjust-staffs/view-and-filter-staffs",
									},
									{
										text: "UCS-Adjust-Staffs",
										link: "/docs/activity/adjust-staffs/UCS-adjust-staffs",
									},
								],
							},
							{
								text: "Manage Trips",
								collapsed: true,
								items: [
									{
										text: "Add New Trip",
										link: "/docs/activity/manage-trips/add-new-trip",
									},
									{
										text: "Add New Booking for Trip",
										link: "/docs/activity/manage-trips/add-new-booking-for-trip",
									},
									{
										text: "Delete Trip",
										link: "/docs/activity/manage-trips/delete-trip",
									},
									{
										text: "Edit Trip",
										link: "/docs/activity/manage-trips/edit-trip",
									},
									{
										text: "View Trip Details",
										link: "/docs/activity/manage-trips/view-trip-details",
									},
									{
										text: "View and Filter Trips",
										link: "/docs/activity/manage-trips/view-and-filter-trips",
									},
									{
										text: "UCS-Manage-Trips",
										link: "/docs/activity/manage-trips/UCS-manage-trips",
									},
								],
							},
							{
								text: "Adjust and Track Bookings",
								collapsed: true,
								items: [
									{
										text: "Add New Booking",
										link: "/docs/activity/manage-trips/add-new-booking",
									},
									{
										text: "Delete Booking",
										link: "/docs/activity/manage-trips/delete-booking",
									},
									{
										text: "Edit Pre-Departure Booking",
										link: "/docs/activity/manage-trips/edit-pre-departure-booking",
									},
									{
										text: "View Booking Details",
										link: "/docs/activity/manage-trips/view-booking-details",
									},
									{
										text: "View and Filter Bookings",
										link: "/docs/activity/manage-trips/view-and-filter-bookings",
									},
									{
										text: "View Booking's Invoice",
										link: "/docs/activity/manage-trips/view-booking's-invoice",
									},
									{
										text: "UCS-Adjust-and-Track-Bookings",
										link: "/docs/activity/manage-trips/UCS-adjust-and-track-bookings",
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
