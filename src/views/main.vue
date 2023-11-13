<template>
    <div class="root">
        <section class="search-city">
            <div class="container">
                <div class="row">
                    <div class="search-container">
                        <div class="inputBox">
                            <input tabindex="0" type="text" placeholder="Search for cities" v-model="cityNameBySearch" autocomplete="off">
                        </div>
                        <div class="search-button">
                            <button type="submit" tabindex="0" class="mitr color-main" :disabled="cityNameBySearch.length === 0" @click="getWeatherData(cityNameBySearch, notify = true)">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <transition name="main-weather-sections" mode="out-in">
            <!-- ? loader -->
            <section v-if="weatherDataForCity === null" class="main-weather-info loading">
                <div class="container">
                    <div class="row">
                        <div class="weather-content">
                            <div class="weather-content__loader">
                                <div class="line-loader-1" style="--size: 90px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ! Error -->
            <section class="main-weather-info error" v-else-if="weatherDataForCity.status === 'error'">
                <div class="container">
                    <div class="row">
                        <div class="weather-content">
                            <div class="weather-content__error">
                                <div class="error-title">
                                    <i class="fa-solid fa-bug"></i>
                                    <h1 class="mitr color-main">Oops.. Error #{{ weatherDataForCity.code }}</h1>
                                </div>
                                <div class="error-message">
                                    <p class="mitr color-gray">Error message: {{ weatherDataForCity.message }}</p>
                                </div>
                                <div class="error-button">
                                    <button @click="getWeatherData(userData.city, notify = false)">
                                        Back to {{ userData.city }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- * success -->
            <div v-else-if="weatherDataForCity !== null && weatherDataForCity.status !== 'error'">
                <section class="main-weather-info success">
                    <div class="container">
                        <div class="row">
                            <div class="weather-content">
                                <div class="weather-content__city">
                                    <div class="header">
                                        <h1 class="city-name mitr color-main"><i style="font-size: 38px;" class="fa-solid fa-earth-americas"></i> {{ weatherDataForCity[0].name }}, {{ weatherDataForCity[0].sys.country }}</h1>
                                        <p class="city-chance-of-rain mitr color-gray">Percentage of clouds: {{ weatherDataForCity[0].clouds.all }}%</p>
                                    </div>
                                    <div class="footer">
                                        <div class="temperature-info">
                                            <span class="temperature mitr color-main">{{ Math.round(weatherDataForCity[0].main.temp) }}°</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="weather-content__date">
                                    <div class="date-info">
                                        <h1 class="mitr color-main">{{ new Date(weatherDataForCity[0].dt * 1000).toLocaleDateString('en-GB') }}</h1>
                                        <i class="fa-solid fa-clock"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="today-forecast">
                    <div class="container">
                        <div class="row">
                            <div class="forecast-container">
                                <div v-if="forecastTodaySort.length > 0" class="title">
                                    <h1 class="mitr color-gray">Today's Forecast</h1>
                                </div>
                                <div class="forecast-items">
                                    <div v-if="forecastTodaySort.length <= 0" class="error-item item">
                                        <div class="item-content">
                                            <h1 class="mitr color-gray">No information about the weather for today</h1>
                                        </div>
                                    </div>
                                    <div v-else class="item" v-for="(item, index) in forecastTodaySort" :key="index">
                                        <div class="item-content">
                                            <div class="content-left">
                                                <div class="item-time">
                                                    <p class="mitr color-gray">{{ new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) }}</p>
                                                </div>
                                                <div class="item-weather">
                                                    <div class="weather-icon">
                                                        <img :src="require(`@/assets/images/weather-icons/${item.weather[0].icon}.png`)">
                                                    </div>
                                                    <div class="weather-name">
                                                        <div class="weather-degree">
                                                            <span class="mitr color-main">{{ Math.round(item.main.temp) }}°</span>
                                                        </div>
                                                        <div class="name-text">
                                                            <h1 class="mitr color-main">{{ item.weather[0].main }}</h1>
                                                            <p class="mitr color-gray">{{ item.weather[0].description }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="weather-sun-info">
                    <div class="container">
                        <div class="row">
                            <div class="sun-content">
                                <div class="sunrise info">
                                    <i style="--color: #FCE570;" class="fa-solid fa-cloud-sun"></i>
                                    <h1 class="mitr color-main">Sunrise - <span>{{ new Date(weatherDataForCity[0].sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) }}</span></h1>
                                </div>
                                <div class="sunset info">
                                    <i style="--color: #F6F1D5;" class="fa-solid fa-cloud-moon"></i>
                                    <h1 class="mitr color-main">Sunset - <span>{{ new Date(weatherDataForCity[0].sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) }}</span></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </transition>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min';

export default {
    name: 'main-page',
    data() {
        return {
            userData: null,
            cityNameBySearch: '',
            weatherDataForCity: null
        }
    },
    computed: {
        forecastTodaySort() {
            const list = JSON.parse(JSON.stringify(this.weatherDataForCity[1].list));
            const today = new Date().getDate();

            const filteredList = list.filter(item => {
                return new Date(item.dt * 1000).getDate() === today;
            });

            return filteredList;
        }
    },
    methods: {
        test() {
            alert(localStorage.getItem('userSearchHistory'))
        },
        getWeatherData(city, notify) {
            this.weatherDataForCity = null;
            this.cityNameBySearch = '';

            let result = []

            let id;
            if (notify === true) {
                id = toast.loading('Search for information..', {
                    autoClose: 100000,
                    theme: 'dark',
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }

            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8877bb524c04486801d937bb5bdb08fd`)
                .then((response) => {
                    result.push(response.data);
                    toast.update(id, {
                        render: 'Successfully!',
                        autoClose: 2000,
                        icon: '✅',
                        type: 'success',
                        isLoading: false
                    })
                })
                .then(() => {
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=8877bb524c04486801d937bb5bdb08fd`)
                        .then((response) => {
                            result.push(response.data);
                            this.weatherDataForCity = result;
                            document.title = `Weather - ${this.weatherDataForCity[0].name}`;
                        })
                        .then(() => {
                            let historySearch = JSON.parse(localStorage.getItem('userSearchHistory')) || [];

                            let newCity = {
                                name: this.weatherDataForCity[0].name,
                                date: Math.round(new Date().getTime() / 1000)
                            };

                            if (!historySearch.some(item => item.name === newCity.name)) {
                                historySearch.push(newCity);
                                localStorage.setItem('userSearchHistory', JSON.stringify(historySearch));
                            }
                        })
                })
                .catch(error => {
                    if (error.code === 'ERR_BAD_REQUEST') {
                        this.weatherDataForCity = { status: 'error', code: '404', message: error.response.data.message };
                        document.title = `Oops.. Error :c`;
                        toast.update(id, {
                            render: `You are faced with an error!`,
                            autoClose: 2000,
                            icon: '❌',
                            type: 'error',
                            isLoading: false
                        })
                    }
                })
        }
    },
    mounted() {
        axios.get('https://ipinfo.io?token=5166975654b712')
            .then(response => {
                let data = response.data;
                this.userData = data;
                document.title = `Weather - ${this.userData.city}`;
            })
            .catch((error) => console.log(error));

        setTimeout(() => {
            let result = [];
            if (this.userData !== null) {
                axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.userData.city}&units=metric&appid=8877bb524c04486801d937bb5bdb08fd`)
                    .then((response) => {
                        result.push(response.data);
                    })
                    .then(() => {
                        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.userData.city}&units=metric&appid=8877bb524c04486801d937bb5bdb08fd`)
                            .then((response) => {
                                result.push(response.data);
                                this.weatherDataForCity = result;
                            })
                    })
            }
        }, 2000)

        new Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']"
        })
    }
}
</script>

<style scoped>
.main-weather-sections-enter-from {
    transform: translateY(20px);
    opacity: 0;
    transition: opacity 1s linear;
}

.main-weather-sections-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.main-weather-sections-enter-active,
.main-weather-sections-leave-active {
    transition: transform .2s linear, opacity .2s linear;
}
</style>