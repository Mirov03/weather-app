import {createRouter, createWebHistory} from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("@/views/main.vue"),
		meta: {
			title: "Weather",
		},
	},
	{
		path: '/cities',
		component: () => import("@/views/cities.vue"),
		meta: {
			title: "Cities History"
		}
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	to.meta.title ? (document.title = to.meta.title) : (document.title = "Weather App");

	// todo возможно доделаю
	// window.addEventListener('blur', () => {
	// 	document.title = 'Come back :с';
	// });

	// window.addEventListener('focus', () => {
	// 	document.title = to.meta.title ? (document.title = to.meta.title) : (document.title = 'Weather App');
	// });

	next();
});

export default router;
