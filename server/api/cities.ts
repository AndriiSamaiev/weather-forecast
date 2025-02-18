export default defineEventHandler(async (event) => {
    const query = getQuery(event).q;
    const config = useRuntimeConfig();
    const { URI_API, WEATHER_API_KEY } = config.public;

    if (!query) {
        return createError({ statusCode: 400, statusMessage: "Query parameter 'q' is required" });
    }

    try {
        return await $fetch(
            `${URI_API}/search.json?key=${WEATHER_API_KEY}&q=${query}`
        );
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: "Failed to fetch city data" });
    }
});